import { createRootRoute, Outlet } from "@tanstack/react-router";
import { NavigationHeader } from "../components/layout/NavigationHeader";

export const Route = createRootRoute({
  component: () => (
    <>
      <NavigationHeader />
      <Outlet />
    </>
  ),
});
