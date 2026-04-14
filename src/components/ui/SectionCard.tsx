import { Box, Typography, ReactNode } from '@mui/material';
import { sectionCardStyles } from './SectionCard.styles';

interface SectionCardProps {
  title?: string;
  children: ReactNode;
}

export function SectionCard({ title, children }: SectionCardProps): JSX.Element {
  return (
    <Box sx={sectionCardStyles.container}>
      {title && (
        <Typography variant="h6" sx={sectionCardStyles.title}>
          {title}
        </Typography>
      )}
      {children}
    </Box>
  );
}
