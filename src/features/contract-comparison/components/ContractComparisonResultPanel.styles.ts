import { SxProps, Theme } from '@mui/material';

export const contractComparisonResultPanelStyles: {
  panelContainer: SxProps<Theme>;
  changeListContainer: SxProps<Theme>;
  listItem: SxProps<Theme>;
  listItemIcon: SxProps<Theme>;
} = {
  panelContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  changeListContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  listItem: {
    px: 0,
  },
  listItemIcon: {
    minWidth: 36,
  },
};
