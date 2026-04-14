import { createRoute } from "@tanstack/react-router";
import { ContractComparisonPage } from "../../features/contract-comparison/screens/ContractComparisonPage";
import { Route as RootRoute } from "./__root";

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: "/comparison",
  component: ContractComparisonPage,
});
