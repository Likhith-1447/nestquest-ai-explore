
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePropertyData, EnhancedProperty } from '@/hooks/usePropertyData';
import { PropertyImageGallery } from '@/components/property/PropertyImageGallery';
import { PropertyInfoCard } from '@/components/property/PropertyInfoCard';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPropertyById } = usePropertyData();
  const [property, setProperty] = useState<EnhancedProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    console.log('PropertyDetails: Component mounted with ID:', id);
    
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
  }, [id]); // Removed getPropertyById from dependency array to prevent infinite re-renders

  if (loading) {
    console.log('PropertyDetails: Rendering loading state');
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto mb-4 animate-pulse"></div>
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
        <div className="text-center max-w-md">
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

  console.log('PropertyDetails: Successfully rendering property details for:', property.id);

  const formatPrice = (price: number | null) => {
    if (!price) return 'Price on request';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const propertyImages = property.property_photos?.map(photo => photo.photo_url) || [
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/search')} 
                className="flex items-center space-x-2 hover:bg-gray-100 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to search</span>
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 gradient-ai rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  NestQuest AI
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="hover:bg-gray-100 transition-colors duration-200">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsLiked(!isLiked)}
                className={`transition-all duration-200 hover:bg-gray-100 ${isLiked ? 'text-red-500' : ''}`}
              >
                <Heart className={`w-4 h-4 mr-2 transition-all duration-200 ${isLiked ? 'fill-red-500' : ''}`} />
                {isLiked ? 'Saved' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in">
          {/* Property Image Gallery */}
          <div className="mb-8">
            <PropertyImageGallery 
              images={propertyImages}
              address={property.address || 'Property'}
            />
          </div>

          {/* Property Content */}
          <div className="p-6 lg:p-8">
            {/* Property Header */}
            <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">{property.address}</h1>
              <p className="text-gray-600 flex items-center text-lg mb-4">
                <MapPin className="w-5 h-5 mr-2 text-purple-600" />
                {property.city}, {property.state} {property.zip_code}
              </p>
              
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                  <span className="text-4xl lg:text-5xl font-bold text-purple-600">
                    {formatPrice(property.current_value)}
                  </span>
                  {property.listing_type && (
                    <span className="text-gray-600 ml-3 text-lg">
                      for {property.listing_type}
                    </span>
                  )}
                </div>
                
                {property.property_type && (
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-800 capitalize">
                    {property.property_type}
                  </span>
                )}
              </div>
            </div>

            {/* Property Info Cards */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <PropertyInfoCard property={property} />
            </div>

            {/* Property Features */}
            {property.property_features && property.property_features.length > 0 && (
              <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <h3 className="text-xl font-semibold mb-4">Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {property.property_features.map((feature) => (
                    <div key={feature.id} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <h4 className="font-medium text-gray-900">{feature.feature_name}</h4>
                      {feature.feature_value && (
                        <p className="text-sm text-gray-600 mt-1">{feature.feature_value}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact CTA */}
            <div className="text-center bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Interested in this property?</h3>
              <p className="text-gray-600 mb-6">Get in touch with our expert agents for more details and scheduling a viewing.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="gradient-ai text-white hover:scale-105 transition-transform duration-200">
                  Schedule Viewing
                </Button>
                <Button variant="outline" className="hover:bg-gray-50 transition-colors duration-200">
                  Contact Agent
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
