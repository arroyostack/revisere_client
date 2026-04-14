import { SxProps, Theme } from "@mui/material";

export const sectionCardStyles: {
  cardContainer: SxProps<Theme>;
  cardTitle: SxProps<Theme>;
} = {
  cardContainer: {
    padding: 3,
    borderRadius: 2,
    border: "1px solid",
    borderColor: "divider",
    backgroundColor: "background.paper",
  },
  cardTitle: {
    marginBottom: 2,
    fontWeight: 600,
    fontSize: "1.125rem",
    color: "text.primary",
  },
};
