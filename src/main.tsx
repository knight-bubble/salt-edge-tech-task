import {
  RouterProvider,
  createHashHistory,
  createRouter,
} from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./configs/interceptors";
import { queryClient } from "./configs/query-client";
import "./index.css";
import { routeTree } from "./routeTree.gen";

const memoryHistory = createHashHistory();

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  history: memoryHistory,
  defaultPreload: "intent",
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
