import { Suspense } from "react";
import { Spinner } from "../ui/spinner";
import { UserSearch } from "./user-search";
import { UsersTable } from "./users-table";

export const UserList = () => {
  return (
    <>
      <UserSearch />
      <Suspense fallback={<Spinner />}>
        <UsersTable />
      </Suspense>
    </>
  );
};
