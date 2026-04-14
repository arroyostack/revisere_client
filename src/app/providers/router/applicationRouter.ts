import { Route as RootRoute } from "../../routes/__root";
import { Route as IndexRoute } from "../../routes/index";
import { Route as ComparisonRoute } from "../../routes/comparison";

export const applicationRouteTree = RootRoute.addChildren([
  IndexRoute,
  ComparisonRoute,
]);
