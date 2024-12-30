import { AdData } from "@/types/Ad";
import { FacebookAdInterest } from "@/types/facebookAdOptions";

interface TargetingPayload {
  [key: string]: any;
}

export const generateTargetingPayload = (
  adData: AdData,
  platform: string
): TargetingPayload => {
  switch (platform.toLowerCase()) {
    case "facebook":
    case "instagram":
      return generateFacebookPayload(adData);

    case "google":
      return generateGooglePayload(adData);

    case "twitter":
      return generateTwitterPayload(adData);

    default:
      throw new Error(`Platform ${platform} is not supported.`);
  }
};

/**
 * Generates the targeting payload for Facebook and Instagram ads.
 */
const generateFacebookPayload = (adData: AdData): TargetingPayload => {
  const genders =
    adData.gender && adData.gender !== "All"
      ? [adData.gender === "Male" ? 1 : 2]
      : [];

  const interests =
    adData.facebookAdInterest?.map((interest: FacebookAdInterest) => ({
      id: interest.id,
      name: interest.name,
    })) || [];

  return {
    geo_locations: {
      countries: adData.region || ["US"],
    },
    genders,
    ...(adData.ageGroup
      ? {
          age_min: parseInt(adData.ageGroup[0]),
          age_max: parseInt(adData.ageGroup[1]),
        }
      : {}),
    interests,
    facebook_positions: adData.placement ? [adData.placement] : ["feed"],
  };
};

/**
 * Generates the targeting payload for Google Ads.
 */
const generateGooglePayload = (adData: AdData): TargetingPayload => {
  return {
    locations: adData.region?.map((country) => ({ locationName: country })) || [],
    keywords: adData.keywords || [],
    age_range: adData.ageGroup
      ? `AGE_RANGE_${adData.ageGroup[0]}_${adData.ageGroup[1]}`
      : "AGE_RANGE_18_65",
    gender: adData.gender || "ALL",
    placements: adData.placement || "DISPLAY",
  };
};

/**
 * Generates the targeting payload for Twitter Ads.
 */
const generateTwitterPayload = (adData: AdData): TargetingPayload => {
  const gender =
    adData.gender === "Male" ? 0 : adData.gender === "Female" ? 1 : null;

  return {
    locations: adData.region?.map((country) => ({ country_code: country })) || [],
    gender,
    interests: adData.interests || [],
    age_min: adData.ageGroup ? parseInt(adData.ageGroup[0]) : 18,
    age_max: adData.ageGroup ? parseInt(adData.ageGroup[1]) : 65,
    placement: adData.placement || "ALL_ON_TWITTER",
  };
};
