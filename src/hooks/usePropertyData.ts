
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

type Property = Tables<'properties'>;
type PropertyPhoto = Tables<'property_photos'>;
type PropertyFeature = Tables<'property_features'>;
type Neighborhood = Tables<'neighborhoods'>;
type PropertyMarketData = Tables<'property_market_data'>;

export interface EnhancedProperty extends Property {
  property_photos?: PropertyPhoto[];
  property_features?: PropertyFeature[];
  neighborhoods?: Neighborhood;
  property_market_data?: PropertyMarketData[];
}

export const usePropertyData = () => {
  const [properties, setProperties] = useState<EnhancedProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async (filters?: {
    city?: string;
    state?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    propertyType?: string;
  }) => {
    try {
      setLoading(true);
      let query = supabase
        .from('properties')
        .select(`
          *,
          property_photos(*),
          property_features(*),
          neighborhoods(*),
          property_market_data(*)
        `)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters?.city) {
        query = query.ilike('city', `%${filters.city}%`);
      }
      if (filters?.state) {
        query = query.ilike('state', `%${filters.state}%`);
      }
      if (filters?.minPrice) {
        query = query.gte('current_value', filters.minPrice);
      }
      if (filters?.maxPrice) {
        query = query.lte('current_value', filters.maxPrice);
      }
      if (filters?.bedrooms) {
        query = query.gte('bedrooms', filters.bedrooms);
      }
      if (filters?.bathrooms) {
        query = query.gte('bathrooms', filters.bathrooms);
      }
      if (filters?.propertyType) {
        query = query.eq('property_type', filters.propertyType);
      }

      const { data, error: fetchError } = await query.limit(50);

      if (fetchError) throw fetchError;

      setProperties(data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch properties');
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchProperties = async (searchQuery: string) => {
    try {
      setLoading(true);
      
      // Log the search
      await supabase.from('search_history').insert({
        search_query: searchQuery,
        search_type: 'general'
      });

      // Search across multiple fields
      const { data, error: searchError } = await supabase
        .from('properties')
        .select(`
          *,
          property_photos(*),
          property_features(*),
          neighborhoods(*),
          property_market_data(*)
        `)
        .or(`address.ilike.%${searchQuery}%,city.ilike.%${searchQuery}%,state.ilike.%${searchQuery}%,zip_code.ilike.%${searchQuery}%`)
        .order('created_at', { ascending: false })
        .limit(50);

      if (searchError) throw searchError;

      setProperties(data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search properties');
      console.error('Error searching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const getPropertyById = async (id: string): Promise<EnhancedProperty | null> => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          property_photos(*),
          property_features(*),
          neighborhoods(*),
          property_market_data(*)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error fetching property:', err);
      return null;
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return {
    properties,
    loading,
    error,
    fetchProperties,
    searchProperties,
    getPropertyById,
    refetch: fetchProperties
  };
};
