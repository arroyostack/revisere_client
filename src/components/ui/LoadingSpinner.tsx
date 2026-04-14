import { Box, Typography } from '@mui/material';
import { loadingSpinnerStyles } from './LoadingSpinner.styles';

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message }: LoadingSpinnerProps): JSX.Element {
  return (
    <Box sx={loadingSpinnerStyles.container}>
      <Box sx={loadingSpinnerStyles.spinner} />
      {message && (
        <Typography variant="body1" sx={loadingSpinnerStyles.message}>
          {message}
        </Typography>
      )}
    </Box>
  );
}
