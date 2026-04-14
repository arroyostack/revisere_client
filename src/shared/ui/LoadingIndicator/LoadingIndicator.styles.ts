import { SxProps, Theme } from "@mui/material";

export const loadingIndicatorStyles: {
  container: SxProps<Theme>;
  spinner: SxProps<Theme>;
  message: SxProps<Theme>;
} = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    padding: 4,
  },
  spinner: {
    width: 40,
    height: 40,
    borderWidth: 4,
    borderColor: "divider",
    borderTopColor: "primary.main",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    "@keyframes spin": {
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(360deg)" },
    },
  },
  message: {
    color: "text.secondary",
    animation: "pulse 2s ease-in-out infinite",
    "@keyframes pulse": {
      "0%, 100%": { opacity: 1 },
      "50%": { opacity: 0.5 },
    },
  },
};
