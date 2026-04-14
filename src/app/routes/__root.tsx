import { createRootRoute } from "@tanstack/react-router";
import { ApplicationShellLayout } from "../layouts/ApplicationShellLayout";
import { ErrorBoundary } from "../../shared/ui/ErrorBoundary/ErrorBoundary";

export const Route = createRootRoute({
  component: function RootRouteComponent() {
    return (
      <ErrorBoundary>
        <ApplicationShellLayout />
      </ErrorBoundary>
    );
  },
});