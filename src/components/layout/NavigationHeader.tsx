import { Link, useLocation } from '@tanstack/react-router';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import { navigationHeaderStyles } from './NavigationHeader.styles';

export function NavigationHeader(): JSX.Element {
  const location = useLocation();
  const isComparisonPage = location.pathname === '/comparison';

  return (
    <AppBar position="static" elevation={0} sx={navigationHeaderStyles.header}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Link to="/" sx={navigationHeaderStyles.logo}>
          <Typography variant="h6">ContractLens</Typography>
        </Link>
        <Box sx={navigationHeaderStyles.nav}>
          <Link
            to="/"
            sx={{
              ...navigationHeaderStyles.navLink,
              ...( !isComparisonPage ? navigationHeaderStyles.navLinkActive : {}),
            }}
          >
            <Typography variant="body2">Analyze</Typography>
          </Link>
          <Link
            to="/comparison"
            sx={{
              ...navigationHeaderStyles.navLink,
              ...(isComparisonPage ? navigationHeaderStyles.navLinkActive : {}),
            }}
          >
            <Typography variant="body2">Compare</Typography>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
