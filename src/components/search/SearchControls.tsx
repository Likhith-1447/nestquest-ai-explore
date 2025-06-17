
import React from 'react';
import { SlidersHorizontal, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SearchFilters as SearchFiltersType } from '@/components/SearchFilters';

interface SearchControlsProps {
  searchQuery: string;
  propertiesCount: number;
  isLoading: boolean;
  showFilters: boolean;
  onToggleFilters: () => void;
  appliedFilters: SearchFiltersType;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
  showMap?: boolean;
  onToggleMap?: () => void;
}

export const SearchControls: React.FC<SearchControlsProps> = ({
  searchQuery,
  propertiesCount,
  isLoading,
  showFilters,
  onToggleFilters,
  appliedFilters,
  sortBy,
  onSortChange,
  showMap = false,
  onToggleMap
}) => {
  return (
    <div className="flex items-center justify-between mb-6 animate-fade-in">
      <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-2xl font-bold text-gray-900 transition-all duration-300">
          {isLoading ? (
            <span className="animate-pulse">Searching...</span>
          ) : (
            <span className="animate-fade-in">{propertiesCount} properties found</span>
          )}
        </h2>
        <p className="text-gray-600 animate-fade-in" style={{ animationDelay: '0.2s' }}>{searchQuery}</p>
      </div>
      <div className="flex items-center space-x-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <Button
          variant="outline"
          onClick={onToggleFilters}
          className="flex items-center space-x-2 hover:scale-105 transition-all duration-300 hover:shadow-md"
        >
          <SlidersHorizontal className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
          <span>Filters</span>
          {Object.keys(appliedFilters).length > 0 && (
            <Badge variant="secondary" className="ml-1 animate-bounce">
              {Object.keys(appliedFilters).length}
            </Badge>
          )}
        </Button>
        
        {onToggleMap && (
          <Button
            variant={showMap ? "default" : "outline"}
            onClick={onToggleMap}
            className="flex items-center space-x-2 hover:scale-105 transition-all duration-300 hover:shadow-md"
          >
            <Map className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
            <span>{showMap ? 'List View' : 'Map View'}</span>
          </Button>
        )}
        
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-3 py-2 border rounded-md bg-white hover:scale-105 transition-all duration-300 hover:shadow-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="newest">Newest First</option>
          <option value="ai-recommended">AI Recommended</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};
