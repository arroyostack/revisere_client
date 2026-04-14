import { SxProps, Theme } from '@mui/material';

export const singleContractDropZoneStyles: {
  dropZone: SxProps<Theme>;
  dropZoneDragOver: SxProps<Theme>;
  dropZoneSelected: SxProps<Theme>;
  dropZoneDisabled: SxProps<Theme>;
  content: SxProps<Theme>;
  icon: SxProps<Theme>;
  fileInfo: SxProps<Theme>;
  fileName: SxProps<Theme>;
  fileSize: SxProps<Theme>;
  instruction: SxProps<Theme>;
  instructionSuccess: SxProps<Theme>;
} = {
  dropZone: {
    cursor: 'pointer',
    borderRadius: 2,
    border: '2px dashed',
    borderColor: 'divider',
    padding: 4,
    transition: 'all 0.2s',
    textAlign: 'center',
  },
  dropZoneDragOver: {
    borderColor: 'primary.main',
    backgroundColor: 'rgba(251, 191, 36, 0.05)',
  },
  dropZoneSelected: {
    borderColor: 'success.main',
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
  },
  dropZoneDisabled: {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
  },
  icon: {
    width: 40,
    height: 40,
    color: 'text.secondary',
  },
  fileInfo: {},
  fileName: {
    fontWeight: 500,
    color: 'text.primary',
  },
  fileSize: {
    fontSize: '0.875rem',
    color: 'text.secondary',
  },
  instruction: {
    fontWeight: 500,
    color: 'text.primary',
  },
  instructionSuccess: {
    fontSize: '0.875rem',
    color: 'success.main',
  },
};
