import { SxProps, Theme } from '@mui/material';

export const rootLayoutStyles: {
  container: SxProps<Theme>;
  main: SxProps<Theme>;
} = {
  container: {
    minHeight: '100vh',
    backgroundColor: 'background.default',
  },
  main: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: 4,
  },
};
