import { SxProps, Theme } from "@mui/material";

export const applicationShellLayoutStyles: {
  pageContainer: SxProps<Theme>;
  pageContent: SxProps<Theme>;
} = {
  pageContainer: {
    minHeight: "100vh",
    backgroundColor: "background.default",
  },
  pageContent: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: 4,
  },
};
