import { Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";

export const applicationNavigationHeaderStyles: {
  headerBar: SystemStyleObject<Theme>;
  toolbarLayout: SystemStyleObject<Theme>;
  applicationBrandMark: SystemStyleObject<Theme>;
  navigationLinksContainer: SystemStyleObject<Theme>;
  navigationLink: SystemStyleObject<Theme>;
  activeNavigationLink: SystemStyleObject<Theme>;
} = {
  headerBar: {
    borderBottom: "1px solid",
    borderColor: "divider",
    backgroundColor: "background.paper",
  },
  toolbarLayout: {
    justifyContent: "space-between",
  },
  applicationBrandMark: {
    fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
    fontWeight: 700,
    fontSize: "1.25rem",
    color: "text.primary",
    textDecoration: "none",
    transition: "color 0.2s",
    "&:hover": {
      color: "primary.main",
    },
  },
  navigationLinksContainer: {
    display: "flex",
    gap: 3,
  },
  navigationLink: {
    textDecoration: "none",
    fontWeight: 500,
    fontSize: "0.875rem",
    color: "text.secondary",
    transition: "color 0.2s",
    "&:hover": {
      color: "primary.main",
    },
  },
  activeNavigationLink: {
    color: "primary.main",
  },
};
