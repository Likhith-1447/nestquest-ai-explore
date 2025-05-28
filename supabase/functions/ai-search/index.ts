
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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

    const GOOGLE_AI_API_KEY = Deno.env.get('GOOGLE_AI_API_KEY')
    if (!GOOGLE_AI_API_KEY) {
      throw new Error('Google AI API key not configured')
    }

    // Create prompt for Gemini
    const prompt = `You are a real estate AI assistant. Analyze the following search query and properties, then provide insights and recommendations.

Search Query: "${query}"
Search Type: ${searchType}

Properties Data: ${JSON.stringify(properties.slice(0, 5))} // Limit to avoid token limits

Please provide:
1. A brief insight about the search query and market trends
2. Highlight the top 3 properties that best match the search criteria with reasons
3. Any relevant market insights or advice
4. Price range analysis if applicable

Format your response as JSON with these fields:
{
  "insight": "Brief market insight about the search",
  "recommendations": [
    {
      "property_id": "property_id",
      "reason": "why this property is recommended",
      "score": 95
    }
  ],
  "market_analysis": "Market trends and pricing insights",
  "search_tips": "Helpful tips for the user's search"
}`

    // Call Google AI (Gemini)
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
          temperature: 0.7,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(`Google AI API error: ${response.status}`)
    }

    const data = await response.json()
    console.log('Google AI response:', data)

    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text
    if (!aiResponse) {
      throw new Error('No response from Google AI')
    }

    // Try to parse JSON response, fallback to text if not valid JSON
    let parsedResponse
    try {
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0])
      } else {
        parsedResponse = {
          insight: aiResponse.substring(0, 200) + '...',
          recommendations: [],
          market_analysis: 'AI analysis available',
          search_tips: 'Refine your search criteria for better results'
        }
      }
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError)
      parsedResponse = {
        insight: aiResponse.substring(0, 200) + '...',
        recommendations: [],
        market_analysis: 'AI analysis available',
        search_tips: 'Refine your search criteria for better results'
      }
    }

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
