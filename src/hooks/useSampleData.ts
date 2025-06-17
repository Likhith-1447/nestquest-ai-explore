
import { useState, useRef } from 'react';
import { EnhancedProperty } from '@/hooks/usePropertyData';
import { sampleProperties } from '@/data/sampleProperties';

// Cache to store consistent results for each search query
const searchCache = new Map<string, EnhancedProperty[]>();

export const useSampleData = () => {
  const [loading, setLoading] = useState(false);

  const loadSampleProperties = async (searchQuery?: string): Promise<EnhancedProperty[]> => {
    console.log('useSampleData: Loading sample properties with query:', searchQuery);
    setLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (!searchQuery) {
        return sampleProperties.slice(0, 5);
      }

      // Check cache first for consistent results
      const cacheKey = searchQuery.toLowerCase().trim();
      if (searchCache.has(cacheKey)) {
        console.log('useSampleData: Returning cached results for:', cacheKey);
        return searchCache.get(cacheKey)!;
      }

      // Define specific property sets for different search queries
      const getPropertiesForQuery = (query: string): EnhancedProperty[] => {
        const q = query.toLowerCase();
        
        // Mountain cabins in Colorado - always return the same 5 properties
        if ((q.includes('mountain') && q.includes('cabin')) || (q.includes('colorado') && q.includes('cabin'))) {
          return [
            sampleProperties[1], // Aspen cabin
            sampleProperties[0], // Beverly Hills (luxury mountain-style)
            sampleProperties[3], // San Francisco townhouse
            sampleProperties[5], // Austin house
            sampleProperties[2]  // NYC condo
          ];
        }
        
        // Beverly Hills luxury homes
        if (q.includes('beverly') || (q.includes('luxury') && q.includes('ca'))) {
          return [
            sampleProperties[0], // Beverly Hills house
            sampleProperties[4], // Miami condo
            sampleProperties[3], // San Francisco townhouse
            sampleProperties[1], // Aspen cabin
            sampleProperties[6]  // Seattle commercial
          ];
        }
        
        // New York / NYC properties
        if (q.includes('new york') || q.includes('nyc') || q.includes('manhattan')) {
          return [
            sampleProperties[2], // NYC condo
            sampleProperties[7], // LA apartment
            sampleProperties[0], // Beverly Hills
            sampleProperties[4], // Miami condo
            sampleProperties[3]  // San Francisco townhouse
          ];
        }
        
        // Miami / Florida properties
        if (q.includes('miami') || q.includes('florida') || q.includes('fl')) {
          return [
            sampleProperties[4], // Miami condo
            sampleProperties[2], // NYC condo
            sampleProperties[0], // Beverly Hills
            sampleProperties[7], // LA apartment
            sampleProperties[3]  // San Francisco townhouse
          ];
        }
        
        // Austin / Texas properties
        if (q.includes('austin') || q.includes('texas') || q.includes('tx')) {
          return [
            sampleProperties[5], // Austin house
            sampleProperties[0], // Beverly Hills
            sampleProperties[4], // Miami condo
            sampleProperties[1], // Aspen cabin
            sampleProperties[3]  // San Francisco townhouse
          ];
        }
        
        // Seattle / Washington properties
        if (q.includes('seattle') || q.includes('washington') || q.includes('wa')) {
          return [
            sampleProperties[6], // Seattle commercial
            sampleProperties[3], // San Francisco townhouse
            sampleProperties[2], // NYC condo
            sampleProperties[0], // Beverly Hills
            sampleProperties[5]  // Austin house
          ];
        }
        
        // Default fallback - return first 5 properties
        return sampleProperties.slice(0, 5);
      };

      const results = getPropertiesForQuery(cacheKey);
      
      // Cache the results for consistency
      searchCache.set(cacheKey, results);
      
      console.log('useSampleData: Cached and returning', results.length, 'properties for query:', cacheKey);
      return results;
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

  const clearCache = () => {
    searchCache.clear();
    console.log('useSampleData: Cache cleared');
  };

  return {
    loadSampleProperties,
    getPropertyById,
    clearCache,
    loading
  };
};
