import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { applicationTheme } from "./app/providers/theme/applicationTheme";
import { applicationRouteTree } from "./app/providers/router/applicationRouter";
import "./index.css";

const applicationRouter = createRouter({ routeTree: applicationRouteTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof applicationRouter;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={applicationTheme}>
      <CssBaseline />
      <RouterProvider router={applicationRouter} />
    </ThemeProvider>
  </React.StrictMode>,
);
