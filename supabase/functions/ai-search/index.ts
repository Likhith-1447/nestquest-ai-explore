
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SearchRequest {
  query: string
  properties: any[]
  searchType?: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { query, properties, searchType = 'general' }: SearchRequest = await req.json()
    console.log('Received request:', { query, propertiesCount: properties.length, searchType })

    const GOOGLE_AI_API_KEY = Deno.env.get('GOOGLE_AI_API_KEY')
    if (!GOOGLE_AI_API_KEY) {
      throw new Error('Google AI API key not configured')
    }

    // Limit properties to avoid token limits and format them better
    const limitedProperties = properties.slice(0, 3).map(prop => ({
      id: prop.id,
      title: prop.title,
      location: prop.location,
      price: prop.price,
      rating: prop.rating,
      tags: prop.tags
    }))

    // Create a more focused prompt for Gemini
    const prompt = `You are a real estate AI assistant. Analyze this search query and provide insights in JSON format.

Search Query: "${query}"
Search Type: ${searchType}

Available Properties:
${JSON.stringify(limitedProperties, null, 2)}

Provide a JSON response with exactly this structure:
{
  "insight": "Brief market insight about the search (max 100 words)",
  "recommendations": [
    {
      "property_id": "1",
      "reason": "specific reason why this property matches the search",
      "score": 85
    }
  ],
  "market_analysis": "Market trends and pricing insights (max 80 words)",
  "search_tips": "Helpful tips for the user's search (max 60 words)"
}

Focus on matching the search query "${query}" with the available properties. Provide specific reasons and realistic scores (70-95).`

    console.log('Calling Google AI API...')

    // Call Google AI (Gemini) with proper error handling
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GOOGLE_AI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ],
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Google AI API error:', response.status, errorText)
      throw new Error(`Google AI API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    console.log('Google AI response received:', JSON.stringify(data, null, 2))

    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text
    if (!aiResponse) {
      console.error('No response from Google AI:', data)
      throw new Error('No response from Google AI')
    }

    console.log('Raw AI response:', aiResponse)

    // Try to parse JSON response with better error handling
    let parsedResponse
    try {
      // Clean the response text to extract JSON
      const cleanedResponse = aiResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/)
      
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0])
        console.log('Successfully parsed JSON response:', parsedResponse)
      } else {
        throw new Error('No JSON found in response')
      }
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError)
      console.error('Original response:', aiResponse)
      
      // Create fallback response based on search query
      parsedResponse = {
        insight: `Based on your search for "${query}", here are some insights about the available properties in your area.`,
        recommendations: limitedProperties.slice(0, 2).map(prop => ({
          property_id: prop.id.toString(),
          reason: `This ${prop.title.toLowerCase()} matches your search criteria with ${prop.tags?.join(', ') || 'great features'}.`,
          score: Math.floor(Math.random() * 15) + 80
        })),
        market_analysis: "The current market shows varied pricing with good availability across different property types.",
        search_tips: "Consider filtering by specific amenities and price range to find your ideal match."
      }
    }

    // Validate the response structure
    if (!parsedResponse.insight || !Array.isArray(parsedResponse.recommendations)) {
      console.warn('Invalid response structure, using fallback')
      parsedResponse = {
        insight: `Search results for "${query}" show ${limitedProperties.length} relevant properties.`,
        recommendations: limitedProperties.map(prop => ({
          property_id: prop.id.toString(),
          reason: `Great option in ${prop.location}`,
          score: 85
        })),
        market_analysis: "Market analysis available",
        search_tips: "Refine your search for better results"
      }
    }

    console.log('Final response:', parsedResponse)

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
    console.error('Error in ai-search function:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
