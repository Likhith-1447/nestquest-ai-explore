
import { EnhancedProperty } from './types';

export const getSampleProperties = (searchQuery: string): EnhancedProperty[] => {
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
