// facebookAdOptions.ts
export interface FacebookAdOptionsData {
    status: FacebookAdStatus[];
    billing_event: FacebookAdBillingEvent[];
    optimization_goal: FacebookAdOptimizationGoal[];
    call_to_action: string[];
}

export type FacebookAdStatus = "ACTIVE" | "PAUSED" | "DELETED" | "ARCHIVED";

export type FacebookAdBillingEvent =
    | "IMPRESSIONS"
    | "CLICKS"
    | "LINK_CLICKS"
    | "POST_ENGAGEMENT"
    | "VIDEO_VIEWS";

export type FacebookAdOptimizationGoal =
    | "APP_INSTALLS"
    | "BRAND_AWARENESS"
    | "CLICKS"
    | "ENGAGED_USERS"
    | "IMPRESSIONS"
    | "LEAD_GENERATION"
    | "LINK_CLICKS"
    | "REACH"
    | "VIDEO_VIEWS";


export interface FacebookAdInterest {
    id: string;
    name: string;
    audience_size_lower_bound: number;
    audience_size_upper_bound: number;
    path: string[];
    description: string | null;
    topic: string;
    }
    
      