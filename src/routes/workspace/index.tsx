import { Dashboard } from "@/components/dashboard/dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace/")({
  component: DashboardRouteComponent,
  loader: () => ({
    title: "Dashboard",
  }),
});

function DashboardRouteComponent() {
  return <Dashboard />;
}
