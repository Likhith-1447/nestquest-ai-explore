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

// Sample properties for demonstration
const getSampleProperties = (searchQuery: string): EnhancedProperty[] => {
  const baseProperties: EnhancedProperty[] = [
    {
      id: 'sample-1',
      address: '123 Mountain View Drive',
      city: 'Aspen',
      state: 'Colorado',
      zip_code: '81611',
      property_type: 'single_family',
      current_value: 1250000,
      bedrooms: 4,
      bathrooms: 3.5,
      square_feet: 2800,
      year_built: 2018,
      latitude: 39.1911,
      longitude: -106.8175,
      listing_type: 'sale',
      property_status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      // Add missing required properties with default values
      air_conditioning: true,
      attom_id: null,
      basement: false,
      exterior_material: 'Wood',
      fireplace: true,
      garage_spaces: 2,
      heating_type: 'Forced Air',
      hoa_fee: null,
      last_sale_date: null,
      last_sale_price: null,
      lot_size: 0.5,
      neighborhood_id: null,
      owner_name: null,
      parking_spaces: 2,
      pool: false,
      roof_type: 'Shingle',
      school_district: 'Aspen School District',
      transit_score: null,
      walkability_score: null,
      property_photos: [{
        id: 'photo-1',
        property_id: 'sample-1',
        photo_url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
        is_primary: true,
        photo_order: 0,
        created_at: new Date().toISOString()
      }]
    },
    {
      id: 'sample-2',
      address: '456 Luxury Lane',
      city: 'Vail',
      state: 'Colorado',
      zip_code: '81657',
      property_type: 'condo',
      current_value: 980000,
      bedrooms: 3,
      bathrooms: 2,
      square_feet: 2200,
      year_built: 2020,
      latitude: 39.6403,
      longitude: -106.3742,
      listing_type: 'sale',
      property_status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      // Add missing required properties with default values
      air_conditioning: true,
      attom_id: null,
      basement: false,
      exterior_material: 'Brick',
      fireplace: true,
      garage_spaces: 1,
      heating_type: 'Radiant',
      hoa_fee: 450,
      last_sale_date: null,
      last_sale_price: null,
      lot_size: null,
      neighborhood_id: null,
      owner_name: null,
      parking_spaces: 1,
      pool: true,
      roof_type: 'Metal',
      school_district: 'Eagle County Schools',
      transit_score: null,
      walkability_score: null,
      property_photos: [{
        id: 'photo-2',
        property_id: 'sample-2',
        photo_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        is_primary: true,
        photo_order: 0,
        created_at: new Date().toISOString()
      }]
    },
    {
      id: 'sample-3',
      address: '789 Downtown Plaza',
      city: 'Denver',
      state: 'Colorado',
      zip_code: '80202',
      property_type: 'condo',
      current_value: 650000,
      bedrooms: 2,
      bathrooms: 2,
      square_feet: 1400,
      year_built: 2019,
      latitude: 39.7392,
      longitude: -104.9903,
      listing_type: 'sale',
      property_status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      // Add missing required properties with default values
      air_conditioning: true,
      attom_id: null,
      basement: false,
      exterior_material: 'Glass',
      fireplace: false,
      garage_spaces: 1,
      heating_type: 'Electric',
      hoa_fee: 275,
      last_sale_date: null,
      last_sale_price: null,
      lot_size: null,
      neighborhood_id: null,
      owner_name: null,
      parking_spaces: 1,
      pool: false,
      roof_type: 'Flat',
      school_district: 'Denver Public Schools',
      transit_score: null,
      walkability_score: null,
      property_photos: [{
        id: 'photo-3',
        property_id: 'sample-3',
        photo_url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop',
        is_primary: true,
        photo_order: 0,
        created_at: new Date().toISOString()
      }]
    }
  ];

  // Return different sample properties based on search query
  if (searchQuery.toLowerCase().includes('luxury')) {
    return baseProperties.filter(p => p.current_value! > 900000);
  } else if (searchQuery.toLowerCase().includes('condo')) {
    return baseProperties.filter(p => p.property_type === 'condo');
  } else if (searchQuery.toLowerCase().includes('mountain') || searchQuery.toLowerCase().includes('cabin')) {
    return baseProperties.filter(p => p.city === 'Aspen' || p.city === 'Vail');
  }
  
  return baseProperties;
};

// Helper function to check if a string is a valid UUID
const isValidUUID = (str: string) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};

// Helper function to map simple IDs to sample property IDs
const mapToSampleId = (id: string): string => {
  const idMappings: Record<string, string> = {
    '1': 'sample-1',
    '2': 'sample-2', 
    '3': 'sample-3'
  };
  
  return idMappings[id] || id;
};

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

      // If no properties found, use sample data
      if (!data || data.length === 0) {
        const sampleData = getSampleProperties('');
        setProperties(sampleData);
      } else {
        setProperties(data || []);
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

      // If no properties found, use sample data based on search query
      if (!data || data.length === 0) {
        const sampleData = getSampleProperties(searchQuery);
        setProperties(sampleData);
      } else {
        setProperties(data || []);
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
