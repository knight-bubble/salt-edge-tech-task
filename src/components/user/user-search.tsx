import { useAppConfig } from "@/hooks/use-app-config";
import { useFilters } from "@/hooks/use-filters";
import { Route } from "@/routes/workspace/users";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";

export const UserSearch = () => {
  const { filters, setFilters } = useFilters(Route.id);
  const [searchValue, setSearchValue] = useState(filters.query ?? "");
  const { config } = useAppConfig();

  const debouncedSetFilters = useDebouncedCallback((query: string) => {
    setFilters({ ...filters, query });
  }, config.searchDebounceTime);

  const handleSearchValueChange = (value: string) => {
    setSearchValue(value);
    debouncedSetFilters(value);
  };

  return (
    <Input
      value={searchValue}
      onChange={(e) => handleSearchValueChange(e.target.value)}
      placeholder='Search users...'
    />
  );
};
