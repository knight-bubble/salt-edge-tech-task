export interface PaginatedResponse<T> {
  info: {
    page: number;
    results: number;
  };
  results: T[];
}
