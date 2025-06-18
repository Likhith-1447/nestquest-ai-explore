
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useLikedProperties = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const [likedProperties, setLikedProperties] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch user's liked properties on mount
  useEffect(() => {
    if (user?.id) {
      fetchLikedProperties();
    }
  }, [user?.id]);

  const fetchLikedProperties = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_liked_properties')
        .select('property_id')
        .eq('user_id', user.id);

      if (error) throw error;

      setLikedProperties(data?.map(item => item.property_id) || []);
    } catch (error) {
      console.error('Error fetching liked properties:', error);
      toast({
        title: "Error",
        description: "Failed to load your saved properties",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleLikedProperty = async (propertyId: string) => {
    if (!user?.id) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save properties",
        variant: "destructive"
      });
      return;
    }

    const isLiked = likedProperties.includes(propertyId);

    try {
      if (isLiked) {
        // Remove from liked properties
        const { error } = await supabase
          .from('user_liked_properties')
          .delete()
          .eq('user_id', user.id)
          .eq('property_id', propertyId);

        if (error) throw error;

        setLikedProperties(prev => prev.filter(id => id !== propertyId));
        toast({
          title: "Property removed",
          description: "Property removed from your saved list"
        });
      } else {
        // Add to liked properties
        const { error } = await supabase
          .from('user_liked_properties')
          .insert({
            user_id: user.id,
            property_id: propertyId
          });

        if (error) throw error;

        setLikedProperties(prev => [...prev, propertyId]);
        toast({
          title: "Property saved",
          description: "Property added to your saved list"
        });
      }
    } catch (error) {
      console.error('Error toggling liked property:', error);
      toast({
        title: "Error",
        description: "Failed to update property. Please try again.",
        variant: "destructive"
      });
    }
  };

  const isPropertyLiked = (propertyId: string) => {
    return likedProperties.includes(propertyId);
  };

  return {
    likedProperties,
    loading,
    toggleLikedProperty,
    isPropertyLiked,
    refetch: fetchLikedProperties
  };
};
