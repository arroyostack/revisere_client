import { createTheme } from "@mui/material/styles";

const tahoeGlassMacLightBackgroundCorporateExtreme = "#f0f4f8";
const tahoeGlassMacLightSurfaceCorporateExtreme = "rgba(255, 255, 255, 0.85)";
const tahoeGlassMacSecureNavyBlueExtreme = "#1a365d";
const tahoeGlassMacSecureNavyHighlightExtreme = "#2b6cb0";
const tahoeGlassMacLightBorderCorporateExtreme = "rgba(43, 108, 176, 0.15)";
const tahoeGlassMacLightShadowCorporateExtreme = "0 8px 32px rgba(26, 54, 93, 0.08)";
const tahoeGlassMacLightTextPrimaryCorporateExtreme = "#1a202c";
const tahoeGlassMacLightTextSecondaryCorporateExtreme = "#4a5568";
const tahoeGlassMacLightFontHeadingCorporateExtreme = "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const tahoeGlassMacLightFontCorporateExtreme = "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export const applicationTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: tahoeGlassMacSecureNavyBlueExtreme,
      light: tahoeGlassMacSecureNavyHighlightExtreme,
      contrastText: "#ffffff",
    },
    background: {
      default: tahoeGlassMacLightBackgroundCorporateExtreme,
      paper: tahoeGlassMacLightSurfaceCorporateExtreme,
    },
    text: {
      primary: tahoeGlassMacLightTextPrimaryCorporateExtreme,
      secondary: tahoeGlassMacLightTextSecondaryCorporateExtreme,
    },
    divider: "rgba(26, 54, 93, 0.1)",
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: tahoeGlassMacLightFontCorporateExtreme,
    h1: { fontFamily: tahoeGlassMacLightFontHeadingCorporateExtreme, fontWeight: 700, letterSpacing: "-0.025em" },
    h2: { fontFamily: tahoeGlassMacLightFontHeadingCorporateExtreme, fontWeight: 700, letterSpacing: "-0.02em" },
    h3: { fontFamily: tahoeGlassMacLightFontHeadingCorporateExtreme, fontWeight: 600, letterSpacing: "-0.015em" },
    h4: { fontFamily: tahoeGlassMacLightFontHeadingCorporateExtreme, fontWeight: 600, letterSpacing: "-0.01em" },
    h5: { fontFamily: tahoeGlassMacLightFontHeadingCorporateExtreme, fontWeight: 600 },
    h6: { fontFamily: tahoeGlassMacLightFontHeadingCorporateExtreme, fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600, letterSpacing: "0.02em" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*, *::before, *::after": {
          transition: "none !important",
          animation: "none !important",
        },
        body: {
          backgroundColor: "#f0f4f8",
          backgroundImage: "linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%)",
          backgroundAttachment: "fixed",
          color: tahoeGlassMacLightTextPrimaryCorporateExtreme,
        },
        a: {
          textDecoration: "none",
          fontWeight: 600,
          borderBottom: "2px solid rgba(43, 108, 176, 0.4)",
          color: tahoeGlassMacSecureNavyBlueExtreme,
          "&:hover": {
            color: tahoeGlassMacSecureNavyHighlightExtreme,
            borderBottom: `2px solid ${tahoeGlassMacSecureNavyHighlightExtreme}`,
            textDecoration: "none",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          fontWeight: 600,
          borderBottom: "2px solid rgba(43, 108, 176, 0.4)",
          color: tahoeGlassMacSecureNavyBlueExtreme,
          "&:hover": {
            color: tahoeGlassMacSecureNavyHighlightExtreme,
            borderBottom: `2px solid ${tahoeGlassMacSecureNavyHighlightExtreme}`,
            textDecoration: "none",
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: { disableRipple: true },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "12px 24px",
          border: `1px solid ${tahoeGlassMacLightBorderCorporateExtreme}`,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          transform: "translateZ(0)",
          boxShadow: "0 2px 4px rgba(26, 54, 93, 0.05)",
        },
        contained: {
          backgroundColor: tahoeGlassMacSecureNavyBlueExtreme,
          color: "#ffffff",
          border: "none",
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundColor: tahoeGlassMacLightSurfaceCorporateExtreme,
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          border: `1px solid ${tahoeGlassMacLightBorderCorporateExtreme}`,
          boxShadow: tahoeGlassMacLightShadowCorporateExtreme,
          borderRadius: "16px",
          backgroundImage: "none",
          transform: "translateZ(0)",
          padding: "24px",
        },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundColor: tahoeGlassMacLightSurfaceCorporateExtreme,
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          border: `1px solid ${tahoeGlassMacLightBorderCorporateExtreme}`,
          boxShadow: tahoeGlassMacLightShadowCorporateExtreme,
          borderRadius: "20px",
          backgroundImage: "none",
          transform: "translateZ(0)",
          padding: "24px",
        },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundColor: "rgba(240, 244, 248, 0.85)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          borderBottom: `1px solid ${tahoeGlassMacLightBorderCorporateExtreme}`,
          color: tahoeGlassMacSecureNavyBlueExtreme,
          transform: "translateZ(0)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderRadius: "12px",
            border: `1px solid ${tahoeGlassMacLightBorderCorporateExtreme}`,
            boxShadow: "inset 0 2px 4px rgba(26, 54, 93, 0.02)",
            "& fieldset": { border: "none" },
          },
        },
      },
    },
  },
});
