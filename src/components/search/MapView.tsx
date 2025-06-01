
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Loader2, Navigation } from 'lucide-react';
import { EnhancedProperty } from '@/hooks/usePropertyData';

interface MapViewProps {
  properties: EnhancedProperty[];
  onPropertySelect: (property: EnhancedProperty) => void;
  isLoading: boolean;
}

interface MapPin {
  id: string;
  lat: number;
  lng: number;
  property: EnhancedProperty;
}

export const MapView: React.FC<MapViewProps> = ({
  properties,
  onPropertySelect,
  isLoading
}) => {
  const [selectedProperty, setSelectedProperty] = useState<EnhancedProperty | null>(null);
  const [mapPins, setMapPins] = useState<MapPin[]>([]);
  const [mapCenter, setMapCenter] = useState({ lat: 39.7392, lng: -104.9903 }); // Denver, CO

  useEffect(() => {
    // Generate map pins from properties
    const pins: MapPin[] = properties
      .filter(property => property.latitude && property.longitude)
      .map(property => ({
        id: property.id,
        lat: Number(property.latitude),
        lng: Number(property.longitude),
        property
      }));

    setMapPins(pins);

    // Center map on properties if available
    if (pins.length > 0) {
      const avgLat = pins.reduce((sum, pin) => sum + pin.lat, 0) / pins.length;
      const avgLng = pins.reduce((sum, pin) => sum + pin.lng, 0) / pins.length;
      setMapCenter({ lat: avgLat, lng: avgLng });
    }
  }, [properties]);

  const formatPrice = (price: number | null) => {
    if (!price) return 'Price on request';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handlePinClick = (property: EnhancedProperty) => {
    setSelectedProperty(property);
    onPropertySelect(property);
  };

  if (isLoading) {
    return (
      <Card className="h-96 flex items-center justify-center">
        <CardContent>
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading map...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Map Container */}
      <div className="lg:col-span-2">
        <Card className="h-96 lg:h-[600px] relative overflow-hidden">
          <div 
            className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 relative"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d1d5db' fill-opacity='0.1'%3E%3Cpath d='M20 20.5V8H8v12.5l8 8 8-8z'/%3E%3C/g%3E%3C/svg%3E")`
            }}
          >
            {/* Map placeholder with property pins */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Navigation className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Interactive Map View</h3>
                <p className="text-gray-600 text-sm">
                  {mapPins.length} properties plotted on map
                </p>
              </div>
            </div>

            {/* Property pins overlay */}
            {mapPins.map((pin, index) => (
              <div
                key={pin.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10"
                style={{
                  left: `${20 + (index % 5) * 15}%`,
                  top: `${20 + Math.floor(index / 5) * 15}%`
                }}
                onClick={() => handlePinClick(pin.property)}
              >
                <div className="relative">
                  <MapPin className="w-6 h-6 text-red-500 hover:text-red-700 transition-colors" />
                  <Badge 
                    variant="secondary" 
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap"
                  >
                    {formatPrice(pin.property.current_value)}
                  </Badge>
                </div>
              </div>
            ))}

            {/* Map controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button size="sm" variant="secondary">+</Button>
              <Button size="sm" variant="secondary">-</Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Property Details Panel */}
      <div className="lg:col-span-1">
        <Card className="h-96 lg:h-[600px] overflow-y-auto">
          <CardContent className="p-4">
            {selectedProperty ? (
              <div>
                <img
                  src={selectedProperty.property_photos?.[0]?.photo_url || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=200&fit=crop"}
                  alt={selectedProperty.address}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-lg mb-2">
                  {formatPrice(selectedProperty.current_value)}
                </h3>
                <p className="text-gray-600 text-sm mb-2 flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {selectedProperty.address}
                </p>
                <p className="text-gray-500 text-xs mb-4">
                  {selectedProperty.city}, {selectedProperty.state} {selectedProperty.zip_code}
                </p>
                
                <div className="grid grid-cols-3 gap-2 text-center mb-4">
                  {selectedProperty.bedrooms && (
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="font-semibold">{selectedProperty.bedrooms}</div>
                      <div className="text-xs text-gray-600">Beds</div>
                    </div>
                  )}
                  {selectedProperty.bathrooms && (
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="font-semibold">{selectedProperty.bathrooms}</div>
                      <div className="text-xs text-gray-600">Baths</div>
                    </div>
                  )}
                  {selectedProperty.square_feet && (
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="font-semibold">{selectedProperty.square_feet.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">Sq Ft</div>
                    </div>
                  )}
                </div>

                <Button 
                  className="w-full gradient-ai text-white"
                  onClick={() => window.location.href = `/property/${selectedProperty.id}`}
                >
                  View Details
                </Button>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center">
                <div>
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-medium text-gray-700 mb-2">Select a Property</h3>
                  <p className="text-gray-500 text-sm">
                    Click on a pin on the map to view property details
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
