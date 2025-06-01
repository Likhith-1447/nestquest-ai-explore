
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Star, MapPin, Wifi, Car, Coffee, Users, Calendar, Sparkles, Bot, MessageSquare, ChevronLeft, ChevronRight, Home, Bed, Bath, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { usePropertyData, EnhancedProperty } from '@/hooks/usePropertyData';

const PropertyDetails = () => {
  const { id } = useParams();
  const { getPropertyById } = usePropertyData();
  const [property, setProperty] = useState<EnhancedProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      if (id) {
        setLoading(true);
        const propertyData = await getPropertyById(id);
        setProperty(propertyData);
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id, getPropertyById]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto mb-4 animate-scale-in"></div>
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h1>
          <p className="text-gray-600 mb-4">The property you're looking for doesn't exist.</p>
          <Link to="/search">
            <Button className="gradient-ai text-white">Back to Search</Button>
          </Link>
        </div>
      </div>
    );
  }

  const images = property.property_photos?.map(photo => photo.photo_url) || [
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop"
  ];

  const formatPrice = (price: number | null) => {
    if (!price) return 'Price on request';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const aiInsights = [
    `Perfect ${property.property_type} with ${property.bedrooms} bedrooms in ${property.city}`,
    `Built in ${property.year_built}, this property offers modern living`,
    `Located in ${property.school_district || 'excellent school district'}`,
    `${property.square_feet?.toLocaleString()} sq ft of comfortable living space`
  ];

  const amenities = [
    ...(property.air_conditioning ? ['Air Conditioning'] : []),
    ...(property.fireplace ? ['Fireplace'] : []),
    ...(property.pool ? ['Pool'] : []),
    ...(property.garage_spaces ? [`${property.garage_spaces} Car Garage`] : []),
    ...(property.parking_spaces ? [`${property.parking_spaces} Parking Spaces`] : []),
    ...(property.basement ? ['Basement'] : [])
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/search" className="flex items-center space-x-2 hover:opacity-80 transition-all duration-200 hover:scale-105">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to search</span>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 gradient-ai rounded-lg flex items-center justify-center animate-scale-in">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  NestQuest AI
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="hover-scale">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsLiked(!isLiked)}
                className={`hover-scale transition-colors duration-200 ${isLiked ? 'text-red-500' : ''}`}
              >
                <Heart className={`w-4 h-4 mr-2 transition-all duration-200 ${isLiked ? 'fill-red-500' : ''}`} />
                {isLiked ? 'Saved' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="relative animate-fade-in">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={images[currentImageIndex]} 
                  alt={property.address}
                  className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                />
                {images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 hover:scale-110"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 hover:scale-110"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-200 ${
                            index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Property Info */}
            <div className="animate-fade-in">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.address}</h1>
                  <p className="text-gray-600 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.city}, {property.state} {property.zip_code}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.9</span>
                  <span className="text-gray-600">(127 reviews)</span>
                </div>
              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {property.bedrooms && (
                  <div className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 hover:scale-105">
                    <div className="flex items-center space-x-2">
                      <Bed className="w-5 h-5 text-purple-600" />
                      <div>
                        <div className="font-semibold">{property.bedrooms}</div>
                        <div className="text-sm text-gray-600">Bedrooms</div>
                      </div>
                    </div>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 hover:scale-105">
                    <div className="flex items-center space-x-2">
                      <Bath className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-semibold">{property.bathrooms}</div>
                        <div className="text-sm text-gray-600">Bathrooms</div>
                      </div>
                    </div>
                  </div>
                )}
                {property.square_feet && (
                  <div className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 hover:scale-105">
                    <div className="flex items-center space-x-2">
                      <Square className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-semibold">{property.square_feet.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Sq Ft</div>
                      </div>
                    </div>
                  </div>
                )}
                {property.year_built && (
                  <div className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 hover:scale-105">
                    <div className="flex items-center space-x-2">
                      <Home className="w-5 h-5 text-orange-600" />
                      <div>
                        <div className="font-semibold">{property.year_built}</div>
                        <div className="text-sm text-gray-600">Built</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* AI Insights */}
              <Card className="mb-6 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 animate-scale-in">
                <CardContent className="p-4">
                  <div className="flex items-center mb-3">
                    <Bot className="w-5 h-5 text-purple-600 mr-2" />
                    <h3 className="font-semibold text-purple-800">AI Insights</h3>
                  </div>
                  <ul className="space-y-2">
                    {aiInsights.map((insight, index) => (
                      <li key={index} className="flex items-start animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                        <Sparkles className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-purple-700">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Amenities */}
              {amenities.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {amenities.map((amenity, index) => (
                      <div 
                        key={amenity} 
                        className="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 hover:scale-105 animate-fade-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <Wifi className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Host Info */}
              <Card className="animate-scale-in">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {property.owner_name?.charAt(0) || 'O'}
                    </div>
                    <div>
                      <h4 className="font-semibold">Listed by {property.owner_name || 'Property Owner'}</h4>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>4.95 (89 reviews)</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto hover-scale">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 animate-slide-in-right">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold">{formatPrice(property.current_value)}</span>
                    {property.listing_type === 'rent' && <span className="text-gray-600"> / month</span>}
                  </div>
                  <Badge className="gradient-ai text-white">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI Recommended
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                      <Input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full transition-all duration-200 focus:scale-105"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                      <Input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full transition-all duration-200 focus:scale-105"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                    <Input
                      type="number"
                      min="1"
                      max="10"
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full transition-all duration-200 focus:scale-105"
                    />
                  </div>

                  <Button className="w-full gradient-ai text-white font-semibold py-3 hover-scale transition-all duration-200">
                    {property.listing_type === 'rent' ? 'Contact for Viewing' : 'Request Info'}
                  </Button>

                  <div className="text-center text-sm text-gray-600">
                    No commitment required
                  </div>

                  {property.current_value && (
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Property Value</span>
                        <span>{formatPrice(property.current_value)}</span>
                      </div>
                      {property.hoa_fee && (
                        <div className="flex justify-between">
                          <span>HOA Fee</span>
                          <span>${property.hoa_fee}/month</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Price per sq ft</span>
                        <span>${Math.round((property.current_value / (property.square_feet || 1)))}</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
