import { createRoute } from "@tanstack/react-router";
import { ContractComparison } from "../pages/ContractComparison";
import { Route as RootRoute } from "./__root";

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: "/comparison",
  component: () => <ContractComparison />,
});
