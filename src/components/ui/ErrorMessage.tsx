import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { errorMessageStyles } from './ErrorMessage.styles';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps): JSX.Element {
  return (
    <Box sx={errorMessageStyles.container}>
      <Box sx={errorMessageStyles.header}>
        <ErrorOutlineIcon />
        <Typography variant="subtitle1" fontWeight="medium">
          Error
        </Typography>
      </Box>
      <Typography variant="body1" sx={errorMessageStyles.message}>
        {message}
      </Typography>
      {onRetry && (
        <Button
          variant="contained"
          onClick={onRetry}
          sx={errorMessageStyles.retryButton}
        >
          Try Again
        </Button>
      )}
    </Box>
  );
}
