import { Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { errorDisplayStyles } from "./ErrorDisplay.styles";

interface ErrorDisplayProps {
  errorMessage: string;
  onRetryRequested?: () => void;
}

export function ErrorDisplay({
  errorMessage,
  onRetryRequested,
}: ErrorDisplayProps): JSX.Element {
  return (
    <Box sx={errorDisplayStyles.container}>
      <Box sx={errorDisplayStyles.header}>
        <ErrorOutlineIcon />
        <Typography variant="subtitle1" fontWeight="medium">
          Error
        </Typography>
      </Box>
      <Typography variant="body1" sx={errorDisplayStyles.message}>
        {errorMessage}
      </Typography>
      {onRetryRequested && (
        <Button
          variant="contained"
          onClick={onRetryRequested}
          sx={errorDisplayStyles.retryButton}
        >
          Try Again
        </Button>
      )}
    </Box>
  );
}
