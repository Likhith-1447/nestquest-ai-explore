
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Loader2, Navigation, ZoomIn, ZoomOut, RotateCcw, Layers } from 'lucide-react';
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
  x: number;
  y: number;
}

export const MapView: React.FC<MapViewProps> = ({
  properties,
  onPropertySelect,
  isLoading
}) => {
  const [selectedProperty, setSelectedProperty] = useState<EnhancedProperty | null>(null);
  const [mapPins, setMapPins] = useState<MapPin[]>([]);
  const [mapCenter, setMapCenter] = useState({ lat: 39.7392, lng: -104.9903 });
  const [zoomLevel, setZoomLevel] = useState(10);
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);

  useEffect(() => {
    // Generate map pins from properties with realistic positioning
    const pins: MapPin[] = properties
      .filter(property => property.latitude && property.longitude)
      .map((property, index) => {
        const lat = Number(property.latitude);
        const lng = Number(property.longitude);
        
        // Convert lat/lng to x/y coordinates for display (simplified projection)
        const x = ((lng - mapCenter.lng) * 100 * zoomLevel / 10) + 50;
        const y = ((mapCenter.lat - lat) * 100 * zoomLevel / 10) + 50;
        
        return {
          id: property.id,
          lat,
          lng,
          property,
          x: Math.max(5, Math.min(95, x)), // Keep within bounds
          y: Math.max(5, Math.min(95, y))  // Keep within bounds
        };
      });

    setMapPins(pins);

    // Center map on properties if available
    if (pins.length > 0) {
      const avgLat = pins.reduce((sum, pin) => sum + pin.lat, 0) / pins.length;
      const avgLng = pins.reduce((sum, pin) => sum + pin.lng, 0) / pins.length;
      setMapCenter({ lat: avgLat, lng: avgLng });
    }
  }, [properties, mapCenter.lat, mapCenter.lng, zoomLevel]);

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

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(20, prev + 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(5, prev - 2));
  };

  const handleReset = () => {
    setZoomLevel(10);
    setMapCenter({ lat: 39.7392, lng: -104.9903 });
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
      {/* Enhanced Map Container */}
      <div className="lg:col-span-2">
        <Card className="h-96 lg:h-[600px] relative overflow-hidden shadow-xl">
          <div 
            className="w-full h-full relative bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 transition-all duration-500"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.5) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(120, 200, 120, 0.2) 0%, transparent 50%),
                url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2394a3b8' fill-opacity='0.05'%3E%3Cpath d='M30 30c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
              `,
              transform: `scale(${zoomLevel / 10})`
            }}
          >
            {/* Map Grid Lines */}
            <div className="absolute inset-0 opacity-20">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={`h-${i}`} className="absolute w-full h-px bg-gray-300" style={{ top: `${i * 10}%` }} />
              ))}
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={`v-${i}`} className="absolute h-full w-px bg-gray-300" style={{ left: `${i * 10}%` }} />
              ))}
            </div>

            {/* Simulated Roads */}
            <div className="absolute inset-0">
              <div className="absolute h-1 bg-gray-400 opacity-30" style={{ top: '30%', left: '10%', right: '10%' }} />
              <div className="absolute h-1 bg-gray-400 opacity-30" style={{ top: '60%', left: '20%', right: '5%' }} />
              <div className="absolute w-1 bg-gray-400 opacity-30" style={{ left: '40%', top: '10%', bottom: '10%' }} />
              <div className="absolute w-1 bg-gray-400 opacity-30" style={{ left: '70%', top: '20%', bottom: '20%' }} />
            </div>

            {/* Property pins with animations */}
            {mapPins.map((pin, index) => (
              <div
                key={pin.id}
                className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-300 animate-fade-in hover:scale-125 ${
                  hoveredPin === pin.id ? 'z-30' : ''
                }`}
                style={{
                  left: `${pin.x}%`,
                  top: `${pin.y}%`,
                  animationDelay: `${index * 100}ms`
                }}
                onClick={() => handlePinClick(pin.property)}
                onMouseEnter={() => setHoveredPin(pin.id)}
                onMouseLeave={() => setHoveredPin(null)}
              >
                <div className="relative group">
                  {/* Pin shadow */}
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-black/20 rounded-full blur-sm" />
                  
                  {/* Main pin */}
                  <div className={`relative transition-all duration-200 ${
                    selectedProperty?.id === pin.id 
                      ? 'text-purple-600 scale-125' 
                      : hoveredPin === pin.id 
                        ? 'text-red-600 scale-110' 
                        : 'text-red-500'
                  }`}>
                    <MapPin className="w-8 h-8 drop-shadow-lg" />
                    <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full" />
                  </div>
                  
                  {/* Price badge */}
                  <Badge 
                    variant="secondary" 
                    className={`absolute -top-10 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap shadow-lg transition-all duration-200 ${
                      hoveredPin === pin.id ? 'scale-110 shadow-xl' : ''
                    }`}
                  >
                    {formatPrice(pin.property.current_value)}
                  </Badge>

                  {/* Hover tooltip */}
                  {hoveredPin === pin.id && (
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-2 text-xs min-w-32 animate-scale-in">
                      <div className="font-semibold text-gray-900">{pin.property.address}</div>
                      <div className="text-gray-600">{pin.property.bedrooms}br / {pin.property.bathrooms}ba</div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Map controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button 
                size="sm" 
                variant="secondary" 
                onClick={handleZoomIn}
                className="w-10 h-10 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button 
                size="sm" 
                variant="secondary" 
                onClick={handleZoomOut}
                className="w-10 h-10 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button 
                size="sm" 
                variant="secondary" 
                onClick={handleReset}
                className="w-10 h-10 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>

            {/* Map legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <div className="flex items-center space-x-2 text-sm">
                <Layers className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700">{mapPins.length} properties</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Zoom: {zoomLevel}x
              </div>
            </div>

            {/* Center indicator */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full shadow-lg animate-pulse" />
          </div>
        </Card>
      </div>

      {/* Enhanced Property Details Panel */}
      <div className="lg:col-span-1">
        <Card className="h-96 lg:h-[600px] overflow-y-auto shadow-xl">
          <CardContent className="p-4">
            {selectedProperty ? (
              <div className="animate-fade-in">
                <div className="relative mb-4">
                  <img
                    src={selectedProperty.property_photos?.[0]?.photo_url || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=200&fit=crop"}
                    alt={selectedProperty.address}
                    className="w-full h-40 object-cover rounded-lg shadow-md transition-transform duration-200 hover:scale-105"
                  />
                  <Badge className="absolute top-2 right-2 bg-white/90 text-gray-900">
                    {selectedProperty.property_type}
                  </Badge>
                </div>
                
                <h3 className="font-bold text-xl mb-2 text-gray-900">
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
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg hover:shadow-md transition-all duration-200">
                      <div className="font-bold text-blue-700">{selectedProperty.bedrooms}</div>
                      <div className="text-xs text-blue-600">Beds</div>
                    </div>
                  )}
                  {selectedProperty.bathrooms && (
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg hover:shadow-md transition-all duration-200">
                      <div className="font-bold text-green-700">{selectedProperty.bathrooms}</div>
                      <div className="text-xs text-green-600">Baths</div>
                    </div>
                  )}
                  {selectedProperty.square_feet && (
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-lg hover:shadow-md transition-all duration-200">
                      <div className="font-bold text-purple-700">{selectedProperty.square_feet.toLocaleString()}</div>
                      <div className="text-xs text-purple-600">Sq Ft</div>
                    </div>
                  )}
                </div>

                {selectedProperty.year_built && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">Built in {selectedProperty.year_built}</div>
                    {selectedProperty.school_district && (
                      <div className="text-xs text-gray-500 mt-1">{selectedProperty.school_district}</div>
                    )}
                  </div>
                )}

                <Button 
                  className="w-full gradient-ai text-white hover:shadow-lg transition-all duration-200 hover:scale-105"
                  onClick={() => window.location.href = `/property/${selectedProperty.id}`}
                >
                  View Full Details
                </Button>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center animate-fade-in">
                <div>
                  <Navigation className="w-16 h-16 text-gray-300 mx-auto mb-6 animate-pulse" />
                  <h3 className="font-medium text-gray-700 mb-2">Interactive Property Map</h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Click on any property pin to view details and explore the area
                  </p>
                  <div className="space-y-2 text-xs text-gray-400">
                    <div>🏠 {mapPins.length} properties displayed</div>
                    <div>🗺️ Zoom and explore the map</div>
                    <div>📍 Click pins for details</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
