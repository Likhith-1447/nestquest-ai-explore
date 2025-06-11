
import { EnhancedProperty } from '@/hooks/usePropertyData';

export const sampleProperties: EnhancedProperty[] = [
  // Luxury Single Family Homes
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    address: '2845 Aspen Ridge Drive',
    city: 'Aspen',
    state: 'Colorado',
    zip_code: '81611',
    property_type: 'single_family',
    listing_type: 'sale',
    bedrooms: 5,
    bathrooms: 4.5,
    square_feet: 4200,
    lot_size: 2.1,
    current_value: 3250000,
    last_sale_price: 2800000,
    last_sale_date: '2023-08-15',
    year_built: 2019,
    latitude: 39.1911,
    longitude: -106.8175,
    property_status: 'active',
    pool: true,
    fireplace: true,
    garage_spaces: 3,
    parking_spaces: 4,
    air_conditioning: true,
    basement: false,
    hoa_fee: 250,
    walkability_score: 45,
    transit_score: 25,
    heating_type: 'forced_air',
    roof_type: 'tile',
    exterior_material: 'stone',
    school_district: 'Aspen School District',
    owner_name: 'Mountain Vista Properties LLC',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-06-10T15:30:00Z',
    property_photos: [
      {
        id: 'photo-001',
        property_id: '550e8400-e29b-41d4-a716-446655440001',
        photo_url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop',
        is_primary: true,
        photo_order: 1,
        created_at: '2024-01-15T10:00:00Z'
      }
    ],
    property_features: [
      {
        id: 'feature-001',
        property_id: '550e8400-e29b-41d4-a716-446655440001',
        feature_type: 'luxury',
        feature_name: 'Mountain Views',
        feature_value: 'panoramic',
        created_at: '2024-01-15T10:00:00Z'
      }
    ],
    property_market_data: [
      {
        id: 'market-001',
        property_id: '550e8400-e29b-41d4-a716-446655440001',
        price_estimate: 3250000,
        rent_estimate: 8500,
        price_per_sqft: 773.81,
        days_on_market: 45,
        data_source: 'MLS',
        last_updated: '2024-06-10T15:30:00Z',
        tax_year: 2024,
        tax_assessment: 2900000,
        estimated_monthly_costs: {
          property_tax: 2416,
          insurance: 850,
          hoa: 250,
          utilities: 450
        },
        market_trends: {
          price_change_1yr: 15.2,
          price_change_5yr: 42.8,
          market_appreciation: 'strong'
        },
        price_history: [
          { date: '2023-08-15', price: 2800000, event: 'sale' },
          { date: '2024-06-10', price: 3250000, event: 'estimate' }
        ]
      }
    ]
  },
  
  // Modern Condo
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    address: '1250 Pearl Street, Unit 401',
    city: 'Boulder',
    state: 'Colorado',
    zip_code: '80302',
    property_type: 'condo',
    listing_type: 'sale',
    bedrooms: 2,
    bathrooms: 2,
    square_feet: 1200,
    lot_size: null,
    current_value: 685000,
    last_sale_price: 620000,
    last_sale_date: '2022-11-20',
    year_built: 2020,
    latitude: 40.0176,
    longitude: -105.2797,
    property_status: 'active',
    pool: false,
    fireplace: true,
    garage_spaces: 1,
    parking_spaces: 1,
    air_conditioning: true,
    basement: false,
    hoa_fee: 485,
    walkability_score: 92,
    transit_score: 68,
    heating_type: 'radiant',
    roof_type: 'flat',
    exterior_material: 'glass_steel',
    school_district: 'Boulder Valley School District',
    owner_name: 'Urban Living Properties',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-06-10T15:30:00Z',
    property_photos: [
      {
        id: 'photo-002',
        property_id: '550e8400-e29b-41d4-a716-446655440002',
        photo_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
        is_primary: true,
        photo_order: 1,
        created_at: '2024-01-15T10:00:00Z'
      }
    ],
    property_features: [
      {
        id: 'feature-002',
        property_id: '550e8400-e29b-41d4-a716-446655440002',
        feature_type: 'modern',
        feature_name: 'Smart Home',
        feature_value: 'fully_integrated',
        created_at: '2024-01-15T10:00:00Z'
      }
    ],
    property_market_data: [
      {
        id: 'market-002',
        property_id: '550e8400-e29b-41d4-a716-446655440002',
        price_estimate: 685000,
        rent_estimate: 3200,
        price_per_sqft: 570.83,
        days_on_market: 28,
        data_source: 'MLS',
        last_updated: '2024-06-10T15:30:00Z',
        tax_year: 2024,
        tax_assessment: 650000,
        estimated_monthly_costs: {
          property_tax: 542,
          insurance: 125,
          hoa: 485,
          utilities: 180
        },
        market_trends: {
          price_change_1yr: 8.5,
          price_change_5yr: 28.3,
          market_appreciation: 'moderate'
        },
        price_history: [
          { date: '2022-11-20', price: 620000, event: 'sale' },
          { date: '2024-06-10', price: 685000, event: 'estimate' }
        ]
      }
    ]
  },

  // Townhouse
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    address: '3456 Cherry Creek Lane',
    city: 'Denver',
    state: 'Colorado',
    zip_code: '80209',
    property_type: 'townhouse',
    listing_type: 'sale',
    bedrooms: 3,
    bathrooms: 2.5,
    square_feet: 1850,
    lot_size: 0.15,
    current_value: 795000,
    last_sale_price: 720000,
    last_sale_date: '2023-03-10',
    year_built: 2018,
    latitude: 39.7392,
    longitude: -104.9903,
    property_status: 'active',
    pool: false,
    fireplace: true,
    garage_spaces: 2,
    parking_spaces: 2,
    air_conditioning: true,
    basement: true,
    hoa_fee: 320,
    walkability_score: 78,
    transit_score: 65,
    heating_type: 'forced_air',
    roof_type: 'shingle',
    exterior_material: 'brick',
    school_district: 'Cherry Creek School District',
    owner_name: 'Cherry Creek Development',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-06-10T15:30:00Z',
    property_photos: [
      {
        id: 'photo-003',
        property_id: '550e8400-e29b-41d4-a716-446655440003',
        photo_url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
        is_primary: true,
        photo_order: 1,
        created_at: '2024-01-15T10:00:00Z'
      }
    ]
  },

  // Rental Apartment
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    address: '789 Downtown Loft Building, Unit 2B',
    city: 'Denver',
    state: 'Colorado',
    zip_code: '80202',
    property_type: 'apartment',
    listing_type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    square_feet: 750,
    lot_size: null,
    current_value: 2400,
    last_sale_price: null,
    last_sale_date: null,
    year_built: 2015,
    latitude: 39.7525,
    longitude: -104.9926,
    property_status: 'active',
    pool: true,
    fireplace: false,
    garage_spaces: 0,
    parking_spaces: 1,
    air_conditioning: true,
    basement: false,
    hoa_fee: null,
    walkability_score: 95,
    transit_score: 88,
    heating_type: 'forced_air',
    roof_type: 'flat',
    exterior_material: 'glass_steel',
    school_district: 'Denver Public Schools',
    owner_name: 'Metro Residential Properties',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-06-10T15:30:00Z',
    property_photos: [
      {
        id: 'photo-004',
        property_id: '550e8400-e29b-41d4-a716-446655440004',
        photo_url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
        is_primary: true,
        photo_order: 1,
        created_at: '2024-01-15T10:00:00Z'
      }
    ]
  },

  // Luxury Mountain Cabin
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    address: '15 Elk Ridge Trail',
    city: 'Vail',
    state: 'Colorado',
    zip_code: '81657',
    property_type: 'cabin',
    listing_type: 'sale',
    bedrooms: 4,
    bathrooms: 3,
    square_feet: 2800,
    lot_size: 1.5,
    current_value: 2150000,
    last_sale_price: 1950000,
    last_sale_date: '2023-06-01',
    year_built: 2021,
    latitude: 39.6403,
    longitude: -106.3742,
    property_status: 'active',
    pool: false,
    fireplace: true,
    garage_spaces: 2,
    parking_spaces: 4,
    air_conditioning: false,
    basement: true,
    hoa_fee: 450,
    walkability_score: 25,
    transit_score: 10,
    heating_type: 'radiant',
    roof_type: 'metal',
    exterior_material: 'log',
    school_district: 'Eagle County School District',
    owner_name: 'Alpine Retreats LLC',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-06-10T15:30:00Z',
    property_photos: [
      {
        id: 'photo-005',
        property_id: '550e8400-e29b-41d4-a716-446655440005',
        photo_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop',
        is_primary: true,
        photo_order: 1,
        created_at: '2024-01-15T10:00:00Z'
      }
    ]
  },

  // Affordable Starter Home
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    address: '2234 Maple Street',
    city: 'Colorado Springs',
    state: 'Colorado',
    zip_code: '80909',
    property_type: 'single_family',
    listing_type: 'sale',
    bedrooms: 3,
    bathrooms: 2,
    square_feet: 1400,
    lot_size: 0.25,
    current_value: 385000,
    last_sale_price: 325000,
    last_sale_date: '2021-09-15',
    year_built: 1985,
    latitude: 38.8339,
    longitude: -104.8214,
    property_status: 'active',
    pool: false,
    fireplace: true,
    garage_spaces: 1,
    parking_spaces: 2,
    air_conditioning: true,
    basement: false,
    hoa_fee: null,
    walkability_score: 52,
    transit_score: 35,
    heating_type: 'forced_air',
    roof_type: 'shingle',
    exterior_material: 'vinyl',
    school_district: 'Colorado Springs School District 11',
    owner_name: 'Smith Family Trust',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-06-10T15:30:00Z',
    property_photos: [
      {
        id: 'photo-006',
        property_id: '550e8400-e29b-41d4-a716-446655440006',
        photo_url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop',
        is_primary: true,
        photo_order: 1,
        created_at: '2024-01-15T10:00:00Z'
      }
    ]
  },

  // Commercial Property
  {
    id: '550e8400-e29b-41d4-a716-446655440007',
    address: '4567 Business Park Drive',
    city: 'Westminster',
    state: 'Colorado',
    zip_code: '80031',
    property_type: 'commercial',
    listing_type: 'sale',
    bedrooms: null,
    bathrooms: 4,
    square_feet: 8500,
    lot_size: 2.2,
    current_value: 1850000,
    last_sale_price: 1650000,
    last_sale_date: '2022-04-20',
    year_built: 2005,
    latitude: 39.8367,
    longitude: -105.0372,
    property_status: 'active',
    pool: false,
    fireplace: false,
    garage_spaces: 0,
    parking_spaces: 35,
    air_conditioning: true,
    basement: false,
    hoa_fee: null,
    walkability_score: 45,
    transit_score: 42,
    heating_type: 'hvac',
    roof_type: 'flat',
    exterior_material: 'steel',
    school_district: null,
    owner_name: 'Commercial Properties Inc',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-06-10T15:30:00Z',
    property_photos: [
      {
        id: 'photo-007',
        property_id: '550e8400-e29b-41d4-a716-446655440007',
        photo_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
        is_primary: true,
        photo_order: 1,
        created_at: '2024-01-15T10:00:00Z'
      }
    ]
  },

  // Luxury Pool Home
  {
    id: '550e8400-e29b-41d4-a716-446655440008',
    address: '8899 Sunset Ridge Court',
    city: 'Golden',
    state: 'Colorado',
    zip_code: '80401',
    property_type: 'single_family',
    listing_type: 'sale',
    bedrooms: 6,
    bathrooms: 5.5,
    square_feet: 5200,
    lot_size: 1.8,
    current_value: 1850000,
    last_sale_price: 1600000,
    last_sale_date: '2023-01-12',
    year_built: 2017,
    latitude: 39.7555,
    longitude: -105.2211,
    property_status: 'active',
    pool: true,
    fireplace: true,
    garage_spaces: 3,
    parking_spaces: 6,
    air_conditioning: true,
    basement: true,
    hoa_fee: 185,
    walkability_score: 35,
    transit_score: 25,
    heating_type: 'forced_air',
    roof_type: 'tile',
    exterior_material: 'stucco',
    school_district: 'Jefferson County School District',
    owner_name: 'Golden Hills Development',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-06-10T15:30:00Z',
    property_photos: [
      {
        id: 'photo-008',
        property_id: '550e8400-e29b-41d4-a716-446655440008',
        photo_url: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop',
        is_primary: true,
        photo_order: 1,
        created_at: '2024-01-15T10:00:00Z'
      }
    ]
  }
];

export const sampleNeighborhoods = [
  {
    id: '660e8400-e29b-41d4-a716-446655440001',
    name: 'Aspen Highlands',
    city: 'Aspen',
    state: 'Colorado',
    center_latitude: 39.1911,
    center_longitude: -106.8175,
    walkability_score: 45,
    transit_score: 25,
    bike_score: 65,
    crime_rate: 1.2,
    median_income: 125000,
    school_rating: 9.5,
    population: 8500,
    zip_codes: ['81611'],
    demographics: {
      median_age: 42,
      families_with_children: 35,
      college_educated: 78
    },
    amenities: {
      restaurants: 45,
      shopping: 25,
      parks: 12,
      schools: 8
    },
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-06-10T15:30:00Z'
  }
];
