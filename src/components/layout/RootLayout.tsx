import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { NavigationHeader } from './NavigationHeader';
import { rootLayoutStyles } from './RootLayout.styles';

interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <Box sx={rootLayoutStyles.container}>
      <NavigationHeader />
      <Box component="main" sx={rootLayoutStyles.main}>
        {children}
      </Box>
    </Box>
  );
}
