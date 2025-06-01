
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

type SearchHistory = Tables<'search_history'>;

export const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchHistory = async (limit = 10) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('search_history')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      setSearchHistory(data || []);
    } catch (err) {
      console.error('Error fetching search history:', err);
    } finally {
      setLoading(false);
    }
  };

  const addSearchQuery = async (searchQuery: string, searchType = 'general') => {
    try {
      const { error } = await supabase
        .from('search_history')
        .insert({
          search_query: searchQuery,
          search_type: searchType
        });

      if (error) throw error;
      
      // Refresh the history
      fetchSearchHistory();
    } catch (err) {
      console.error('Error adding search query:', err);
    }
  };

  const clearSearchHistory = async () => {
    try {
      const { error } = await supabase
        .from('search_history')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

      if (error) throw error;
      setSearchHistory([]);
    } catch (err) {
      console.error('Error clearing search history:', err);
    }
  };

  useEffect(() => {
    fetchSearchHistory();
  }, []);

  return {
    searchHistory,
    loading,
    fetchSearchHistory,
    addSearchQuery,
    clearSearchHistory
  };
};
