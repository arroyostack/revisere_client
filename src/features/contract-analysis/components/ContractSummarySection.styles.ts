import { SxProps, Theme } from '@mui/material';

export const contractSummarySectionStyles: {
  sectionContainer: SxProps<Theme>;
  listItem: SxProps<Theme>;
  partyName: SxProps<Theme>;
  monospaceValue: SxProps<Theme>;
} = {
  sectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  listItem: {
    px: 0,
  },
  partyName: {
    fontWeight: 600,
  },
  monospaceValue: {
    fontFamily: 'monospace',
  },
};
