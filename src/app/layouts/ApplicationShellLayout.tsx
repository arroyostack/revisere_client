import { Box } from "@mui/material";
import { Outlet } from "@tanstack/react-router";
import { ApplicationNavigationHeader } from "./ApplicationNavigationHeader";
import { applicationShellLayoutStyles } from "./ApplicationShellLayout.styles";

export function ApplicationShellLayout(): JSX.Element {
  return (
    <Box sx={applicationShellLayoutStyles.pageContainer}>
      <ApplicationNavigationHeader />
      <Box component="main" sx={applicationShellLayoutStyles.pageContent}>
        <Outlet />
      </Box>
    </Box>
  );
}
