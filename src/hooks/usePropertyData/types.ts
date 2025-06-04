
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
