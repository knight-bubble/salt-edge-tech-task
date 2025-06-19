import { randomUsersQueryOptions } from "@/api/random-user.api";
import { UserList } from "@/components/user/user-list";
import { sortByToState } from "@/lib/utils";
import type { SortParams } from "@/types/table-pagination";
import { createFileRoute } from "@tanstack/react-router";
import { array, number, object, optional, string } from "valibot";

export const Route = createFileRoute("/workspace/users/")({
  validateSearch: object({
    query: optional(string()),

    pageIndex: optional(number()),
    pageSize: optional(number()),
    sortBy: optional(array(string())),
  }),
  component: UsersRouteComponent,
  loaderDeps: ({ search: { query, pageIndex, pageSize, sortBy } }) => ({
    query,
    pageIndex,
    pageSize,
    sortBy,
  }),
  loader: ({
    deps: { query, pageIndex, pageSize, sortBy },
    context: { queryClient },
  }) => {
    queryClient.prefetchQuery(
      randomUsersQueryOptions(
        query,
        pageIndex,
        pageSize,
        sortByToState(sortBy as SortParams["sortBy"]),
      ),
    );
  },
});

function UsersRouteComponent() {
  return <UserList />;
}
