
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PropertySearchRequest {
  query: string
  properties: any[]
  searchType?: string
}

interface AISearchResponse {
  insight: string
  recommendations: Array<{
    property_id: string
    reason: string
    score: number
  }>
  market_analysis: string
  search_tips: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { query, properties, searchType = 'general' }: PropertySearchRequest = await req.json()
    console.log('AI Search Request:', { query, propertiesCount: properties.length, searchType })

    const GOOGLE_AI_API_KEY = Deno.env.get('GOOGLE_AI_API_KEY')
    if (!GOOGLE_AI_API_KEY) {
      console.error('Google AI API key not configured')
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Google AI API key not configured' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      )
    }

    // Prepare property data for AI analysis
    const propertyData = properties.slice(0, 5).map(prop => ({
      id: prop.id?.toString() || 'unknown',
      title: prop.title || 'Property',
      location: prop.location || 'Unknown location',
      price: prop.price || 0,
      rating: prop.rating || 0,
      features: prop.tags || []
    }))

    const systemPrompt = `You are an expert real estate AI assistant. Analyze the user's search query and provide insights about the available properties.

User Query: "${query}"
Search Type: ${searchType}

Available Properties:
${JSON.stringify(propertyData, null, 2)}

Respond with a JSON object containing:
- insight: A brief market insight (2-3 sentences)
- recommendations: Array of up to 3 property recommendations with property_id, reason, and score (70-95)
- market_analysis: Brief market trends analysis (1-2 sentences) 
- search_tips: Helpful search tips (1-2 sentences)

Focus on matching properties to the user's query. Be specific about why each property is recommended.`

    console.log('Calling Google AI API...')
    
    const aiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GOOGLE_AI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: systemPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
        }
      })
    })

    console.log('AI API Response Status:', aiResponse.status)

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text()
      console.error('Google AI API Error:', errorText)
      throw new Error(`Google AI API error: ${aiResponse.status}`)
    }

    const aiData = await aiResponse.json()
    console.log('AI Response received')

    const generatedText = aiData.candidates?.[0]?.content?.parts?.[0]?.text
    if (!generatedText) {
      throw new Error('No response from Google AI')
    }

    console.log('Generated text:', generatedText)

    // Parse the AI response
    let parsedResponse: AISearchResponse
    try {
      // Extract JSON from the response
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON found in AI response')
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError)
      
      // Create fallback response
      parsedResponse = {
        insight: `Based on your search for "${query}", I found ${propertyData.length} matching properties with varying features and price points.`,
        recommendations: propertyData.slice(0, 2).map((prop, index) => ({
          property_id: prop.id,
          reason: `This property in ${prop.location} offers good value at $${prop.price}/night with a ${prop.rating} star rating.`,
          score: 85 - (index * 5)
        })),
        market_analysis: "Current market shows diverse options with competitive pricing across different property types.",
        search_tips: "Try filtering by specific amenities or adjusting your price range to find more options."
      }
    }

    // Validate response structure
    if (!parsedResponse.insight || !Array.isArray(parsedResponse.recommendations)) {
      parsedResponse = {
        insight: `Search for "${query}" returned ${propertyData.length} properties with diverse options.`,
        recommendations: propertyData.slice(0, 3).map((prop, index) => ({
          property_id: prop.id,
          reason: `Recommended property in ${prop.location} with good ratings and amenities.`,
          score: 88 - (index * 3)
        })),
        market_analysis: "Market shows healthy variety in property types and pricing.",
        search_tips: "Consider expanding your search criteria for more options."
      }
    }

    console.log('Final AI response:', parsedResponse)

    return new Response(
      JSON.stringify({
        success: true,
        data: parsedResponse
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in property-ai-search function:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'AI search failed'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
