
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
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('ai-search', {
        body: {
          query,
          properties,
          searchType
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.success) {
        setAiInsights(data.data);
      } else {
        throw new Error(data?.error || 'AI search failed');
      }
    } catch (err) {
      console.error('AI search error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
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
