
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
        filteredProperties = sampleProperties.filter(property => {
          // Direct location matches
          const locationMatch = 
            property.address.toLowerCase().includes(query) ||
            property.city.toLowerCase().includes(query) ||
            property.state.toLowerCase().includes(query);
          
          // Specific property type searches
          const propertyTypeMatch = property.property_type?.toLowerCase().includes(query);
          
          // Mountain cabin searches - only show cabins in mountain areas
          if (query.includes('mountain') && query.includes('cabin')) {
            return property.property_type?.toLowerCase() === 'cabin' && 
                   (property.city.toLowerCase().includes('aspen') || property.state.toLowerCase() === 'co');
          }
          
          // Mountain properties (broader than just cabins)
          if (query.includes('mountain') && !query.includes('cabin')) {
            return property.city.toLowerCase().includes('aspen') || 
                   property.state.toLowerCase() === 'co' ||
                   property.city.toLowerCase().includes('denver');
          }
          
          // Cabin searches - only show actual cabins
          if (query.includes('cabin')) {
            return property.property_type?.toLowerCase() === 'cabin';
          }
          
          // Luxury searches - only high-value properties
          if (query.includes('luxury')) {
            return (property.current_value || 0) > 1500000;
          }
          
          // Beach/waterfront searches - only coastal properties
          if (query.includes('beach') || query.includes('waterfront')) {
            return property.city.toLowerCase().includes('miami') || 
                   property.city.toLowerCase().includes('malibu') ||
                   property.state.toLowerCase() === 'fl';
          }
          
          // Condo searches - only condos
          if (query.includes('condo')) {
            return property.property_type?.toLowerCase() === 'condo';
          }
          
          // Townhouse searches - only townhouses
          if (query.includes('townhouse')) {
            return property.property_type?.toLowerCase() === 'townhouse';
          }
          
          // House searches - only single family houses
          if (query.includes('house') && !query.includes('townhouse')) {
            return property.property_type?.toLowerCase() === 'house';
          }
          
          // Commercial searches - only commercial properties
          if (query.includes('commercial') || query.includes('office')) {
            return property.property_type?.toLowerCase() === 'commercial';
          }
          
          // Apartment searches - only apartments
          if (query.includes('apartment') || query.includes('studio')) {
            return property.property_type?.toLowerCase() === 'apartment';
          }
          
          // City-specific searches
          if (query.includes('beverly hills') || query.includes('beverly')) {
            return property.city.toLowerCase().includes('beverly hills');
          }
          
          if (query.includes('aspen')) {
            return property.city.toLowerCase().includes('aspen');
          }
          
          if (query.includes('new york') || query.includes('nyc') || query.includes('manhattan')) {
            return property.city.toLowerCase().includes('new york');
          }
          
          if (query.includes('san francisco') || query.includes('sf')) {
            return property.city.toLowerCase().includes('san francisco');
          }
          
          if (query.includes('miami')) {
            return property.city.toLowerCase().includes('miami');
          }
          
          if (query.includes('austin')) {
            return property.city.toLowerCase().includes('austin');
          }
          
          if (query.includes('seattle')) {
            return property.city.toLowerCase().includes('seattle');
          }
          
          if (query.includes('los angeles') || query.includes('la') || query.includes('hollywood')) {
            return property.city.toLowerCase().includes('los angeles');
          }
          
          // State-specific searches
          if (query.includes('california') || query.includes('ca')) {
            return property.state.toLowerCase() === 'ca';
          }
          
          if (query.includes('colorado') || query.includes('co')) {
            return property.state.toLowerCase() === 'co';
          }
          
          if (query.includes('texas') || query.includes('tx')) {
            return property.state.toLowerCase() === 'tx';
          }
          
          if (query.includes('florida') || query.includes('fl')) {
            return property.state.toLowerCase() === 'fl';
          }
          
          if (query.includes('washington') || query.includes('wa')) {
            return property.state.toLowerCase() === 'wa';
          }
          
          if (query.includes('new york') || query.includes('ny')) {
            return property.state.toLowerCase() === 'ny';
          }
          
          // Rent vs sale searches
          if (query.includes('rent') || query.includes('rental')) {
            return property.listing_type?.toLowerCase() === 'rent';
          }
          
          if (query.includes('sale') || query.includes('buy')) {
            return property.listing_type?.toLowerCase() === 'sale';
          }
          
          // Fall back to basic location or property type matches
          return locationMatch || propertyTypeMatch;
        });
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
