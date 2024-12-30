import { Brand } from "./brand";
import { FacebookAdInterest } from "./facebookAdOptions";


export interface AdData {
    brandName?: string;
    prompt?: string;
    primaryText?: string;
    websiteUrl?: string;
    brandId?: number | null;
    platformId?: number | null;
    name?: string;
    description?: string;
    status?: string;
    targetAudience?: string[]; // Mapping to array cast
    ageGroup?: string[]; // Mapping to array cast
    campaignGoal?: Objective; // e.g., "sales", "leads"
    adType?: string; // e.g., "image", "video"
    budget?: number;
    ctaButtonText?: string; // Call-to-action text
    ctaUrl?: string;
    startDate?: string; // ISO date format preferred
    endDate?: string; // ISO date format preferred
    region?: string[]; // Mapping to array cast
    platformRequirements?: Record<string, any>; // JSON object
    customParameters?: Record<string, any>; // JSON object
    language?: string[] | string; // Mapping to array cast
    keywords?: string[]; // Mapping to array cast
    placement?: string; // e.g., "feed", "stories"
    bidStrategy?: string; // e.g., "lowest cost", "highest value"
    frequencyCap?: number;
    conversionTrackingId?: string;
    creativeSettings?: Record<string, any>; // JSON object
    schedule?: Record<string, any>; // JSON object
    campaignId?: string;
    campaignName?: string;
    adSetId?: string;
    creativeId?: string;
    adId?: string;
    platformStatus?: Record<string, any>; // JSON objectprimaryText
    files?: File[] | any[]; // Assuming files uploaded with media library
    interests?: string[]; // Related to Facebook audience
    brand?: Brand | null; // Can be null initially
    facebookAdInterest?: FacebookAdInterest[]; // Specific Facebook interests
    gender?: "All" | "Male" | "Female";
    billingEvent?: string;
    bidAmount?: string;
    optimizationGoal?: string;
    headline?: string;  
  }


  export type PlatformValues = {
    facebook?: string;
    instagram?: string;
    google?: string;
    twitter?: string;
  };
  
  export type Objective = {
    title: string;
    description: string;
    platformValues: PlatformValues;
  };
  

  export type ForecastData = {
    daily: { spend: number | string; reach: number | string; actions: number | string } | null;
    weekly: { spend: number | string; reach: number | string; actions: number | string } | null;
    monthly: { spend: number | string; reach: number | string; actions: number | string } | null;
  };
