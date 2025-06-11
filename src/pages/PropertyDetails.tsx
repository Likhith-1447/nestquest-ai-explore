
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Star, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePropertyData, EnhancedProperty } from '@/hooks/usePropertyData';
import { PropertyImageGallery } from '@/components/property/PropertyImageGallery';
import { PropertyInfoCard } from '@/components/property/PropertyInfoCard';
import { PropertyAIInsights } from '@/components/property/PropertyAIInsights';
import { PropertyAmenities } from '@/components/property/PropertyAmenities';
import { PropertyHostInfo } from '@/components/property/PropertyHostInfo';
import { PropertyBookingSidebar } from '@/components/property/PropertyBookingSidebar';

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
    console.log('PropertyDetails: Current URL:', window.location.href);
    
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

  // Add additional logging for debugging
  useEffect(() => {
    console.log('PropertyDetails: State updated - loading:', loading, 'property:', property, 'error:', error);
  }, [loading, property, error]);

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

  const images = property.property_photos?.map(photo => photo.photo_url) || [
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop"
  ];

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <PropertyImageGallery images={images} address={property.address} />

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
              <PropertyInfoCard property={property} />

              {/* AI Insights */}
              <PropertyAIInsights property={property} />

              {/* Amenities */}
              <PropertyAmenities property={property} />

              {/* Host Info */}
              <PropertyHostInfo property={property} />
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <PropertyBookingSidebar property={property} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
