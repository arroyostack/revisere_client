import { SxProps, Theme } from '@mui/material';

export const providerConfigurationFormStyles: {
  form: SxProps<Theme>;
  field: SxProps<Theme>;
  label: SxProps<Theme>;
  input: SxProps<Theme>;
  select: SxProps<Theme>;
  error: SxProps<Theme>;
  submitButton: SxProps<Theme>;
  submitButtonSaved: SxProps<Theme>;
} = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'text.secondary',
  },
  input: {
    borderRadius: 1,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 1,
    color: 'text.primary',
    '&:focus': {
      borderColor: 'primary.main',
      outline: 'none',
      boxShadow: '0 0 0 1px #fbbf24',
    },
    '&::placeholder': {
      color: 'text.secondary',
    },
  },
  select: {
    borderRadius: 1,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 1,
    color: 'text.primary',
    '&:focus': {
      borderColor: 'primary.main',
      outline: 'none',
      boxShadow: '0 0 0 1px #fbbf24',
    },
  },
  error: {
    fontSize: '0.875rem',
    color: 'error.main',
  },
  submitButton: {
    backgroundColor: 'primary.main',
    color: 'primary.contrastText',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: 'primary.dark',
    },
  },
  submitButtonSaved: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    color: '#10b981',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: 'rgba(16, 185, 129, 0.3)',
    },
  },
};
