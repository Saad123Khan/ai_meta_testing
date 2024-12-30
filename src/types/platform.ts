export interface PlatformData {
    platform_id: number;
    platform_name: string;
    platform_key: string;
    platform_icon: string;
    connection_id: number | null;
    access_token: string | null;
    name: string | null;
    email: string | null;
    expires_at: string | null;
}