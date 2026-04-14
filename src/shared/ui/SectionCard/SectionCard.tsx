import { ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import { sectionCardStyles } from "./SectionCard.styles";

interface SectionCardProps {
  sectionTitle?: string;
  children: ReactNode;
}

export function SectionCard({
  sectionTitle,
  children,
}: SectionCardProps): JSX.Element {
  return (
    <Box sx={sectionCardStyles.cardContainer}>
      {sectionTitle && (
        <Typography variant="h6" sx={sectionCardStyles.cardTitle}>
          {sectionTitle}
        </Typography>
      )}
      {children}
    </Box>
  );
}
