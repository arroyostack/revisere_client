import { SxProps, Theme } from '@mui/material';

export const sectionCardStyles: {
  container: SxProps<Theme>;
  title: SxProps<Theme>;
} = {
  container: {
    padding: 3,
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
  },
  title: {
    marginBottom: 2,
    fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
    fontWeight: 600,
    fontSize: '1.125rem',
    color: 'text.primary',
  },
};
