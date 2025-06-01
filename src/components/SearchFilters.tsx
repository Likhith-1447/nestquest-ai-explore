
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, SlidersHorizontal } from 'lucide-react';

interface SearchFiltersProps {
  onFiltersChange: (filters: SearchFilters) => void;
  initialFilters?: SearchFilters;
}

export interface SearchFilters {
  city?: string;
  state?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string;
  hasPool?: boolean;
  hasGarage?: boolean;
  hasFireplace?: boolean;
  minSquareFeet?: number;
  maxSquareFeet?: number;
  minYearBuilt?: number;
  listingType?: string;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  onFiltersChange,
  initialFilters = {}
}) => {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [priceRange, setPriceRange] = useState([
    initialFilters.minPrice || 0,
    initialFilters.maxPrice || 2000000
  ]);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values);
    const updatedFilters = {
      ...filters,
      minPrice: values[0] === 0 ? undefined : values[0],
      maxPrice: values[1] === 2000000 ? undefined : values[1]
    };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {};
    setFilters(clearedFilters);
    setPriceRange([0, 2000000]);
    onFiltersChange(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => 
      value !== undefined && value !== null && value !== ''
    ).length;
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    }
    return `$${price}`;
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg">
            <SlidersHorizontal className="w-5 h-5 mr-2" />
            Filters
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </CardTitle>
          {getActiveFiltersCount() > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Location */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Location</h4>
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="City"
              value={filters.city || ''}
              onChange={(e) => handleFilterChange('city', e.target.value)}
            />
            <Input
              placeholder="State"
              value={filters.state || ''}
              onChange={(e) => handleFilterChange('state', e.target.value)}
            />
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Price Range</h4>
          <Slider
            value={priceRange}
            onValueChange={handlePriceRangeChange}
            max={2000000}
            min={0}
            step={50000}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>

        {/* Property Details */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Property Details</h4>
          <div className="grid grid-cols-2 gap-3">
            <Select value={filters.bedrooms?.toString() || ''} onValueChange={(value) => 
              handleFilterChange('bedrooms', value ? parseInt(value) : undefined)
            }>
              <SelectTrigger>
                <SelectValue placeholder="Bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1+ bed</SelectItem>
                <SelectItem value="2">2+ beds</SelectItem>
                <SelectItem value="3">3+ beds</SelectItem>
                <SelectItem value="4">4+ beds</SelectItem>
                <SelectItem value="5">5+ beds</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.bathrooms?.toString() || ''} onValueChange={(value) => 
              handleFilterChange('bathrooms', value ? parseInt(value) : undefined)
            }>
              <SelectTrigger>
                <SelectValue placeholder="Bathrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1+ bath</SelectItem>
                <SelectItem value="2">2+ baths</SelectItem>
                <SelectItem value="3">3+ baths</SelectItem>
                <SelectItem value="4">4+ baths</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Property Type */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Property Type</h4>
          <Select value={filters.propertyType || ''} onValueChange={(value) => 
            handleFilterChange('propertyType', value || undefined)
          }>
            <SelectTrigger>
              <SelectValue placeholder="All property types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single_family">Single Family</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
              <SelectItem value="multi_family">Multi Family</SelectItem>
              <SelectItem value="land">Land</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Listing Type */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Listing Type</h4>
          <Select value={filters.listingType || ''} onValueChange={(value) => 
            handleFilterChange('listingType', value || undefined)
          }>
            <SelectTrigger>
              <SelectValue placeholder="All listings" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sale">For Sale</SelectItem>
              <SelectItem value="rent">For Rent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Amenities */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Amenities</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="pool" 
                checked={filters.hasPool || false}
                onCheckedChange={(checked) => handleFilterChange('hasPool', checked)}
              />
              <label htmlFor="pool" className="text-sm">Pool</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="garage" 
                checked={filters.hasGarage || false}
                onCheckedChange={(checked) => handleFilterChange('hasGarage', checked)}
              />
              <label htmlFor="garage" className="text-sm">Garage</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="fireplace" 
                checked={filters.hasFireplace || false}
                onCheckedChange={(checked) => handleFilterChange('hasFireplace', checked)}
              />
              <label htmlFor="fireplace" className="text-sm">Fireplace</label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
