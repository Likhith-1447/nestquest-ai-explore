
import { useState, useEffect } from 'react';
import { EnhancedProperty } from './types';
import { isValidUUID } from './utils';
import { 
  fetchPropertiesFromSupabase, 
  searchPropertiesInSupabase, 
  getPropertyByIdFromSupabase 
} from './queries';
import { useSampleData } from '@/hooks/useSampleData';

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
  const { loadSampleProperties, getPropertyById: getSamplePropertyById } = useSampleData();

  const fetchProperties = async (filters?: PropertyFilters) => {
    try {
      setLoading(true);
      
      // Try to fetch from Supabase first
      let data = await fetchPropertiesFromSupabase(filters);
      
      // If no data from Supabase, use sample data
      if (!data || data.length === 0) {
        console.log('No data from Supabase, loading sample data...');
        data = await loadSampleProperties();
      }
      
      setProperties(data || []);
      setError(null);
    } catch (err) {
      console.log('Error fetching from Supabase, falling back to sample data:', err);
      
      // Fallback to sample data on error
      try {
        const sampleData = await loadSampleProperties();
        setProperties(sampleData);
        setError(null);
      } catch (sampleErr) {
        setError('Failed to load properties');
        console.error('Error loading sample data:', sampleErr);
        setProperties([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const searchProperties = async (searchQuery: string) => {
    try {
      setLoading(true);
      
      // Try Supabase search first
      let data = await searchPropertiesInSupabase(searchQuery);
      
      // If no results from Supabase, use sample data
      if (!data || data.length === 0) {
        console.log('No search results from Supabase, using sample data...');
        data = await loadSampleProperties(searchQuery);
      }
      
      setProperties(data || []);
      setError(null);
    } catch (err) {
      console.log('Error searching Supabase, falling back to sample data:', err);
      
      // Fallback to sample data
      try {
        const sampleData = await loadSampleProperties(searchQuery);
        setProperties(sampleData);
        setError(null);
      } catch (sampleErr) {
        setError('Failed to search properties');
        console.error('Error searching sample data:', sampleErr);
        setProperties([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const getPropertyById = async (id: string): Promise<EnhancedProperty | null> => {
    console.log('getPropertyById called with ID:', id);
    
    try {
      if (isValidUUID(id)) {
        console.log('ID is valid UUID, querying Supabase...');
        
        // Try Supabase first
        let data = await getPropertyByIdFromSupabase(id);
        
        if (data) {
          console.log('Found property in Supabase:', data);
          return data;
        }
      }
      
      // Fallback to sample data
      console.log('Trying sample data...');
      const sampleProperty = await getSamplePropertyById(id);
      
      if (sampleProperty) {
        console.log('Found property in sample data:', sampleProperty);
        return sampleProperty;
      }
      
      console.log('Property not found in either source');
      return null;
    } catch (err) {
      console.error('Error fetching property:', err);
      
      // Try sample data as final fallback
      try {
        const sampleProperty = await getSamplePropertyById(id);
        return sampleProperty;
      } catch (sampleErr) {
        console.error('Error fetching from sample data:', sampleErr);
        return null;
      }
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
