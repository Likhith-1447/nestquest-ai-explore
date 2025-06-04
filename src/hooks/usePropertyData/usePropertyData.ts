
import { useState, useEffect } from 'react';
import { EnhancedProperty } from './types';
import { getSampleProperties } from './sampleData';
import { isValidUUID, mapToSampleId } from './utils';
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

      // If no properties found, use sample data
      if (!data || data.length === 0) {
        const sampleData = getSampleProperties('');
        setProperties(sampleData);
      } else {
        setProperties(data);
      }
      
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch properties');
      console.error('Error fetching properties:', err);
      
      // Fallback to sample data on error
      const sampleData = getSampleProperties('');
      setProperties(sampleData);
    } finally {
      setLoading(false);
    }
  };

  const searchProperties = async (searchQuery: string) => {
    try {
      setLoading(true);
      const data = await searchPropertiesInSupabase(searchQuery);

      // If no properties found, use sample data based on search query
      if (!data || data.length === 0) {
        const sampleData = getSampleProperties(searchQuery);
        setProperties(sampleData);
      } else {
        setProperties(data);
      }
      
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search properties');
      console.error('Error searching properties:', err);
      
      // Fallback to sample data based on search query
      const sampleData = getSampleProperties(searchQuery);
      setProperties(sampleData);
    } finally {
      setLoading(false);
    }
  };

  const getPropertyById = async (id: string): Promise<EnhancedProperty | null> => {
    console.log('getPropertyById called with ID:', id);
    
    try {
      // Only try Supabase query if the ID is a valid UUID
      if (isValidUUID(id)) {
        console.log('ID is valid UUID, querying Supabase...');
        const data = await getPropertyByIdFromSupabase(id);
        console.log('Found property in Supabase:', data);
        return data;
      } else {
        console.log('ID is not UUID, skipping Supabase query');
      }
    } catch (err) {
      console.error('Error fetching property from Supabase:', err);
    }
    
    // Always check sample data as fallback
    console.log('Checking sample data...');
    const sampleData = getSampleProperties('');
    const mappedId = mapToSampleId(id);
    console.log('Original ID:', id, 'Mapped ID:', mappedId);
    
    const foundProperty = sampleData.find(p => p.id === mappedId);
    console.log('Found sample property:', foundProperty);
    
    return foundProperty || null;
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
