
import { useState } from 'react';
import { sampleProperties, sampleNeighborhoods } from '@/data/sampleProperties';
import { EnhancedProperty } from '@/hooks/usePropertyData';

export const useSampleData = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loadSampleProperties = async (searchQuery?: string): Promise<EnhancedProperty[]> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredProperties = [...sampleProperties];
    
    // Filter based on search query if provided
    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredProperties = sampleProperties.filter(property => 
        property.address?.toLowerCase().includes(query) ||
        property.city?.toLowerCase().includes(query) ||
        property.state?.toLowerCase().includes(query) ||
        property.property_type?.toLowerCase().includes(query) ||
        (query.includes('pool') && property.pool) ||
        (query.includes('luxury') && (property.current_value || 0) > 1000000) ||
        (query.includes('mountain') && (property.city?.toLowerCase().includes('aspen') || property.city?.toLowerCase().includes('vail'))) ||
        (query.includes('cabin') && property.property_type === 'cabin') ||
        (query.includes('condo') && property.property_type === 'condo') ||
        (query.includes('townhouse') && property.property_type === 'townhouse') ||
        (query.includes('apartment') && property.property_type === 'apartment') ||
        (query.includes('commercial') && property.property_type === 'commercial')
      );
    }
    
    setIsLoading(false);
    return filteredProperties;
  };

  const getPropertyById = async (id: string): Promise<EnhancedProperty | null> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const property = sampleProperties.find(p => p.id === id);
    
    setIsLoading(false);
    return property || null;
  };

  return {
    loadSampleProperties,
    getPropertyById,
    isLoading,
    sampleProperties,
    sampleNeighborhoods
  };
};
