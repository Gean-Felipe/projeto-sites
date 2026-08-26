import { QueryClient } from "@tanstack/react-query";
import { createRouter, createMemoryHistory, createBrowserHistory } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const basePath = import.meta.env.VITE_BASE_PATH || "/";

export const getRouter = () => {
  const queryClient = new QueryClient();
  const isServer = typeof window === "undefined";

  const router = createRouter({
    routeTree,
    basepath: basePath === "/" ? undefined : basePath,
    history: isServer ? createMemoryHistory() : createBrowserHistory(),
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
