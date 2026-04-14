import { createRoute } from "@tanstack/react-router";
import { ContractAnalysis } from "../pages/ContractAnalysis";
import { Route as RootRoute } from "./__root";

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: "/",
  component: () => <ContractAnalysis />,
});
