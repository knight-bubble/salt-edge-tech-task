import type { PaginatedResponse } from "@/types/api/paginated-response";
import type { RandomUser } from "@/types/domain/random-user";
import type { RandomUserRow } from "@/types/domain/random-user-row";
import type { PaginatedData } from "@/types/table-pagination";

// emulate the BE pagination since API doesn't have it
export const randomUserRowMapper = (
  response: PaginatedResponse<RandomUserRow>,
  pageIndex: number,
  pageSize: number,
  query: string,
  sortBy: {
    id: string;
    desc: boolean;
  }[],
): PaginatedData<RandomUserRow> => {
  const startIndex = pageIndex * pageSize;
  const endIndex = startIndex + pageSize;
  let results = response.results;
  let total = response.results.length;

  if (query) {
    results = results.filter((user) => {
      return (
        user.name.first.toLowerCase().includes(query.toLowerCase()) ||
        user.name.last.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
      );
    });
    total = results.length;
  }

  if (sortBy.length > 0) {
    results = results.sort((a, b) =>
      sortBy.reduce((acc, curr) => {
        if (curr.id === "name") {
          return curr.desc
            ? a.name.first.localeCompare(b.name.first)
            : b.name.first.localeCompare(a.name.first);
        }

        if (curr.id === "email") {
          return curr.desc
            ? a.email.localeCompare(b.email)
            : b.email.localeCompare(a.email);
        }

        return acc;
      }, 0),
    );
  }

  results = results.slice(startIndex, endIndex);

  return {
    page: pageIndex,
    pageSize: pageSize,
    total: total,
    totalPages: Math.ceil(total / pageSize),
    results: results,
  };
};

export const randomUserMapper = (
  response: PaginatedResponse<RandomUser>,
  userId: string,
): RandomUser | undefined => {
  return response.results.find((user) => user.login.username === userId);
};
