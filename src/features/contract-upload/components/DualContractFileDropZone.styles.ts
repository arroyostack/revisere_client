import { SxProps, Theme } from "@mui/material";

export const dualContractFileDropZoneStyles: {
  container: SxProps<Theme>;
  dropZone: SxProps<Theme>;
  dropZoneDragOver: SxProps<Theme>;
  dropZoneSelected: SxProps<Theme>;
  dropZoneDisabled: SxProps<Theme>;
  label: SxProps<Theme>;
  content: SxProps<Theme>;
  icon: SxProps<Theme>;
  fileName: SxProps<Theme>;
  fileSize: SxProps<Theme>;
  instruction: SxProps<Theme>;
} = {
  container: {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
    gap: 3,
  },
  dropZone: {
    cursor: "pointer",
    borderRadius: 2,
    border: "2px dashed",
    borderColor: "divider",
    padding: 3,
    transition: "all 0.2s",
    textAlign: "center",
    minHeight: 150,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropZoneDragOver: {
    borderColor: "primary.main",
    backgroundColor: "rgba(251, 191, 36, 0.05)",
  },
  dropZoneSelected: {
    borderColor: "success.main",
    backgroundColor: "rgba(16, 185, 129, 0.05)",
  },
  dropZoneDisabled: {
    cursor: "not-allowed",
    opacity: 0.5,
  },
  label: {
    fontWeight: 500,
    color: "text.secondary",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 1.5,
  },
  icon: {
    width: 32,
    height: 32,
    color: "text.secondary",
  },
  fileName: {
    fontWeight: 500,
    fontSize: "0.875rem",
    color: "text.primary",
  },
  fileSize: {
    fontSize: "0.75rem",
    color: "text.secondary",
  },
  instruction: {
    fontSize: "0.875rem",
    color: "text.secondary",
  },
};
