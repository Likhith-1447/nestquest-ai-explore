
import React from 'react';
import { Heart, Share2, Eye, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useLikedProperties } from '@/hooks/useLikedProperties';

interface PropertyCardActionsProps {
  propertyId: string;
  propertyAddress: string;
  onViewDetails: () => void;
  className?: string;
}

export const PropertyCardActions: React.FC<PropertyCardActionsProps> = ({
  propertyId,
  propertyAddress,
  onViewDetails,
  className = ''
}) => {
  const { toast } = useToast();
  const { isPropertyLiked, toggleLikedProperty } = useLikedProperties();
  
  const isSaved = isPropertyLiked(propertyId);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLikedProperty(propertyId);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/property/${propertyId}`;
    
    if (navigator.share) {
      navigator.share({
        title: `Property at ${propertyAddress}`,
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url);
      toast({
        title: "Link copied",
        description: "Property link copied to clipboard",
      });
    }
  };

  const handleContact = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Contact information",
      description: "Contact feature will be available soon",
    });
  };

  const handleViewLocation = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Map view",
      description: "Opening map view for this property",
    });
  };

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSave}
          className={`hover-scale transition-colors duration-200 ${
            isSaved ? 'text-red-500' : 'text-gray-600'
          }`}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500' : ''}`} />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleShare}
          className="text-gray-600 hover-scale"
        >
          <Share2 className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleViewLocation}
          className="text-gray-600 hover-scale"
        >
          <MapPin className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleContact}
          className="text-gray-600 hover-scale"
        >
          <Phone className="w-4 h-4" />
        </Button>
      </div>
      
      <Button
        onClick={(e) => {
          e.stopPropagation();
          onViewDetails();
        }}
        className="gradient-ai text-white hover-scale"
        size="sm"
      >
        <Eye className="w-4 h-4 mr-2" />
        View Details
      </Button>
    </div>
  );
};
