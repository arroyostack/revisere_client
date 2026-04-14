import { SxProps, Theme } from '@mui/material';

export const contractRiskAnalysisSectionStyles: {
  sectionContainer: SxProps<Theme>;
  riskLevelContainer: SxProps<Theme>;
  riskFlagListItem: SxProps<Theme>;
  riskFlagHeader: SxProps<Theme>;
  riskFlagTitle: SxProps<Theme>;
  riskFlagClauseDescription: SxProps<Theme>;
  recommendedActionContainer: SxProps<Theme>;
} = {
  sectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  riskLevelContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  riskFlagListItem: {
    px: 0,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  riskFlagHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    width: '100%',
    mb: 1,
  },
  riskFlagTitle: {
    flex: 1,
  },
  riskFlagClauseDescription: {
    mb: 1,
  },
  recommendedActionContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    mt: 0.5,
  },
};
