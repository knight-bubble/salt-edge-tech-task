import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace/users")({
  component: RouteComponent,
  loader: () => ({
    title: "Users",
  }),
});

function RouteComponent() {
  return <Outlet />;
}
