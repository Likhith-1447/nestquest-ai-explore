
import { useState, useEffect } from 'react';
import { EnhancedProperty } from './types';
import { isValidUUID } from './utils';
import { 
  fetchPropertiesFromSupabase, 
  searchPropertiesInSupabase, 
  getPropertyByIdFromSupabase 
} from './queries';

interface PropertyFilters {
  city?: string;
  state?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string;
}

export const usePropertyData = () => {
  const [properties, setProperties] = useState<EnhancedProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async (filters?: PropertyFilters) => {
    try {
      setLoading(true);
      const data = await fetchPropertiesFromSupabase(filters);
      setProperties(data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch properties');
      console.error('Error fetching properties:', err);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const searchProperties = async (searchQuery: string) => {
    try {
      setLoading(true);
      const data = await searchPropertiesInSupabase(searchQuery);
      setProperties(data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search properties');
      console.error('Error searching properties:', err);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const getPropertyById = async (id: string): Promise<EnhancedProperty | null> => {
    console.log('getPropertyById called with ID:', id);
    
    try {
      if (isValidUUID(id)) {
        console.log('ID is valid UUID, querying Supabase...');
        const data = await getPropertyByIdFromSupabase(id);
        console.log('Found property in Supabase:', data);
        return data;
      } else {
        console.log('ID is not valid UUID');
        return null;
      }
    } catch (err) {
      console.error('Error fetching property from Supabase:', err);
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
