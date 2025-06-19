import { ErrorPage } from "@/components/general/error-page";
import { NotFound } from "@/components/general/not-found";
import { queryClient } from "@/configs/query-client";
import { ConfigProvider } from "@/providers/ConfigProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRouteWithContext, HeadContent, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { createPortal } from "react-dom";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: () => {
    return (
      <ConfigProvider>
        <QueryClientProvider client={queryClient}>
          {createPortal(<HeadContent />, document.querySelector("head")!)}
          <Outlet />
          <TanStackRouterDevtools />
        </QueryClientProvider>
      </ConfigProvider>
    );
  },
  notFoundComponent: NotFound,
  errorComponent: ErrorPage,
});
