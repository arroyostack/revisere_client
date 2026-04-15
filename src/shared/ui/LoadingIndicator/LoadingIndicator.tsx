import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import {
  RotatingProgressMessage,
  PROGRESS_MESSAGE_CYCLE_INTERVAL,
} from './progressMessages';
import { loadingIndicatorStyles } from './LoadingIndicator.styles';

interface LoadingIndicatorProps {
  progressMessageRotator: RotatingProgressMessage;
}

export function LoadingIndicator({
  progressMessageRotator,
}: LoadingIndicatorProps): JSX.Element {
  const [currentMessage, setCurrentMessage] = useState<string>(
    progressMessageRotator.getCurrentMessage(),
  );

  useEffect(() => {
    progressMessageRotator.resetToBeginning();
    setCurrentMessage(progressMessageRotator.getCurrentMessage());

    const messageRotationInterval = setInterval(() => {
      progressMessageRotator.advanceToNextMessage();
      setCurrentMessage(progressMessageRotator.getCurrentMessage());
    }, PROGRESS_MESSAGE_CYCLE_INTERVAL);

    return () => {
      clearInterval(messageRotationInterval);
    };
  }, [progressMessageRotator]);

  return (
    <Box sx={loadingIndicatorStyles.container}>
      <Box sx={loadingIndicatorStyles.spinnerContainer}>
        <CircularProgress
          size={48}
          thickness={3}
          sx={loadingIndicatorStyles.circularProgress}
        />
        <Box sx={loadingIndicatorStyles.innerCircle} />
      </Box>
      <Typography
        variant="body1"
        component="p"
        sx={loadingIndicatorStyles.progressMessage}
      >
        {currentMessage}
      </Typography>
    </Box>
  );
}
