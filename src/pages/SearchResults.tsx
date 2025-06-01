
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Sparkles, SlidersHorizontal, Map, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePropertyAI } from '@/hooks/usePropertyAI';
import { usePropertyData } from '@/hooks/usePropertyData';
import { useSearchHistory } from '@/hooks/useSearchHistory';
import { AIInsightsBanner } from '@/components/AIInsightsBanner';
import { PropertyCard } from '@/components/PropertyCard';
import { SearchFilters, SearchFilters as SearchFiltersType } from '@/components/SearchFilters';

const SearchResults = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('Mountain cabins in Colorado');
  const [appliedFilters, setAppliedFilters] = useState<SearchFiltersType>({});
  
  const { 
    properties, 
    loading: propertiesLoading, 
    error: propertiesError,
    searchProperties,
    fetchProperties 
  } = usePropertyData();
  
  const { analyzeProperties, aiInsights, isLoading: aiLoading, error: aiError, clearInsights } = usePropertyAI();
  const { searchHistory, addSearchQuery } = useSearchHistory();

  // Trigger search when component mounts
  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      await searchProperties(searchQuery);
      await addSearchQuery(searchQuery);
      analyzeProperties(searchQuery, properties.slice(0, 10), 'sale');
    }
  };

  const handleFiltersChange = (filters: SearchFiltersType) => {
    setAppliedFilters(filters);
    fetchProperties(filters);
  };

  const handleAIRefresh = () => {
    analyzeProperties(searchQuery, properties.slice(0, 10), 'sale');
  };

  const handleNewSearch = () => {
    clearInsights();
    handleSearch();
  };

  const getAIRecommendationForProperty = (propertyId: string) => {
    return aiInsights?.recommendations?.find(rec => rec.property_id === propertyId);
  };

  const sortedProperties = [...properties].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return (a.current_value || 0) - (b.current_value || 0);
      case 'price-high':
        return (b.current_value || 0) - (a.current_value || 0);
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'ai-recommended':
        const aScore = getAIRecommendationForProperty(a.id)?.score || 0;
        const bScore = getAIRecommendationForProperty(b.id)?.score || 0;
        return bScore - aScore;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-ai rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                NestQuest AI
              </h1>
            </Link>
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by location, property type, or features..."
                  className="pl-10 pr-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleNewSearch();
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Map className="w-4 h-4 mr-2" />
                Map View
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Summary & Controls */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {propertiesLoading ? 'Searching...' : `${properties.length} properties found`}
            </h2>
            <p className="text-gray-600">{searchQuery}</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
              {Object.keys(appliedFilters).length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {Object.keys(appliedFilters).length}
                </Badge>
              )}
            </Button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border rounded-md bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="ai-recommended">AI Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <div className="sticky top-24 space-y-4">
                <SearchFilters
                  onFiltersChange={handleFiltersChange}
                  initialFilters={appliedFilters}
                />
                
                {/* Recent Searches */}
                {searchHistory.length > 0 && (
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium text-sm mb-3 flex items-center">
                        <History className="w-4 h-4 mr-2" />
                        Recent Searches
                      </h4>
                      <div className="space-y-2">
                        {searchHistory.slice(0, 5).map((search) => (
                          <button
                            key={search.id}
                            onClick={() => {
                              setSearchQuery(search.search_query);
                              handleNewSearch();
                            }}
                            className="text-left text-sm text-gray-600 hover:text-purple-600 block w-full truncate"
                          >
                            {search.search_query}
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}

          {/* Results Grid */}
          <div className="flex-1">
            {/* AI Insights Banner */}
            <AIInsightsBanner
              insights={aiInsights}
              isLoading={aiLoading}
              error={aiError}
              onRefresh={handleAIRefresh}
            />

            {/* Error State */}
            {propertiesError && (
              <Card className="mb-6 border-red-200 bg-red-50">
                <CardContent className="p-4">
                  <p className="text-red-700">Error loading properties: {propertiesError}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => fetchProperties()}
                  >
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Loading State */}
            {propertiesLoading && (
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
            {!propertiesLoading && sortedProperties.length > 0 && (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    showMarketData={true}
                  />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!propertiesLoading && !propertiesError && sortedProperties.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search criteria or filters to find more properties.
                  </p>
                  <Button onClick={() => setAppliedFilters({})}>
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Load More */}
            {!propertiesLoading && sortedProperties.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline" size="lg">
                  Load More Properties
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
