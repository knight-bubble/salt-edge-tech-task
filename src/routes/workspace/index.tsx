import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace/")({
  component: DashboardRouteComponent,
  loader: () => ({
    title: "Dashboard",
  }),
});

function DashboardRouteComponent() {
  return <div>Dashboard</div>;
}
