
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
  const [activeTab, setActiveTab] = useState('results');
  const [hasSearched, setHasSearched] = useState(false);
  
  // Track the last search to prevent unnecessary re-searches
  const lastSearchQuery = useRef<string>('');
  const isInitialLoad = useRef(true);
  
  const { 
    properties, 
    loading: propertiesLoading, 
    error: propertiesError,
    searchProperties,
    fetchProperties 
  } = usePropertyData();
  
  const { analyzeProperties, aiInsights, isLoading: aiLoading, error: aiError, clearInsights } = usePropertyAI();
  const { searchHistory, addSearchQuery } = useSearchHistory();

  // Handle search on mount and when query changes in URL
  useEffect(() => {
    const urlQuery = searchParams.get('q') || 'Mountain cabins in Colorado';
    
    // Only search if this is a new query or initial load
    if (isInitialLoad.current || (urlQuery !== lastSearchQuery.current && urlQuery.trim())) {
      console.log('SearchResults: Performing search for query:', urlQuery);
      setSearchQuery(urlQuery);
      performSearch(urlQuery);
      isInitialLoad.current = false;
    }
  }, [location.search]);

  const performSearch = async (query: string) => {
    if (!query.trim() || query === lastSearchQuery.current) {
      return;
    }

    console.log('SearchResults: Starting search for query:', query);
    lastSearchQuery.current = query;
    setHasSearched(true);
    
    try {
      await searchProperties(query);
      await addSearchQuery(query);
    } catch (error) {
      console.error('SearchResults: Search failed:', error);
    }
  };

  // Analyze properties when they change
  useEffect(() => {
    if (properties.length > 0 && hasSearched) {
      analyzeProperties(searchQuery, properties, 'sale');
    }
  }, [properties, hasSearched]);

  const handleNewSearch = () => {
    console.log('SearchResults: Handling new search for:', searchQuery);
    clearInsights();
    lastSearchQuery.current = ''; // Reset to allow new search
    performSearch(searchQuery);
  };

  const handleHistoryItemClick = (query: string) => {
    console.log('SearchResults: History item clicked:', query);
    setSearchQuery(query);
    window.history.pushState(null, '', `/search?q=${encodeURIComponent(query)}`);
    clearInsights();
    lastSearchQuery.current = ''; // Reset to allow new search
    performSearch(query);
  };

  const handleFiltersChange = (filters: SearchFiltersType) => {
    setAppliedFilters(filters);
    fetchProperties(filters);
  };

  const handleAIRefresh = () => {
    if (properties.length > 0) {
      analyzeProperties(searchQuery, properties, 'sale');
    }
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
              <div className="flex flex-col lg:flex-row gap-6">
                {showFilters && (
                  <div className="w-full lg:w-80 flex-shrink-0">
                    <SearchSidebar
                      onFiltersChange={handleFiltersChange}
                      appliedFilters={appliedFilters}
                      searchHistory={searchHistory}
                      onHistoryItemClick={handleHistoryItemClick}
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0">
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
                  />
                </div>
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

      <AIAssistant />
    </div>
  );
};

export default SearchResults;
