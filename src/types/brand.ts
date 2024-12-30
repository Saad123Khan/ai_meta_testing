// types/brand.ts
export interface Brand {
  id: number;
  user_id: number;
  name: string;
  page_id: string;
  description: string;
  web_url: string;
  industry: string;
  meta: string;
  social_media_links: {
    facebook?: string;
    instagram?: string;
    [key: string]: string | undefined;
  };
  font: string | null;
  status: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  font_url: string;
  logo: string;
  colors: string[];
  media: string[];
}
