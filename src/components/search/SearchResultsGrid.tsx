
import React from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/PropertyCard';
import { AIInsightsBanner } from '@/components/AIInsightsBanner';
import { EnhancedProperty } from '@/hooks/usePropertyData';
import { useNavigate } from 'react-router-dom';

interface SearchResultsGridProps {
  properties: EnhancedProperty[];
  isLoading: boolean;
  error: string | null;
  aiInsights: any;
  aiLoading: boolean;
  aiError: any;
  onRefresh: () => void;
  onAIRefresh: () => void;
  onClearFilters: () => void;
}

export const SearchResultsGrid: React.FC<SearchResultsGridProps> = ({
  properties,
  isLoading,
  error,
  aiInsights,
  aiLoading,
  aiError,
  onRefresh,
  onAIRefresh,
  onClearFilters
}) => {
  const navigate = useNavigate();

  const handleQuickSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="w-full">
      {/* AI Insights Banner */}
      <div className="mb-6 animate-fade-in">
        <AIInsightsBanner
          insights={aiInsights}
          isLoading={aiLoading}
          error={aiError}
          onRefresh={onAIRefresh}
        />
      </div>

      {/* Error State */}
      {error && (
        <Card className="mb-6 border-red-200 bg-red-50 animate-scale-in">
          <CardContent className="p-4">
            <p className="text-red-700 text-sm sm:text-base">Error loading properties: {error}</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2 hover:scale-105 transition-transform duration-200"
              onClick={onRefresh}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="overflow-hidden animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
              <div>
                <div className="bg-gray-200 h-48 sm:h-52 lg:h-56 w-full animate-pulse-slow"></div>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="bg-gray-200 h-4 w-3/4 rounded animate-pulse-slow" style={{ animationDelay: `${i * 0.05}s` }}></div>
                    <div className="bg-gray-200 h-3 w-full rounded animate-pulse-slow" style={{ animationDelay: `${i * 0.1}s` }}></div>
                    <div className="bg-gray-200 h-3 w-1/2 rounded animate-pulse-slow" style={{ animationDelay: `${i * 0.15}s` }}></div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Properties Grid */}
      {!isLoading && properties.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6">
          {properties.map((property, index) => (
            <div 
              key={property.id} 
              className="w-full animate-fade-in" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PropertyCard
                property={property}
                showMarketData={true}
              />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && properties.length === 0 && (
        <Card className="text-center py-12 mx-4 sm:mx-0 animate-scale-in">
          <CardContent className="px-6">
            <div className="animate-bounce">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>No properties found</h3>
            <p className="text-gray-600 mb-6 text-base animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Try adjusting your search criteria or explore these popular searches.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-2xl mx-auto">
              <Button 
                onClick={onClearFilters} 
                className="w-full sm:w-auto animate-fade-in hover:scale-105 transition-transform duration-200" 
                style={{ animationDelay: '0.4s' }}
              >
                Clear Filters
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleQuickSearch('luxury homes beverly hills')} 
                className="w-full sm:w-auto animate-fade-in hover:scale-105 transition-transform duration-200" 
                style={{ animationDelay: '0.5s' }}
              >
                Beverly Hills Luxury
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleQuickSearch('mountain cabins colorado')} 
                className="w-full sm:w-auto animate-fade-in hover:scale-105 transition-transform duration-200" 
                style={{ animationDelay: '0.6s' }}
              >
                Mountain Cabins
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleQuickSearch('miami waterfront condos')} 
                className="w-full sm:w-auto animate-fade-in hover:scale-105 transition-transform duration-200" 
                style={{ animationDelay: '0.7s' }}
              >
                Miami Waterfront
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Summary */}
      {!isLoading && properties.length > 0 && (
        <div className="mt-8 text-center text-gray-600 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <p className="text-sm">
            Showing {properties.length} properties for your search
          </p>
        </div>
      )}
    </div>
  );
};
