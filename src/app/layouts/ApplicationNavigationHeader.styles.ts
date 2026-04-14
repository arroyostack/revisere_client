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
    fontWeight: 600,
    fontSize: "0.875rem",
    color: "text.secondary",
    paddingBottom: "4px",
    borderBottom: "2px solid transparent",
    transition: "none !important",
    "&:hover": {
      color: "primary.main",
      borderBottom: "2px solid rgba(43, 108, 176, 0.4)",
    },
  },
  activeNavigationLink: {
    color: "primary.main",
    borderBottom: "2px solid #1a365d",
  },
};
