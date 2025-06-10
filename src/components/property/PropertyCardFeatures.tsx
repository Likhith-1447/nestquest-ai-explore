
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Wifi, Car, Waves } from 'lucide-react';
import { EnhancedProperty } from '@/hooks/usePropertyData';

interface PropertyCardFeaturesProps {
  property: EnhancedProperty;
}

export const PropertyCardFeatures: React.FC<PropertyCardFeaturesProps> = ({ property }) => {
  const getPropertyFeatures = () => {
    const features = [];
    if (property.pool) features.push({ icon: Waves, label: 'Pool' });
    if (property.garage_spaces && property.garage_spaces > 0) {
      features.push({ icon: Car, label: `${property.garage_spaces} Car Garage` });
    }
    
    // Add features from property_features table
    const wifiFeature = property.property_features?.find(f => 
      f.feature_name.toLowerCase().includes('wifi') || 
      f.feature_name.toLowerCase().includes('internet')
    );
    if (wifiFeature) features.push({ icon: Wifi, label: 'High-Speed Internet' });
    
    return features.slice(0, 3); // Show max 3 features
  };

  const features = getPropertyFeatures();

  if (features.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1 mb-3">
      {features.map((feature, index) => (
        <Badge key={index} variant="outline" className="text-xs">
          <feature.icon className="w-3 h-3 mr-1" />
          {feature.label}
        </Badge>
      ))}
    </div>
  );
};
