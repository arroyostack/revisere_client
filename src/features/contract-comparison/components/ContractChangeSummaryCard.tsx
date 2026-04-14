import { Box, Typography, Chip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RemoveIcon from '@mui/icons-material/Remove';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { ContractChangeItem, ChangeDirection, ChangeSignificance } from '../../../types/contract-analysis-api.types';

interface ChangeItemCardProps {
  change: ContractChangeItem;
}

const directionConfig: Record<ChangeDirection, { label: string; icon: React.ReactNode; color: string }> = {
  favors_first_party: {
    label: 'Favors First Party',
    icon: <ArrowBackIcon fontSize="small" />,
    color: '#3b82f6',
  },
  favors_second_party: {
    label: 'Favors Second Party',
    icon: <ArrowForwardIcon fontSize="small" />,
    color: '#f97316',
  },
  neutral: {
    label: 'Neutral',
    icon: <RemoveIcon fontSize="small" />,
    color: '#64748b',
  },
  unclear: {
    label: 'Unclear',
    icon: <HelpOutlineIcon fontSize="small" />,
    color: '#64748b',
  },
};

const significanceConfig: Record<ChangeSignificance, { label: string; color: 'error' | 'warning' | 'success' }> = {
  significant: { label: 'Significant', color: 'error' },
  moderate: { label: 'Moderate', color: 'warning' },
  minor: { label: 'Minor', color: 'success' },
};

export function ChangeItemCard({ change }: ChangeItemCardProps): JSX.Element {
  const direction = directionConfig[change.changeDirection];
  const significance = significanceConfig[change.significanceLevel];

  return (
    <Box
      sx={{
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        backgroundColor: 'background.paper',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="subtitle1" fontWeight={600} color="text.primary">
          {change.changeTitle}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip label={significance.label} size="small" color={significance.color} />
          <Chip
            icon={direction.icon as React.ReactElement}
            label={direction.label}
            size="small"
            variant="outlined"
            sx={{ borderColor: direction.color, color: direction.color }}
          />
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {change.whatChangedDescription}
      </Typography>
      <Typography variant="body2" color="text.primary">
        {change.plainEnglishExplanation}
      </Typography>
    </Box>
  );
}

export { ChangeItemCard as ContractChangeSummaryCard };