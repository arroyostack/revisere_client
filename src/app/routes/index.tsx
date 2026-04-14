import { createRoute } from "@tanstack/react-router";
import { ContractAnalysisPage } from "../../features/contract-analysis/screens/ContractAnalysisPage";
import { Route as RootRoute } from "./__root";

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: "/",
  component: ContractAnalysisPage,
});
