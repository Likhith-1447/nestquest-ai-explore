
import { useState } from 'react';
import { EnhancedProperty } from '@/hooks/usePropertyData';
import { sampleProperties } from '@/data/sampleProperties';

export const useSampleData = () => {
  const [loading, setLoading] = useState(false);

  const loadSampleProperties = async (searchQuery?: string): Promise<EnhancedProperty[]> => {
    console.log('useSampleData: Loading sample properties with query:', searchQuery);
    setLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredProperties = [...sampleProperties];
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredProperties = sampleProperties.filter(property => 
          property.address.toLowerCase().includes(query) ||
          property.city.toLowerCase().includes(query) ||
          property.state.toLowerCase().includes(query) ||
          property.property_type?.toLowerCase().includes(query) ||
          (query.includes('mountain') && (property.city.toLowerCase().includes('aspen') || property.state.toLowerCase() === 'co')) ||
          (query.includes('cabin') && property.property_type?.toLowerCase().includes('cabin')) ||
          (query.includes('luxury') && (property.current_value || 0) > 1000000) ||
          (query.includes('beach') && property.city.toLowerCase().includes('miami')) ||
          (query.includes('waterfront') && property.city.toLowerCase().includes('miami'))
        );
      }
      
      console.log('useSampleData: Filtered properties count:', filteredProperties.length);
      return filteredProperties;
    } finally {
      setLoading(false);
    }
  };

  const getPropertyById = async (id: string): Promise<EnhancedProperty | null> => {
    console.log('useSampleData: Getting property by ID:', id);
    
    // Find property by ID in sample data
    const property = sampleProperties.find(p => p.id === id);
    
    if (property) {
      console.log('useSampleData: Found property:', property.address);
      return property;
    }
    
    console.log('useSampleData: Property not found');
    return null;
  };

  return {
    loadSampleProperties,
    getPropertyById,
    loading
  };
};
