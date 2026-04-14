import { Box } from '@mui/material';
import { Outlet } from '@tanstack/react-router';
import { NavigationHeader } from './NavigationHeader';
import { rootLayoutStyles } from './RootLayout.styles';

export function RootLayout(): JSX.Element {
  return (
    <Box sx={rootLayoutStyles.container}>
      <NavigationHeader />
      <Box component="main" sx={rootLayoutStyles.main}>
        <Outlet />
      </Box>
    </Box>
  );
}
