
import React from 'react';
import { History } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { SearchFilters, SearchFilters as SearchFiltersType } from '@/components/SearchFilters';
import { Tables } from '@/integrations/supabase/types';

type SearchHistory = Tables<'search_history'>;

interface SearchSidebarProps {
  onFiltersChange: (filters: SearchFiltersType) => void;
  appliedFilters: SearchFiltersType;
  searchHistory: SearchHistory[];
  onHistoryItemClick: (query: string) => void;
}

export const SearchSidebar: React.FC<SearchSidebarProps> = ({
  onFiltersChange,
  appliedFilters,
  searchHistory,
  onHistoryItemClick
}) => {
  return (
    <div className="w-80 flex-shrink-0">
      <div className="sticky top-24 space-y-4">
        <SearchFilters
          onFiltersChange={onFiltersChange}
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
                    onClick={() => onHistoryItemClick(search.search_query)}
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
  );
};
