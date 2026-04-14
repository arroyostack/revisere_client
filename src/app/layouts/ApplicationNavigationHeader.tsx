import { Link, useLocation } from "@tanstack/react-router";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import { applicationNavigationHeaderStyles } from "./ApplicationNavigationHeader.styles";

export function ApplicationNavigationHeader(): JSX.Element {
  const currentLocation = useLocation();
  const isContractComparisonRouteActive =
    currentLocation.pathname === "/comparison";

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={applicationNavigationHeaderStyles.headerBar}
    >
      <Toolbar sx={applicationNavigationHeaderStyles.toolbarLayout}>
        <Link to="/">
          <Box sx={applicationNavigationHeaderStyles.applicationBrandMark}>
            <Typography variant="h6">ContractLens</Typography>
          </Box>
        </Link>
        <Box sx={applicationNavigationHeaderStyles.navigationLinksContainer}>
          <Link to="/">
            <Box
              sx={[
                applicationNavigationHeaderStyles.navigationLink,
                !isContractComparisonRouteActive &&
                  applicationNavigationHeaderStyles.activeNavigationLink,
              ]}
            >
              <Typography variant="body2">Analyze</Typography>
            </Box>
          </Link>
          <Link to="/comparison">
            <Box
              sx={[
                applicationNavigationHeaderStyles.navigationLink,
                isContractComparisonRouteActive &&
                  applicationNavigationHeaderStyles.activeNavigationLink,
              ]}
            >
              <Typography variant="body2">Compare</Typography>
            </Box>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
