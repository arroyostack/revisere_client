import { Box, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BalanceIcon from '@mui/icons-material/Balance';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { FavorableVersion } from '../../../types/contract-analysis-api.types';

interface FavorabilityIndicatorProps {
  favorableVersion: FavorableVersion;
  explanation: string;
}

const versionConfig: Record<FavorableVersion, { label: string; icon: React.ReactNode; color: string }> = {
  first_version: {
    label: 'First Version (Original)',
    icon: <ArrowBackIcon />,
    color: '#3b82f6',
  },
  second_version: {
    label: 'Second Version (Revised)',
    icon: <ArrowForwardIcon />,
    color: '#f97316',
  },
  roughly_equal: {
    label: 'Equally Favorable',
    icon: <BalanceIcon />,
    color: '#22c55e',
  },
  depends_on_your_role: {
    label: 'Unclear',
    icon: <HelpOutlineIcon />,
    color: '#64748b',
  },
};

export function FavorabilityIndicator({ favorableVersion, explanation }: FavorabilityIndicatorProps): JSX.Element {
  const config = versionConfig[favorableVersion];

  return (
    <Box
      sx={{
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        backgroundColor: 'background.paper',
        textAlign: 'center',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
        <Box sx={{ color: config.color }}>
          {config.icon}
        </Box>
        <Typography variant="subtitle1" fontWeight={600} color="text.primary">
          {config.label}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" textAlign="center">
        {explanation}
      </Typography>
    </Box>
  );
}

export { FavorabilityIndicator as FavorableContractVersionIndicator };
