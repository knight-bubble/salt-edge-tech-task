import { randomUserQueryOptions } from "@/api/random-user.api";
import {
  UserDetails,
  UserDetailsLoading,
} from "@/components/user/user-details";
import { UserErrorDetails } from "@/components/user/user-error-details";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace/users/$userId/")({
  component: RouteComponent,
  pendingComponent: () => <UserDetailsLoading />,
  errorComponent: () => <UserErrorDetails />,
  loader: async ({ context: { queryClient }, params: { userId } }) => {
    const user = await queryClient.ensureQueryData(
      randomUserQueryOptions(userId),
    );

    if (!user) {
      throw new Error("User not found");
    }

    return {
      user,
      title: `${user.name.first} ${user.name.last}`,
    };
  },
});

function RouteComponent() {
  return <UserDetails />;
}
