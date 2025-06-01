
import React, { useState, useEffect } from 'react';
import { usePropertyAI } from '@/hooks/usePropertyAI';
import { usePropertyData } from '@/hooks/usePropertyData';
import { useSearchHistory } from '@/hooks/useSearchHistory';
import { SearchFilters as SearchFiltersType } from '@/components/SearchFilters';
import { SearchHeader } from '@/components/search/SearchHeader';
import { SearchControls } from '@/components/search/SearchControls';
import { SearchSidebar } from '@/components/search/SearchSidebar';
import { SearchResultsGrid } from '@/components/search/SearchResultsGrid';

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

  const handleHistoryItemClick = (query: string) => {
    setSearchQuery(query);
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
        />

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
          />
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
