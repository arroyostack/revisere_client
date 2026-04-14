import { Box, Typography } from "@mui/material";
import { loadingIndicatorStyles } from "./LoadingIndicator.styles";

interface LoadingIndicatorProps {
  loadingMessage?: string;
}

export function LoadingIndicator({
  loadingMessage,
}: LoadingIndicatorProps): JSX.Element {
  return (
    <Box sx={loadingIndicatorStyles.container}>
      <Box sx={loadingIndicatorStyles.spinner} />
      {loadingMessage && (
        <Typography variant="body1" sx={loadingIndicatorStyles.message}>
          {loadingMessage}
        </Typography>
      )}
    </Box>
  );
}
