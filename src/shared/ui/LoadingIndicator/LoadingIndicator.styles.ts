import { SxProps, Theme } from '@mui/material';

export const loadingIndicatorStyles: {
  container: SxProps<Theme>;
  spinnerContainer: SxProps<Theme>;
  circularProgress: SxProps<Theme>;
  innerCircle: SxProps<Theme>;
  progressMessage: SxProps<Theme>;
} = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    padding: 4,
  },
  spinnerContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 72,
  },
  circularProgress: {
    color: 'primary.main',
    position: 'absolute',
  },
  innerCircle: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.2) 0%, rgba(25, 118, 210, 0.4) 100%)',
    animation: 'smoothPulse 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite',
    '@keyframes smoothPulse': {
      '0%, 100%': {
        transform: 'scale(0.8)',
        opacity: 0.4,
      },
      '50%': {
        transform: 'scale(1.1)',
        opacity: 0.7,
      },
    },
  },
  progressMessage: {
    color: 'text.secondary',
    textAlign: 'center',
    minHeight: '1.5em',
    fontWeight: 400,
    fontSize: '0.95rem',
    animation: 'smoothFadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    '@keyframes smoothFadeIn': {
      '0%': { opacity: 0, transform: 'translateY(4px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' },
    },
  },
};
