
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar,
  DollarSign,
  Heart,
  Camera,
  TrendingUp,
  Wifi,
  Car,
  Waves
} from 'lucide-react';
import { EnhancedProperty } from '@/hooks/usePropertyData';

interface PropertyCardProps {
  property: EnhancedProperty;
  showMarketData?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  showMarketData = false 
}) => {
  const primaryPhoto = property.property_photos?.find(photo => photo.is_primary) 
    || property.property_photos?.[0];
  
  const marketData = property.property_market_data?.[0];
  
  const formatPrice = (price: number | null) => {
    if (!price) return 'Price on request';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getPropertyFeatures = () => {
    const features = [];
    if (property.pool) features.push({ icon: Waves, label: 'Pool' });
    if (property.garage_spaces && property.garage_spaces > 0) {
      features.push({ icon: Car, label: `${property.garage_spaces} Car Garage` });
    }
    
    // Add features from property_features table
    const wifiFeature = property.property_features?.find(f => 
      f.feature_name.toLowerCase().includes('wifi') || 
      f.feature_name.toLowerCase().includes('internet')
    );
    if (wifiFeature) features.push({ icon: Wifi, label: 'High-Speed Internet' });
    
    return features.slice(0, 3); // Show max 3 features
  };

  const features = getPropertyFeatures();

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
      <div className="relative">
        <img
          src={primaryPhoto?.photo_url || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop"}
          alt={property.address}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {property.listing_type && (
            <Badge variant="secondary" className="bg-purple-600 text-white text-xs">
              For {property.listing_type}
            </Badge>
          )}
          {property.property_status === 'new' && (
            <Badge variant="secondary" className="bg-green-600 text-white text-xs">
              New Listing
            </Badge>
          )}
        </div>

        <div className="absolute top-3 right-3 flex gap-2">
          {property.property_photos && property.property_photos.length > 1 && (
            <Badge variant="secondary" className="bg-black/70 text-white text-xs">
              <Camera className="w-3 h-3 mr-1" />
              {property.property_photos.length}
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/80 backdrop-blur-sm hover:bg-white p-2"
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>

        {showMarketData && marketData?.price_estimate && (
          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="bg-blue-600 text-white text-xs">
              <TrendingUp className="w-3 h-3 mr-1" />
              Est. {formatPrice(marketData.price_estimate)}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-1">
              {formatPrice(property.current_value || 0)}
            </h3>
            <p className="text-gray-600 text-sm flex items-center mb-2">
              <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
              <span className="line-clamp-1">{property.address}</span>
            </p>
            <p className="text-gray-500 text-xs">
              {property.city}, {property.state} {property.zip_code}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
          {property.bedrooms && (
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              <span>{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              <span>{property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}</span>
            </div>
          )}
          {property.square_feet && (
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-1" />
              <span>{property.square_feet.toLocaleString()} sq ft</span>
            </div>
          )}
        </div>

        {features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {features.map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                <feature.icon className="w-3 h-3 mr-1" />
                {feature.label}
              </Badge>
            ))}
          </div>
        )}

        {property.year_built && (
          <div className="flex items-center text-xs text-gray-500 mb-3">
            <Calendar className="w-3 h-3 mr-1" />
            Built in {property.year_built}
          </div>
        )}

        {marketData && showMarketData && (
          <div className="border-t pt-2 mb-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              {marketData.price_per_sqft && (
                <div className="text-gray-600">
                  <span className="font-medium">${marketData.price_per_sqft}/sq ft</span>
                </div>
              )}
              {marketData.days_on_market && (
                <div className="text-gray-600">
                  <span className="font-medium">{marketData.days_on_market} days on market</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {property.property_type && (
              <span className="capitalize">{property.property_type}</span>
            )}
          </div>
          <Link to={`/property/${property.id}`}>
            <Button size="sm" className="gradient-ai text-white">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
