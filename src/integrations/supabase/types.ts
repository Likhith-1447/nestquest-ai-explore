export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      api_sync_logs: {
        Row: {
          api_name: string
          completed_at: string | null
          error_details: Json | null
          errors_count: number | null
          id: string
          records_processed: number | null
          started_at: string | null
          status: string
          sync_type: string
        }
        Insert: {
          api_name: string
          completed_at?: string | null
          error_details?: Json | null
          errors_count?: number | null
          id?: string
          records_processed?: number | null
          started_at?: string | null
          status: string
          sync_type: string
        }
        Update: {
          api_name?: string
          completed_at?: string | null
          error_details?: Json | null
          errors_count?: number | null
          id?: string
          records_processed?: number | null
          started_at?: string | null
          status?: string
          sync_type?: string
        }
        Relationships: []
      }
      neighborhoods: {
        Row: {
          amenities: Json | null
          bike_score: number | null
          boundary_coordinates: Json | null
          center_latitude: number | null
          center_longitude: number | null
          city: string
          created_at: string | null
          crime_rate: number | null
          demographics: Json | null
          id: string
          median_income: number | null
          name: string
          population: number | null
          school_rating: number | null
          state: string
          transit_score: number | null
          updated_at: string | null
          walkability_score: number | null
          zip_codes: string[] | null
        }
        Insert: {
          amenities?: Json | null
          bike_score?: number | null
          boundary_coordinates?: Json | null
          center_latitude?: number | null
          center_longitude?: number | null
          city: string
          created_at?: string | null
          crime_rate?: number | null
          demographics?: Json | null
          id?: string
          median_income?: number | null
          name: string
          population?: number | null
          school_rating?: number | null
          state: string
          transit_score?: number | null
          updated_at?: string | null
          walkability_score?: number | null
          zip_codes?: string[] | null
        }
        Update: {
          amenities?: Json | null
          bike_score?: number | null
          boundary_coordinates?: Json | null
          center_latitude?: number | null
          center_longitude?: number | null
          city?: string
          created_at?: string | null
          crime_rate?: number | null
          demographics?: Json | null
          id?: string
          median_income?: number | null
          name?: string
          population?: number | null
          school_rating?: number | null
          state?: string
          transit_score?: number | null
          updated_at?: string | null
          walkability_score?: number | null
          zip_codes?: string[] | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          address: string
          air_conditioning: boolean | null
          attom_id: string | null
          basement: boolean | null
          bathrooms: number | null
          bedrooms: number | null
          city: string | null
          created_at: string
          current_value: number | null
          exterior_material: string | null
          fireplace: boolean | null
          garage_spaces: number | null
          heating_type: string | null
          hoa_fee: number | null
          id: string
          last_sale_date: string | null
          last_sale_price: number | null
          latitude: number | null
          listing_type: string | null
          longitude: number | null
          lot_size: number | null
          neighborhood_id: string | null
          owner_name: string | null
          parking_spaces: number | null
          pool: boolean | null
          property_status: string | null
          property_type: string | null
          roof_type: string | null
          school_district: string | null
          square_feet: number | null
          state: string | null
          transit_score: number | null
          updated_at: string
          walkability_score: number | null
          year_built: number | null
          zip_code: string | null
        }
        Insert: {
          address: string
          air_conditioning?: boolean | null
          attom_id?: string | null
          basement?: boolean | null
          bathrooms?: number | null
          bedrooms?: number | null
          city?: string | null
          created_at?: string
          current_value?: number | null
          exterior_material?: string | null
          fireplace?: boolean | null
          garage_spaces?: number | null
          heating_type?: string | null
          hoa_fee?: number | null
          id?: string
          last_sale_date?: string | null
          last_sale_price?: number | null
          latitude?: number | null
          listing_type?: string | null
          longitude?: number | null
          lot_size?: number | null
          neighborhood_id?: string | null
          owner_name?: string | null
          parking_spaces?: number | null
          pool?: boolean | null
          property_status?: string | null
          property_type?: string | null
          roof_type?: string | null
          school_district?: string | null
          square_feet?: number | null
          state?: string | null
          transit_score?: number | null
          updated_at?: string
          walkability_score?: number | null
          year_built?: number | null
          zip_code?: string | null
        }
        Update: {
          address?: string
          air_conditioning?: boolean | null
          attom_id?: string | null
          basement?: boolean | null
          bathrooms?: number | null
          bedrooms?: number | null
          city?: string | null
          created_at?: string
          current_value?: number | null
          exterior_material?: string | null
          fireplace?: boolean | null
          garage_spaces?: number | null
          heating_type?: string | null
          hoa_fee?: number | null
          id?: string
          last_sale_date?: string | null
          last_sale_price?: number | null
          latitude?: number | null
          listing_type?: string | null
          longitude?: number | null
          lot_size?: number | null
          neighborhood_id?: string | null
          owner_name?: string | null
          parking_spaces?: number | null
          pool?: boolean | null
          property_status?: string | null
          property_type?: string | null
          roof_type?: string | null
          school_district?: string | null
          square_feet?: number | null
          state?: string | null
          transit_score?: number | null
          updated_at?: string
          walkability_score?: number | null
          year_built?: number | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "properties_neighborhood_id_fkey"
            columns: ["neighborhood_id"]
            isOneToOne: false
            referencedRelation: "neighborhoods"
            referencedColumns: ["id"]
          },
        ]
      }
      property_alerts: {
        Row: {
          alert_data: Json | null
          alert_type: string
          created_at: string | null
          id: string
          is_read: boolean | null
          property_id: string | null
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          alert_data?: Json | null
          alert_type: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          property_id?: string | null
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          alert_data?: Json | null
          alert_type?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          property_id?: string | null
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_alerts_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_features: {
        Row: {
          created_at: string | null
          feature_name: string
          feature_type: string
          feature_value: string | null
          id: string
          property_id: string | null
        }
        Insert: {
          created_at?: string | null
          feature_name: string
          feature_type: string
          feature_value?: string | null
          id?: string
          property_id?: string | null
        }
        Update: {
          created_at?: string | null
          feature_name?: string
          feature_type?: string
          feature_value?: string | null
          id?: string
          property_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_features_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_market_data: {
        Row: {
          data_source: string | null
          days_on_market: number | null
          estimated_monthly_costs: Json | null
          id: string
          last_updated: string | null
          market_trends: Json | null
          price_estimate: number | null
          price_history: Json | null
          price_per_sqft: number | null
          property_id: string | null
          rent_estimate: number | null
          tax_assessment: number | null
          tax_year: number | null
        }
        Insert: {
          data_source?: string | null
          days_on_market?: number | null
          estimated_monthly_costs?: Json | null
          id?: string
          last_updated?: string | null
          market_trends?: Json | null
          price_estimate?: number | null
          price_history?: Json | null
          price_per_sqft?: number | null
          property_id?: string | null
          rent_estimate?: number | null
          tax_assessment?: number | null
          tax_year?: number | null
        }
        Update: {
          data_source?: string | null
          days_on_market?: number | null
          estimated_monthly_costs?: Json | null
          id?: string
          last_updated?: string | null
          market_trends?: Json | null
          price_estimate?: number | null
          price_history?: Json | null
          price_per_sqft?: number | null
          property_id?: string | null
          rent_estimate?: number | null
          tax_assessment?: number | null
          tax_year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "property_market_data_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_photos: {
        Row: {
          created_at: string | null
          id: string
          is_primary: boolean | null
          photo_order: number | null
          photo_url: string
          property_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          photo_order?: number | null
          photo_url: string
          property_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          photo_order?: number | null
          photo_url?: string
          property_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_photos_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_searches: {
        Row: {
          created_at: string | null
          id: string
          last_run: string | null
          notification_enabled: boolean | null
          results_count: number | null
          search_criteria: Json
          search_name: string
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_run?: string | null
          notification_enabled?: boolean | null
          results_count?: number | null
          search_criteria: Json
          search_name: string
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          last_run?: string | null
          notification_enabled?: boolean | null
          results_count?: number | null
          search_criteria?: Json
          search_name?: string
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      search_history: {
        Row: {
          created_at: string
          id: string
          results_count: number | null
          search_query: string
          search_type: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          results_count?: number | null
          search_query: string
          search_type?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          results_count?: number | null
          search_query?: string
          search_type?: string | null
        }
        Relationships: []
      }
      user_liked_properties: {
        Row: {
          created_at: string
          id: string
          property_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          property_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          property_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_liked_properties_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          created_at: string | null
          id: string
          notification_preferences: Json | null
          preferred_features: Json | null
          preferred_locations: Json | null
          price_range: Json | null
          property_types: string[] | null
          required_features: Json | null
          search_radius: number | null
          session_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          notification_preferences?: Json | null
          preferred_features?: Json | null
          preferred_locations?: Json | null
          price_range?: Json | null
          property_types?: string[] | null
          required_features?: Json | null
          search_radius?: number | null
          session_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          notification_preferences?: Json | null
          preferred_features?: Json | null
          preferred_locations?: Json | null
          price_range?: Json | null
          property_types?: string[] | null
          required_features?: Json | null
          search_radius?: number | null
          session_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
