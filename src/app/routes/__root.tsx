import { createRootRoute } from "@tanstack/react-router";
import { ApplicationShellLayout } from "../layouts/ApplicationShellLayout";

export const Route = createRootRoute({
  component: ApplicationShellLayout,
});
