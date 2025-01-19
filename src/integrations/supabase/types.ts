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
      cv_match: {
        Row: {
          created_at: string | null
          cv_metadata_id: string | null
          id: string
          job_description: string
          match_score: number | null
          matched_at: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          cv_metadata_id?: string | null
          id?: string
          job_description: string
          match_score?: number | null
          matched_at?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          cv_metadata_id?: string | null
          id?: string
          job_description?: string
          match_score?: number | null
          matched_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cv_match_cv_metadata_id_fkey"
            columns: ["cv_metadata_id"]
            isOneToOne: false
            referencedRelation: "cv_metadata"
            referencedColumns: ["id"]
          },
        ]
      }
      cv_metadata: {
        Row: {
          certifications: Json | null
          created_at: string | null
          current_salary: number | null
          cv_content: string | null
          education: string | null
          email: string | null
          expected_salary: number | null
          experience: number | null
          file_url: string | null
          id: string
          license: string | null
          local_singapore_citizen_pr: boolean | null
          location: string | null
          name: string | null
          nationality: string | null
          notice_period: unknown | null
          phone: string | null
          skills: Json | null
          types_of_work_passes: string | null
        }
        Insert: {
          certifications?: Json | null
          created_at?: string | null
          current_salary?: number | null
          cv_content?: string | null
          education?: string | null
          email?: string | null
          expected_salary?: number | null
          experience?: number | null
          file_url?: string | null
          id?: string
          license?: string | null
          local_singapore_citizen_pr?: boolean | null
          location?: string | null
          name?: string | null
          nationality?: string | null
          notice_period?: unknown | null
          phone?: string | null
          skills?: Json | null
          types_of_work_passes?: string | null
        }
        Update: {
          certifications?: Json | null
          created_at?: string | null
          current_salary?: number | null
          cv_content?: string | null
          education?: string | null
          email?: string | null
          expected_salary?: number | null
          experience?: number | null
          file_url?: string | null
          id?: string
          license?: string | null
          local_singapore_citizen_pr?: boolean | null
          location?: string | null
          name?: string | null
          nationality?: string | null
          notice_period?: unknown | null
          phone?: string | null
          skills?: Json | null
          types_of_work_passes?: string | null
        }
        Relationships: []
      }
      jobs: {
        Row: {
          company: string
          created_at: string
          description: string
          id: string
          location: string
          requirements: string
          salary: string
          title: string
        }
        Insert: {
          company: string
          created_at?: string
          description: string
          id?: string
          location: string
          requirements: string
          salary: string
          title: string
        }
        Update: {
          company?: string
          created_at?: string
          description?: string
          id?: string
          location?: string
          requirements?: string
          salary?: string
          title?: string
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
