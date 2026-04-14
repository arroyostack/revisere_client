import { SxProps, Theme } from '@mui/material';

export const contractAnalysisResultPanelStyles: {
  panelContainer: SxProps<Theme>;
  tabNavigationContainer: SxProps<Theme>;
  tabs: SxProps<Theme>;
} = {
  panelContainer: {
    width: '100%',
  },
  tabNavigationContainer: {
    borderBottom: 1,
    borderColor: 'divider',
    mb: 3,
  },
  tabs: {
    '& .MuiTab-root': {
      textTransform: 'none',
      fontWeight: 500,
      fontSize: '0.9rem',
    },
  },
};
