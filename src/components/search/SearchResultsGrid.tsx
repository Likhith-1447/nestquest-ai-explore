
import React from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/PropertyCard';
import { AIInsightsBanner } from '@/components/AIInsightsBanner';
import { EnhancedProperty } from '@/hooks/usePropertyData';

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
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  hasMoreProperties?: boolean;
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
  onClearFilters,
  onLoadMore,
  isLoadingMore = false,
  hasMoreProperties = false
}) => {
  return (
    <div className="flex-1">
      {/* AI Insights Banner */}
      <AIInsightsBanner
        insights={aiInsights}
        isLoading={aiLoading}
        error={aiError}
        onRefresh={onAIRefresh}
      />

      {/* Error State */}
      {error && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-red-700">Error loading properties: {error}</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={onRefresh}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="animate-pulse">
                <div className="bg-gray-200 h-48 w-full"></div>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
                    <div className="bg-gray-200 h-3 w-full rounded"></div>
                    <div className="bg-gray-200 h-3 w-1/2 rounded"></div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Properties Grid */}
      {!isLoading && properties.length > 0 && (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              showMarketData={true}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && properties.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters to find more properties.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={onClearFilters}>
                Clear Filters
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/search?q=luxury+homes'}>
                Search Luxury Homes
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/search?q=mountain+cabins'}>
                Search Mountain Cabins
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Load More */}
      {!isLoading && properties.length > 0 && onLoadMore && (
        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            size="lg"
            onClick={onLoadMore}
            disabled={isLoadingMore || !hasMoreProperties}
            className="min-w-[200px]"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading More...
              </>
            ) : hasMoreProperties ? (
              'Load More Properties'
            ) : (
              'No More Properties'
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
