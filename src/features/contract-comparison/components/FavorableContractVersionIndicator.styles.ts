import { SxProps, Theme } from '@mui/material';

export const favorableContractVersionIndicatorStyles: {
  indicatorContainer: (accentColor: string) => SxProps<Theme>;
  indicatorHeader: (accentColor: string) => SxProps<Theme>;
  indicatorTitle: (accentColor: string) => SxProps<Theme>;
} = {
  indicatorContainer: (accentColor: string) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    p: 3,
    backgroundColor: `${accentColor}15`,
    border: `1px solid ${accentColor}30`,
    borderRadius: 1,
  }),
  indicatorHeader: (accentColor: string) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    color: accentColor,
  }),
  indicatorTitle: (accentColor: string) => ({
    color: accentColor,
  }),
};
