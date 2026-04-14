import { Link, useLocation } from '@tanstack/react-router';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import { navigationHeaderStyles } from './NavigationHeader.styles';

export function NavigationHeader(): JSX.Element {
  const location = useLocation();
  const isComparisonPage = location.pathname === '/comparison';

  return (
    <AppBar position="static" elevation={0} sx={navigationHeaderStyles.header}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Link to="/">
          <Box sx={navigationHeaderStyles.logo}>
            <Typography variant="h6">ContractLens</Typography>
          </Box>
        </Link>
        <Box sx={navigationHeaderStyles.nav}>
          <Link to="/">
            <Box
              sx={{
                ...navigationHeaderStyles.navLink,
                ...( !isComparisonPage ? navigationHeaderStyles.navLinkActive : {}),
              }}
            >
              <Typography variant="body2">Analyze</Typography>
            </Box>
          </Link>
          <Link to="/comparison">
            <Box
              sx={{
                ...navigationHeaderStyles.navLink,
                ...(isComparisonPage ? navigationHeaderStyles.navLinkActive : {}),
              }}
            >
              <Typography variant="body2">Compare</Typography>
            </Box>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
