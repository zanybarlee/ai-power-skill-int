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
      access_control_policies: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          permissions: Json
          resource_id: string | null
          resource_type: string
          role_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          permissions: Json
          resource_id?: string | null
          resource_type: string
          role_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          permissions?: Json
          resource_id?: string | null
          resource_type?: string
          role_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      ai_models: {
        Row: {
          created_at: string | null
          id: string
          metadata: Json | null
          model_type: Database["public"]["Enums"]["model_type"]
          name: string
          registry_url: string | null
          status: string | null
          updated_at: string | null
          validation_rules: Json | null
          version: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          model_type: Database["public"]["Enums"]["model_type"]
          name: string
          registry_url?: string | null
          status?: string | null
          updated_at?: string | null
          validation_rules?: Json | null
          version: string
        }
        Update: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          model_type?: Database["public"]["Enums"]["model_type"]
          name?: string
          registry_url?: string | null
          status?: string | null
          updated_at?: string | null
          validation_rules?: Json | null
          version?: string
        }
        Relationships: []
      }
      card_comments: {
        Row: {
          board_id: string | null
          card_id: string
          comment: string
          created_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          board_id?: string | null
          card_id: string
          comment: string
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          board_id?: string | null
          card_id?: string
          comment?: string
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "card_comments_board_id_fkey"
            columns: ["board_id"]
            isOneToOne: false
            referencedRelation: "kanban_boards"
            referencedColumns: ["id"]
          },
        ]
      }
      card_labels: {
        Row: {
          board_id: string | null
          color: string
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          board_id?: string | null
          color: string
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          board_id?: string | null
          color?: string
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "card_labels_board_id_fkey"
            columns: ["board_id"]
            isOneToOne: false
            referencedRelation: "kanban_boards"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_reports: {
        Row: {
          compliance_standards: string[] | null
          generated_at: string | null
          generated_by: string | null
          id: string
          report_data: Json
          report_period_end: string | null
          report_period_start: string | null
          report_type: string
          status: string | null
        }
        Insert: {
          compliance_standards?: string[] | null
          generated_at?: string | null
          generated_by?: string | null
          id?: string
          report_data: Json
          report_period_end?: string | null
          report_period_start?: string | null
          report_type: string
          status?: string | null
        }
        Update: {
          compliance_standards?: string[] | null
          generated_at?: string | null
          generated_by?: string | null
          id?: string
          report_data?: Json
          report_period_end?: string | null
          report_period_start?: string | null
          report_type?: string
          status?: string | null
        }
        Relationships: []
      }
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
      data_access_logs: {
        Row: {
          access_details: Json | null
          accessed_at: string | null
          action_type: string
          id: string
          ip_address: string | null
          resource_id: string | null
          resource_type: string
          user_id: string | null
        }
        Insert: {
          access_details?: Json | null
          accessed_at?: string | null
          action_type: string
          id?: string
          ip_address?: string | null
          resource_id?: string | null
          resource_type: string
          user_id?: string | null
        }
        Update: {
          access_details?: Json | null
          accessed_at?: string | null
          action_type?: string
          id?: string
          ip_address?: string | null
          resource_id?: string | null
          resource_type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      data_cleaning_jobs: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          rules: Json
          source_id: string | null
          stats: Json | null
          status: Database["public"]["Enums"]["data_process_status"] | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          rules: Json
          source_id?: string | null
          stats?: Json | null
          status?: Database["public"]["Enums"]["data_process_status"] | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          rules?: Json
          source_id?: string | null
          stats?: Json | null
          status?: Database["public"]["Enums"]["data_process_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "data_cleaning_jobs_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "data_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      data_contracts: {
        Row: {
          created_at: string | null
          distribution_rules: Json | null
          id: string
          name: string
          null_value_threshold: number | null
          schema_definition: Json
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          distribution_rules?: Json | null
          id?: string
          name: string
          null_value_threshold?: number | null
          schema_definition: Json
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          distribution_rules?: Json | null
          id?: string
          name?: string
          null_value_threshold?: number | null
          schema_definition?: Json
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      data_labeling_tasks: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          label_schema: Json
          progress: number | null
          source_id: string | null
          status: Database["public"]["Enums"]["data_process_status"] | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          label_schema: Json
          progress?: number | null
          source_id?: string | null
          status?: Database["public"]["Enums"]["data_process_status"] | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          label_schema?: Json
          progress?: number | null
          source_id?: string | null
          status?: Database["public"]["Enums"]["data_process_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "data_labeling_tasks_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "data_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      data_lineage: {
        Row: {
          created_at: string | null
          id: string
          source_id: string | null
          transformation_steps: Json
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          source_id?: string | null
          transformation_steps: Json
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          source_id?: string | null
          transformation_steps?: Json
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "data_lineage_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "data_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      data_masking_rules: {
        Row: {
          column_name: string
          created_at: string | null
          id: string
          is_active: boolean | null
          masking_pattern: string | null
          masking_type: string
          table_name: string
          updated_at: string | null
        }
        Insert: {
          column_name: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          masking_pattern?: string | null
          masking_type: string
          table_name: string
          updated_at?: string | null
        }
        Update: {
          column_name?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          masking_pattern?: string | null
          masking_type?: string
          table_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      data_quality_alerts: {
        Row: {
          alert_type: string
          created_at: string | null
          description: string
          id: string
          resolution_details: string | null
          resolved_at: string | null
          severity: string
          source_id: string | null
        }
        Insert: {
          alert_type: string
          created_at?: string | null
          description: string
          id?: string
          resolution_details?: string | null
          resolved_at?: string | null
          severity: string
          source_id?: string | null
        }
        Update: {
          alert_type?: string
          created_at?: string | null
          description?: string
          id?: string
          resolution_details?: string | null
          resolved_at?: string | null
          severity?: string
          source_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "data_quality_alerts_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "data_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      data_sources: {
        Row: {
          connection_details: Json | null
          created_at: string | null
          id: string
          name: string
          source_type: string
          updated_at: string | null
        }
        Insert: {
          connection_details?: Json | null
          created_at?: string | null
          id?: string
          name: string
          source_type: string
          updated_at?: string | null
        }
        Update: {
          connection_details?: Json | null
          created_at?: string | null
          id?: string
          name?: string
          source_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      feature_engineering_jobs: {
        Row: {
          completed_at: string | null
          created_at: string | null
          features: Json
          id: string
          source_id: string | null
          status: Database["public"]["Enums"]["data_process_status"] | null
          transformations: Json | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          features: Json
          id?: string
          source_id?: string | null
          status?: Database["public"]["Enums"]["data_process_status"] | null
          transformations?: Json | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          features?: Json
          id?: string
          source_id?: string | null
          status?: Database["public"]["Enums"]["data_process_status"] | null
          transformations?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "feature_engineering_jobs_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "data_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      feature_store: {
        Row: {
          created_at: string | null
          description: string | null
          feature_name: string
          feature_type: string
          id: string
          last_updated: string | null
          metadata: Json | null
          updated_at: string | null
          validation_rules: Json | null
          version: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          feature_name: string
          feature_type: string
          id?: string
          last_updated?: string | null
          metadata?: Json | null
          updated_at?: string | null
          validation_rules?: Json | null
          version?: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          feature_name?: string
          feature_type?: string
          id?: string
          last_updated?: string | null
          metadata?: Json | null
          updated_at?: string | null
          validation_rules?: Json | null
          version?: string
        }
        Relationships: []
      }
      job_descriptions: {
        Row: {
          created_at: string | null
          extracted_role: Json | null
          file_name: string | null
          file_type: string | null
          file_url: string | null
          id: string
          original_text: string
          status: string | null
          title: string | null
        }
        Insert: {
          created_at?: string | null
          extracted_role?: Json | null
          file_name?: string | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          original_text: string
          status?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string | null
          extracted_role?: Json | null
          file_name?: string | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          original_text?: string
          status?: string | null
          title?: string | null
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
      kanban_boards: {
        Row: {
          board_data: Json
          created_at: string | null
          id: string
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          board_data?: Json
          created_at?: string | null
          id?: string
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          board_data?: Json
          created_at?: string | null
          id?: string
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      knowledge_base_files: {
        Row: {
          chunk_method: string | null
          chunk_number: number | null
          created_at: string | null
          enabled: boolean | null
          file_path: string
          filename: string
          id: string
          parsing_status: string | null
          updated_at: string | null
          upload_date: string | null
          user_id: string | null
        }
        Insert: {
          chunk_method?: string | null
          chunk_number?: number | null
          created_at?: string | null
          enabled?: boolean | null
          file_path: string
          filename: string
          id?: string
          parsing_status?: string | null
          updated_at?: string | null
          upload_date?: string | null
          user_id?: string | null
        }
        Update: {
          chunk_method?: string | null
          chunk_number?: number | null
          created_at?: string | null
          enabled?: boolean | null
          file_path?: string
          filename?: string
          id?: string
          parsing_status?: string | null
          updated_at?: string | null
          upload_date?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      knowledge_bases: {
        Row: {
          chunk_size: number | null
          created_at: string | null
          description: string | null
          embedding_model: string | null
          id: string
          last_sync: string | null
          metadata: Json | null
          name: string
          source_type: string
          updated_at: string | null
          validation_status: string | null
        }
        Insert: {
          chunk_size?: number | null
          created_at?: string | null
          description?: string | null
          embedding_model?: string | null
          id?: string
          last_sync?: string | null
          metadata?: Json | null
          name: string
          source_type: string
          updated_at?: string | null
          validation_status?: string | null
        }
        Update: {
          chunk_size?: number | null
          created_at?: string | null
          description?: string | null
          embedding_model?: string | null
          id?: string
          last_sync?: string | null
          metadata?: Json | null
          name?: string
          source_type?: string
          updated_at?: string | null
          validation_status?: string | null
        }
        Relationships: []
      }
      model_validations: {
        Row: {
          id: string
          issues_found: Json | null
          metrics: Json
          model_id: string | null
          status: string | null
          validation_dataset: string | null
          validation_date: string | null
          validation_type: string
        }
        Insert: {
          id?: string
          issues_found?: Json | null
          metrics: Json
          model_id?: string | null
          status?: string | null
          validation_dataset?: string | null
          validation_date?: string | null
          validation_type: string
        }
        Update: {
          id?: string
          issues_found?: Json | null
          metrics?: Json
          model_id?: string | null
          status?: string | null
          validation_dataset?: string | null
          validation_date?: string | null
          validation_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "model_validations_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "ai_models"
            referencedColumns: ["id"]
          },
        ]
      }
      monitoring_alerts: {
        Row: {
          acknowledged_by: string | null
          alert_type: string
          id: string
          message: string
          metric_id: string | null
          resolution_details: string | null
          resolved_at: string | null
          severity: string
          status: string | null
          triggered_at: string | null
        }
        Insert: {
          acknowledged_by?: string | null
          alert_type: string
          id?: string
          message: string
          metric_id?: string | null
          resolution_details?: string | null
          resolved_at?: string | null
          severity: string
          status?: string | null
          triggered_at?: string | null
        }
        Update: {
          acknowledged_by?: string | null
          alert_type?: string
          id?: string
          message?: string
          metric_id?: string | null
          resolution_details?: string | null
          resolved_at?: string | null
          severity?: string
          status?: string | null
          triggered_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "monitoring_alerts_metric_id_fkey"
            columns: ["metric_id"]
            isOneToOne: false
            referencedRelation: "monitoring_metrics"
            referencedColumns: ["id"]
          },
        ]
      }
      monitoring_integrations: {
        Row: {
          config: Json
          created_at: string | null
          credentials: Json | null
          id: string
          integration_type: string
          is_active: boolean | null
          last_sync_at: string | null
          webhook_url: string | null
        }
        Insert: {
          config: Json
          created_at?: string | null
          credentials?: Json | null
          id?: string
          integration_type: string
          is_active?: boolean | null
          last_sync_at?: string | null
          webhook_url?: string | null
        }
        Update: {
          config?: Json
          created_at?: string | null
          credentials?: Json | null
          id?: string
          integration_type?: string
          is_active?: boolean | null
          last_sync_at?: string | null
          webhook_url?: string | null
        }
        Relationships: []
      }
      monitoring_metrics: {
        Row: {
          alert_threshold: number | null
          alert_triggered: boolean | null
          id: string
          metric_name: string
          metric_type: string
          metric_value: number
          source: string
          timestamp: string | null
        }
        Insert: {
          alert_threshold?: number | null
          alert_triggered?: boolean | null
          id?: string
          metric_name: string
          metric_type: string
          metric_value: number
          source: string
          timestamp?: string | null
        }
        Update: {
          alert_threshold?: number | null
          alert_triggered?: boolean | null
          id?: string
          metric_name?: string
          metric_type?: string
          metric_value?: number
          source?: string
          timestamp?: string | null
        }
        Relationships: []
      }
      pipeline_configurations: {
        Row: {
          configuration: Json
          created_at: string | null
          id: string
          name: string
          status: string | null
          tool_type: string
          updated_at: string | null
          validation_scripts: Json | null
        }
        Insert: {
          configuration: Json
          created_at?: string | null
          id?: string
          name: string
          status?: string | null
          tool_type: string
          updated_at?: string | null
          validation_scripts?: Json | null
        }
        Update: {
          configuration?: Json
          created_at?: string | null
          id?: string
          name?: string
          status?: string | null
          tool_type?: string
          updated_at?: string | null
          validation_scripts?: Json | null
        }
        Relationships: []
      }
      pipeline_executions: {
        Row: {
          end_time: string | null
          execution_logs: Json | null
          id: string
          pipeline_id: string | null
          start_time: string | null
          status: string
          validation_results: Json | null
          version_id: string | null
        }
        Insert: {
          end_time?: string | null
          execution_logs?: Json | null
          id?: string
          pipeline_id?: string | null
          start_time?: string | null
          status: string
          validation_results?: Json | null
          version_id?: string | null
        }
        Update: {
          end_time?: string | null
          execution_logs?: Json | null
          id?: string
          pipeline_id?: string | null
          start_time?: string | null
          status?: string
          validation_results?: Json | null
          version_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pipeline_executions_pipeline_id_fkey"
            columns: ["pipeline_id"]
            isOneToOne: false
            referencedRelation: "pipeline_configurations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pipeline_executions_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "pipeline_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      pipeline_versions: {
        Row: {
          changes_description: string | null
          configuration_snapshot: Json
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          pipeline_id: string | null
          version_number: number
        }
        Insert: {
          changes_description?: string | null
          configuration_snapshot: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          pipeline_id?: string | null
          version_number: number
        }
        Update: {
          changes_description?: string | null
          configuration_snapshot?: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          pipeline_id?: string | null
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "pipeline_versions_pipeline_id_fkey"
            columns: ["pipeline_id"]
            isOneToOne: false
            referencedRelation: "pipeline_configurations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          first_name: string | null
          id: string
          job_title: string | null
          last_name: string | null
          organization: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          job_title?: string | null
          last_name?: string | null
          organization?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          job_title?: string | null
          last_name?: string | null
          organization?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          username?: string | null
        }
        Relationships: []
      }
      schema_versions: {
        Row: {
          created_at: string | null
          drift_details: Json | null
          drift_detected: boolean | null
          id: string
          is_current: boolean | null
          schema_snapshot: Json
          source_id: string | null
          version_number: number
        }
        Insert: {
          created_at?: string | null
          drift_details?: Json | null
          drift_detected?: boolean | null
          id?: string
          is_current?: boolean | null
          schema_snapshot: Json
          source_id?: string | null
          version_number: number
        }
        Update: {
          created_at?: string | null
          drift_details?: Json | null
          drift_detected?: boolean | null
          id?: string
          is_current?: boolean | null
          schema_snapshot?: Json
          source_id?: string | null
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "schema_versions_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "data_sources"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      insert_job_description: {
        Args: {
          p_original_text: string
          p_extracted_role: Json
          p_file_name: string
          p_file_type: string
          p_file_url: string
        }
        Returns: string
      }
    }
    Enums: {
      card_priority: "low" | "medium" | "high"
      data_process_status: "pending" | "in_progress" | "completed" | "failed"
      model_type: "rag" | "classification" | "generation" | "embedding"
      user_role:
        | "data_engineer"
        | "data_scientist"
        | "ml_engineer"
        | "devops_engineer"
        | "compliance_officer"
        | "software_engineer"
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
