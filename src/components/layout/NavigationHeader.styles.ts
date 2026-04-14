import { SxProps, Theme } from '@mui/material';

export const navigationHeaderStyles: {
  header: SxProps<Theme>;
  logo: SxProps<Theme>;
  nav: SxProps<Theme>;
  navLink: SxProps<Theme>;
  navLinkActive: SxProps<Theme>;
} = {
  header: {
    borderBottom: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
  },
  logo: {
    fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
    fontWeight: 700,
    fontSize: '1.25rem',
    color: 'text.primary',
    textDecoration: 'none',
    transition: 'color 0.2s',
    '&:hover': {
      color: 'primary.main',
    },
  },
  nav: {
    display: 'flex',
    gap: 3,
  },
  navLink: {
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '0.875rem',
    color: 'text.secondary',
    transition: 'color 0.2s',
    '&:hover': {
      color: 'primary.main',
    },
  },
  navLinkActive: {
    color: 'primary.main',
  },
};
