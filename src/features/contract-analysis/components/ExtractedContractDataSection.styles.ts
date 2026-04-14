import { SxProps, Theme } from '@mui/material';

export const extractedContractDataSectionStyles: {
  sectionContainer: SxProps<Theme>;
  monospaceValue: SxProps<Theme>;
  listItem: SxProps<Theme>;
  partyChipContainer: SxProps<Theme>;
  verticalDetailList: SxProps<Theme>;
  dueDateValue: SxProps<Theme>;
} = {
  sectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  monospaceValue: {
    fontFamily: 'monospace',
  },
  listItem: {
    px: 0,
  },
  partyChipContainer: {
    display: 'flex',
    gap: 1,
    mt: 0.5,
  },
  verticalDetailList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  dueDateValue: {
    fontFamily: 'monospace',
    mt: 0.5,
  },
};
