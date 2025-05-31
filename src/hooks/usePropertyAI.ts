
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

export const usePropertyAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState<AISearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeProperties = async (query: string, properties: any[], searchType: string = 'general') => {
    console.log('Starting AI property analysis:', { query, propertiesCount: properties.length, searchType });
    setIsLoading(true);
    setError(null);

    try {
      console.log('Calling property-ai-search function...');
      const { data, error: functionError } = await supabase.functions.invoke('property-ai-search', {
        body: {
          query,
          properties,
          searchType
        }
      });

      console.log('Function response:', { data, error: functionError });

      if (functionError) {
        console.error('Function error:', functionError);
        throw new Error(functionError.message || 'Failed to analyze properties');
      }

      if (data?.success) {
        console.log('AI analysis successful:', data.data);
        setAiInsights(data.data);
        setError(null);
      } else {
        console.error('AI analysis failed:', data);
        throw new Error(data?.error || 'AI analysis failed');
      }
    } catch (err) {
      console.error('AI analysis error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      
      // Set fallback insights
      setAiInsights({
        insight: `Analysis for "${query}" is temporarily unavailable. Showing basic property information.`,
        recommendations: [],
        market_analysis: 'Market analysis will be available shortly.',
        search_tips: 'Try adjusting your search criteria or check back in a moment.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearInsights = () => {
    setAiInsights(null);
    setError(null);
  };

  return {
    analyzeProperties,
    aiInsights,
    isLoading,
    error,
    clearInsights
  };
};
