
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

// Persistent storage for the last search query
let lastPersistedQuery = '';

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const urlQuery = searchParams.get('q');
  
  // Use URL query if available, otherwise use the last persisted query, with fallback
  const initialQuery = urlQuery || lastPersistedQuery || 'Mountain cabins in Colorado';
  
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
    const currentUrlQuery = searchParams.get('q');
    
    // If there's a URL query, use it and persist it
    if (currentUrlQuery) {
      lastPersistedQuery = currentUrlQuery;
      setSearchQuery(currentUrlQuery);
      
      // Only search if this is a new query or initial load
      if (isInitialLoad.current || (currentUrlQuery !== lastSearchQuery.current)) {
        console.log('SearchResults: Performing search for URL query:', currentUrlQuery);
        performSearch(currentUrlQuery);
        isInitialLoad.current = false;
      }
    } else if (isInitialLoad.current && lastPersistedQuery) {
      // If no URL query but we have a persisted query, use it for initial load only
      console.log('SearchResults: Using persisted query for initial load:', lastPersistedQuery);
      setSearchQuery(lastPersistedQuery);
      performSearch(lastPersistedQuery);
      isInitialLoad.current = false;
    } else if (isInitialLoad.current) {
      // Only use fallback on very first visit with no history
      console.log('SearchResults: Using fallback query for first visit');
      performSearch(initialQuery);
      isInitialLoad.current = false;
    }
  }, [location.search]);

  const performSearch = async (query: string) => {
    if (!query.trim() || query === lastSearchQuery.current) {
      return;
    }

    console.log('SearchResults: Starting search for query:', query);
    lastSearchQuery.current = query;
    lastPersistedQuery = query; // Persist the query
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 animate-fade-in">
      <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <SearchHeader
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onSearch={handleNewSearch}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
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
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-4 hover-scale">
              <TabsTrigger value="results" className="transition-all duration-300 hover:scale-105">Property Results</TabsTrigger>
              <TabsTrigger value="ai-insights" className="transition-all duration-300 hover:scale-105">AI Insights</TabsTrigger>
              <TabsTrigger value="comparison" className="transition-all duration-300 hover:scale-105">AI Compare</TabsTrigger>
              <TabsTrigger value="map" className="transition-all duration-300 hover:scale-105">Map View</TabsTrigger>
            </TabsList>

            <TabsContent value="results" className="animate-scale-in">
              {showMap ? (
                <div className="animate-fade-in">
                  <MapView
                    properties={sortedProperties}
                    onPropertySelect={(property) => console.log('Selected property:', property)}
                    isLoading={propertiesLoading}
                  />
                </div>
              ) : (
                <div className="flex flex-col lg:flex-row gap-6">
                  {showFilters && (
                    <div className="w-full lg:w-80 flex-shrink-0 animate-slide-in-right">
                      <SearchSidebar
                        onFiltersChange={handleFiltersChange}
                        appliedFilters={appliedFilters}
                        searchHistory={searchHistory}
                        onHistoryItemClick={handleHistoryItemClick}
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
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

            <TabsContent value="ai-insights" className="animate-scale-in">
              <AIRecommendations searchQuery={searchQuery} />
            </TabsContent>

            <TabsContent value="comparison" className="animate-scale-in">
              <AIPropertyComparison 
                properties={sortedProperties}
                onSelectProperty={(property) => window.location.href = `/property/${property.id}`}
              />
            </TabsContent>

            <TabsContent value="map" className="animate-scale-in">
              <MapView
                properties={sortedProperties}
                onPropertySelect={(property) => console.log('Selected property:', property)}
                isLoading={propertiesLoading}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <AIAssistant />
    </div>
  );
};

export default SearchResults;
