import { SxProps, Theme } from '@mui/material';

export const contractComparisonPageStyles: {
  pageContentContainer: SxProps<Theme>;
  heroSection: SxProps<Theme>;
  heroTitle: SxProps<Theme>;
  uploadSectionContent: SxProps<Theme>;
  submitButton: SxProps<Theme>;
} = {
  pageContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  heroSection: {},
  heroTitle: {
  },
  uploadSectionContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  submitButton: {
    backgroundColor: 'primary.main',
    color: 'primary.contrastText',
    '&:hover': {
      backgroundColor: 'primary.dark',
    },
    '&:disabled': {
      backgroundColor: 'rgba(255,255,255,0.1)',
    },
  },
};
