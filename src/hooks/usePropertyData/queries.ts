
import { supabase } from '@/integrations/supabase/client';
import { EnhancedProperty } from './types';

interface PropertyFilters {
  city?: string;
  state?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string;
}

export const fetchPropertiesFromSupabase = async (filters?: PropertyFilters): Promise<EnhancedProperty[]> => {
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

  const { data, error } = await query.limit(50);

  if (error) throw error;
  return data || [];
};

export const searchPropertiesInSupabase = async (searchQuery: string): Promise<EnhancedProperty[]> => {
  // Log the search
  await supabase.from('search_history').insert({
    search_query: searchQuery,
    search_type: 'general'
  });

  // Search across multiple fields
  const { data, error } = await supabase
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

  if (error) throw error;
  return data || [];
};

export const getPropertyByIdFromSupabase = async (id: string): Promise<EnhancedProperty | null> => {
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
};
