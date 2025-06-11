
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePropertyData, EnhancedProperty } from '@/hooks/usePropertyData';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPropertyById } = usePropertyData();
  const [property, setProperty] = useState<EnhancedProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    console.log('PropertyDetails: Component mounted');
    console.log('PropertyDetails: URL params ID:', id);
    
    const fetchProperty = async () => {
      if (!id) {
        console.log('PropertyDetails: No ID provided in URL params');
        setError('No property ID provided');
        setLoading(false);
        return;
      }

      console.log('PropertyDetails: Starting to fetch property with ID:', id);
      setLoading(true);
      setError(null);
      
      try {
        const propertyData = await getPropertyById(id);
        console.log('PropertyDetails: Property data received:', propertyData);
        
        if (propertyData) {
          setProperty(propertyData);
          console.log('PropertyDetails: Property set successfully');
        } else {
          console.log('PropertyDetails: No property data returned');
          setError('Property not found');
        }
      } catch (error) {
        console.error('PropertyDetails: Error fetching property:', error);
        setError(error instanceof Error ? error.message : 'Failed to load property');
      } finally {
        setLoading(false);
        console.log('PropertyDetails: Fetch complete');
      }
    };
    
    fetchProperty();
  }, [id, getPropertyById]);

  if (loading) {
    console.log('PropertyDetails: Rendering loading state');
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto mb-4 animate-scale-in"></div>
          <p className="text-gray-600">Loading property details...</p>
          <p className="text-sm text-gray-500 mt-2">Property ID: {id}</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    console.log('PropertyDetails: Rendering error state - error:', error, 'property:', property);
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center animate-fade-in max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h1>
          <p className="text-gray-600 mb-2">
            {error || "The property you're looking for doesn't exist."}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Attempted to load property with ID: <code className="bg-gray-100 px-2 py-1 rounded">{id}</code>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => navigate('/search')} className="gradient-ai text-white">
              Back to Search
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  console.log('PropertyDetails: Rendering property details for:', property.id);

  const formatPrice = (price: number | null) => {
    if (!price) return 'Price on request';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/search')} 
                className="flex items-center space-x-2 hover:opacity-80 transition-all duration-200 hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to search</span>
              </Button>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Simplified Property Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Basic Property Image */}
          <div className="relative h-96">
            <img 
              src={property.property_photos?.[0]?.photo_url || "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop"}
              alt={property.address}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Basic Property Info */}
          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.address}</h1>
              <p className="text-gray-600 flex items-center text-lg">
                <MapPin className="w-5 h-5 mr-2" />
                {property.city}, {property.state} {property.zip_code}
              </p>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-bold text-purple-600">
                {formatPrice(property.current_value)}
              </span>
              {property.listing_type && (
                <span className="text-gray-600 ml-2">
                  for {property.listing_type}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-6 text-gray-600">
              {property.bedrooms && (
                <span>{property.bedrooms} bedrooms</span>
              )}
              {property.bathrooms && (
                <span>{property.bathrooms} bathrooms</span>
              )}
              {property.square_feet && (
                <span>{property.square_feet.toLocaleString()} sq ft</span>
              )}
              {property.year_built && (
                <span>Built in {property.year_built}</span>
              )}
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-500">More details coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
