
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { usePropertyAI } from '@/hooks/usePropertyAI';
import { usePropertyData } from '@/hooks/usePropertyData';
import { useSearchHistory } from '@/hooks/useSearchHistory';
import { SearchFilters as SearchFiltersType } from '@/components/SearchFilters';
import { SearchHeader } from '@/components/search/SearchHeader';
import { SearchControls } from '@/components/search/SearchControls';
import { SearchSidebar } from '@/components/search/SearchSidebar';
import { SearchResultsGrid } from '@/components/search/SearchResultsGrid';
import { MapView } from '@/components/search/MapView';
import { AIAssistant } from '@/components/AIAssistant';
import { AIRecommendations } from '@/components/AIRecommendations';
import { AIPropertyComparison } from '@/components/AIPropertyComparison';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || 'Mountain cabins in Colorado';
  
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [appliedFilters, setAppliedFilters] = useState<SearchFiltersType>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [activeTab, setActiveTab] = useState('results');
  const [hasInitialized, setHasInitialized] = useState(false);
  
  // Use ref to track if we've already searched for the current query
  const lastSearchQuery = useRef<string>('');
  
  const { 
    properties, 
    loading: propertiesLoading, 
    error: propertiesError,
    searchProperties,
    fetchProperties 
  } = usePropertyData();
  
  const { analyzeProperties, aiInsights, isLoading: aiLoading, error: aiError, clearInsights } = usePropertyAI();
  const { searchHistory, addSearchQuery } = useSearchHistory();

  // Only trigger search when component mounts or when search query actually changes
  useEffect(() => {
    console.log('SearchResults: useEffect triggered', { searchQuery, lastSearchQuery: lastSearchQuery.current, hasInitialized });
    
    // Only search if the query has actually changed or this is the first load
    if (!hasInitialized || (searchQuery !== lastSearchQuery.current && searchQuery.trim())) {
      console.log('SearchResults: Performing search for:', searchQuery);
      handleSearch();
      setHasInitialized(true);
    }
  }, [searchQuery, hasInitialized]);

  const handleSearch = async () => {
    if (searchQuery.trim() && searchQuery !== lastSearchQuery.current) {
      console.log('SearchResults: Starting search for query:', searchQuery);
      lastSearchQuery.current = searchQuery;
      setCurrentPage(1);
      
      await searchProperties(searchQuery);
      await addSearchQuery(searchQuery);
      
      // Only analyze properties if we have results
      if (properties.length > 0) {
        analyzeProperties(searchQuery, properties.slice(0, 10), 'sale');
      }
    }
  };

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use consistent additional search terms instead of random ones
      const additionalTerms = [
        'luxury homes', 'family homes', 'waterfront properties'
      ];
      
      const pageIndex = (currentPage - 1) % additionalTerms.length;
      const additionalTerm = additionalTerms[pageIndex];
      
      await searchProperties(`${searchQuery} ${additionalTerm}`);
      setCurrentPage(prev => prev + 1);
    } catch (error) {
      console.error('Error loading more properties:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleFiltersChange = (filters: SearchFiltersType) => {
    setAppliedFilters(filters);
    fetchProperties(filters);
  };

  const handleAIRefresh = () => {
    if (properties.length > 0) {
      analyzeProperties(searchQuery, properties.slice(0, 10), 'sale');
    }
  };

  const handleNewSearch = () => {
    console.log('SearchResults: Handling new search');
    clearInsights();
    setCurrentPage(1);
    lastSearchQuery.current = ''; // Reset to force new search
    handleSearch();
  };

  const handleHistoryItemClick = (query: string) => {
    console.log('SearchResults: History item clicked:', query);
    setSearchQuery(query);
    lastSearchQuery.current = ''; // Reset to force new search
    handleNewSearch();
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
      <SearchHeader
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearch={handleNewSearch}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <SearchControls
          searchQuery={searchQuery}
          propertiesCount={properties.length}
          isLoading={propertiesLoading}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          appliedFilters={appliedFilters}
          sortBy={sortBy}
          onSortChange={setSortBy}
          showMap={showMap}
          onToggleMap={() => setShowMap(!showMap)}
        />

        {/* Enhanced AI-powered tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="results">Property Results</TabsTrigger>
            <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
            <TabsTrigger value="comparison">AI Compare</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>

          <TabsContent value="results">
            {showMap ? (
              <MapView
                properties={sortedProperties}
                onPropertySelect={(property) => console.log('Selected property:', property)}
                isLoading={propertiesLoading}
              />
            ) : (
              <div className="flex gap-8">
                {showFilters && (
                  <SearchSidebar
                    onFiltersChange={handleFiltersChange}
                    appliedFilters={appliedFilters}
                    searchHistory={searchHistory}
                    onHistoryItemClick={handleHistoryItemClick}
                  />
                )}

                <SearchResultsGrid
                  properties={sortedProperties}
                  isLoading={propertiesLoading}
                  error={propertiesError}
                  aiInsights={aiInsights}
                  aiLoading={aiLoading}
                  aiError={aiError}
                  onRefresh={() => fetchProperties()}
                  onAIRefresh={handleAIRefresh}
                  onClearFilters={() => setAppliedFilters({})}
                  onLoadMore={handleLoadMore}
                  isLoadingMore={isLoadingMore}
                  hasMoreProperties={currentPage < 5}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="ai-insights">
            <AIRecommendations searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="comparison">
            <AIPropertyComparison 
              properties={sortedProperties}
              onSelectProperty={(property) => window.location.href = `/property/${property.id}`}
            />
          </TabsContent>

          <TabsContent value="map">
            <MapView
              properties={sortedProperties}
              onPropertySelect={(property) => console.log('Selected property:', property)}
              isLoading={propertiesLoading}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* AI Assistant - available on all pages */}
      <AIAssistant />
    </div>
  );
};

export default SearchResults;
