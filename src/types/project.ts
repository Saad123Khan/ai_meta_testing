// types/project.ts
export interface ProjectData {
    user_id: number;
    brand_id: number;
    platform_id: number | null;
    name: string;
    description: string;
    status?: string;
    target_audience?: string[];
    age_group?: string[];
    campaign_goal?: string;
    ad_type?: string;
    budget?: string;
    cta_button_text?: string;
    cta_url?: string;
    start_date?: string;
    end_date?: string;
    region?: string[];
    platform_requirements?: Record<string, any>;
    custom_parameters?: Record<string, any>;
    language?: string[];
    keywords?: string[];
    placement?: string;
    bid_strategy?: string;
    frequency_cap?: string;
    conversion_tracking_id?: string;
    creative_settings?: any[]; // Array of creative settings such as images or videos
    schedule?: Record<string, any>;
    campaign_id?: string;
    ad_set_id?: string;
    creative_id?: string;
    ad_id?: string;
    platform_status?: Record<string, any>;
  }
  