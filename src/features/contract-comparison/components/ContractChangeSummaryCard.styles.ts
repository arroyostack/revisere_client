import { SxProps, Theme } from '@mui/material';

export const contractChangeSummaryCardStyles: {
  cardContainer: SxProps<Theme>;
  cardHeader: SxProps<Theme>;
  chipContainer: SxProps<Theme>;
  directionChip: (accentColor: string) => SxProps<Theme>;
  descriptionText: SxProps<Theme>;
} = {
  cardContainer: {
    p: 2,
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 1,
    backgroundColor: 'background.paper',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 1,
  },
  chipContainer: {
    display: 'flex',
    gap: 1,
  },
  directionChip: (accentColor: string) => ({
    borderColor: accentColor,
    color: accentColor,
  }),
  descriptionText: {
    mb: 1,
  },
};
