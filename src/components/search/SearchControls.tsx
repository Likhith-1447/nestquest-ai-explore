
import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
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
}

export const SearchControls: React.FC<SearchControlsProps> = ({
  searchQuery,
  propertiesCount,
  isLoading,
  showFilters,
  onToggleFilters,
  appliedFilters,
  sortBy,
  onSortChange
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          {isLoading ? 'Searching...' : `${propertiesCount} properties found`}
        </h2>
        <p className="text-gray-600">{searchQuery}</p>
      </div>
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          onClick={onToggleFilters}
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
          onChange={(e) => onSortChange(e.target.value)}
          className="px-3 py-2 border rounded-md bg-white"
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
