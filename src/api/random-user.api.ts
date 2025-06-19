import type { PaginatedResponse } from "@/types/api/paginated-response";
import type { RandomUser } from "@/types/domain/random-user";
import type { RandomUserRow } from "@/types/domain/random-user-row";
import type { PaginatedData } from "@/types/table-pagination";
import { queryOptions } from "@tanstack/react-query";
import axios from "axios";
import { randomUserMapper, randomUserRowMapper } from "./mappers/random-user.mapper";

export const randomUsersQueryOptions = (
  query: string = "",
  pageIndex: number = 1,
  pageSize: number = 20,
  sortBy: {
    id: string;
    desc: boolean;
  }[] = []
) =>
  queryOptions({
    queryKey: ["random-users", query, pageIndex, pageSize, sortBy],
    queryFn: async (): Promise<PaginatedData<RandomUserRow>> => {
      const params = new URLSearchParams();
      params.append("inc", "login,name,email,picture");
      params.append("results", "100");

      const queryString = params.toString();
      const endpoint = `/${queryString ? `?${queryString}` : ""}`;

      await new Promise((resolve) => setTimeout(resolve, 2000));

      return axios
        .get<PaginatedResponse<RandomUserRow>>(endpoint)
        .then((res) => randomUserRowMapper(res.data, pageIndex, pageSize, query, sortBy));
    },
    placeholderData: (previousData) => {
      return {
        ...previousData,
        results: [],
      } as PaginatedData<RandomUserRow>;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: Infinity,
  });

export const randomUserQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ["random-user", userId],
    queryFn: async (): Promise<RandomUser | undefined> => {
      const params = new URLSearchParams();
      params.append("results", "100");

      const queryString = params.toString();
      const endpoint = `/${queryString ? `?${queryString}` : ""}`;

      await new Promise((resolve) => setTimeout(resolve, 2000));

      return axios.get<PaginatedResponse<RandomUser>>(endpoint).then((res) => randomUserMapper(res.data, userId));
    },
  });
