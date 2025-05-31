
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AISearchResult {
  insight: string;
  recommendations: Array<{
    property_id: string;
    reason: string;
    score: number;
  }>;
  market_analysis: string;
  search_tips: string;
}

export const useAISearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState<AISearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const searchWithAI = async (query: string, properties: any[], searchType: string = 'general') => {
    console.log('Starting AI search with:', { query, propertiesCount: properties.length, searchType });
    setIsLoading(true);
    setError(null);

    try {
      console.log('Calling supabase function...');
      const { data, error: functionError } = await supabase.functions.invoke('ai-search', {
        body: {
          query,
          properties,
          searchType
        }
      });

      console.log('Function response:', { data, error: functionError });

      if (functionError) {
        console.error('Function error:', functionError);
        throw new Error(functionError.message || 'Failed to call AI search function');
      }

      if (data?.success) {
        console.log('AI search successful:', data.data);
        setAiInsights(data.data);
        setError(null); // Clear any previous errors
      } else {
        console.error('AI search failed:', data);
        throw new Error(data?.error || 'AI search failed');
      }
    } catch (err) {
      console.error('AI search error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      
      // Set fallback insights on error
      setAiInsights({
        insight: `Unable to get AI insights for "${query}" at this time. Please try again later.`,
        recommendations: [],
        market_analysis: 'AI analysis temporarily unavailable.',
        search_tips: 'Try refining your search criteria or check back later.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    searchWithAI,
    aiInsights,
    isLoading,
    error,
    clearError: () => setError(null)
  };
};
