import { SxProps, Theme } from "@mui/material";

export const errorDisplayStyles: {
  container: SxProps<Theme>;
  header: SxProps<Theme>;
  message: SxProps<Theme>;
  retryButton: SxProps<Theme>;
} = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    padding: 3,
    borderRadius: 2,
    border: "1px solid",
    borderColor: "error.main",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    color: "error.main",
  },
  message: {
    textAlign: "center",
    color: "text.primary",
  },
  retryButton: {
    backgroundColor: "rgba(239, 68, 68, 0.2)",
    color: "error.light",
    "&:hover": {
      backgroundColor: "rgba(239, 68, 68, 0.3)",
    },
  },
};
