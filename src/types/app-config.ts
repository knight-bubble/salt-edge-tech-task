export type AppConfig = {
  pagination: {
    defaultPageSize: number;
    rowPerPageOptions: number[];
  };
  searchDebounceTime: number;
};
