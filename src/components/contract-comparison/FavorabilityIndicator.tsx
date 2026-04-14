import { Box, Typography, Chip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BalanceIcon from '@mui/icons-material/Balance';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { FavorableVersion } from '../../types/contract-analysis-api.types';

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
    label: 'Roughly Equal',
    icon: <BalanceIcon />,
    color: '#64748b',
  },
  depends_on_your_role: {
    label: 'Depends on Your Role',
    icon: <HelpOutlineIcon />,
    color: '#64748b',
  },
};

export function FavorabilityIndicator({ favorableVersion, explanation }: FavorabilityIndicatorProps): JSX.Element {
  const config = versionConfig[favorableVersion];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        p: 3,
        backgroundColor: `${config.color}15`,
        border: `1px solid ${config.color}30`,
        borderRadius: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: config.color }}>
        {config.icon}
        <Typography variant="h6" fontWeight={600} sx={{ color: config.color }}>
          {config.label}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" textAlign="center">
        {explanation}
      </Typography>
    </Box>
  );
}