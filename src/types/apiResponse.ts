export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data: T; // This can be an array, object, null, or any type you need.
    errors: any;
}

export interface PaginatedResponse<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
  }