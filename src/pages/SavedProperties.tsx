
import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useLikedProperties } from '@/hooks/useLikedProperties';
import { usePropertyData } from '@/hooks/usePropertyData';
import { PropertyCard } from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Heart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SavedProperties = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const { likedProperties, loading: likedLoading } = useLikedProperties();
  const { properties, loading: propertiesLoading, getPropertyById } = usePropertyData();
  const [savedProperties, setSavedProperties] = React.useState<any[]>([]);

  // Fetch property details for liked properties
  useEffect(() => {
    const fetchSavedProperties = async () => {
      if (likedProperties.length > 0) {
        const propertyPromises = likedProperties.map(id => getPropertyById(id));
        const results = await Promise.all(propertyPromises);
        setSavedProperties(results.filter(property => property !== null));
      } else {
        setSavedProperties([]);
      }
    };

    fetchSavedProperties();
  }, [likedProperties, getPropertyById]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Heart className="w-16 h-16 text-gray-400 mx-auto" />
          <h1 className="text-2xl font-bold text-gray-900">Sign in to view saved properties</h1>
          <p className="text-gray-600">You need to be signed in to access your saved properties.</p>
          <Button onClick={() => navigate('/auth')} className="gradient-ai text-white">
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  const isLoading = likedLoading || propertiesLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
              <Heart className="w-8 h-8 text-red-500 fill-red-500" />
              <span>Saved Properties</span>
            </h1>
            <p className="text-gray-600 mt-1">
              {savedProperties.length} saved {savedProperties.length === 1 ? 'property' : 'properties'}
            </p>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md h-96 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : savedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No saved properties yet</h2>
            <p className="text-gray-600 mb-6">
              Start exploring properties and save your favorites by clicking the heart icon.
            </p>
            <Button 
              onClick={() => navigate('/search')} 
              className="gradient-ai text-white"
            >
              Browse Properties
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedProperties;
