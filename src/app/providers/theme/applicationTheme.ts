import { createTheme } from "@mui/material/styles";

export const applicationTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fbbf24",
      dark: "#d97706",
      contrastText: "#0f172a",
    },
    secondary: {
      main: "#64748b",
    },
    background: {
      default: "#020617",
      paper: "#0f172a",
    },
    error: {
      main: "#ef4444",
    },
    warning: {
      main: "#fbbf24",
    },
    success: {
      main: "#10b981",
    },
    text: {
      primary: "#f1f5f9",
      secondary: "#94a3b8",
    },
    divider: "#334155",
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    h1: {
      fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});
