import { Chip } from '@mui/material';
import { ContractRiskSeverity } from '../types/contractAnalysis.types';

interface RiskSeverityBadgeProps {
  severity: ContractRiskSeverity;
}

const severityConfig: Record<ContractRiskSeverity, { label: string; color: 'error' | 'warning' | 'success' }> = {
  high: { label: 'HIGH', color: 'error' },
  medium: { label: 'MEDIUM', color: 'warning' },
  low: { label: 'LOW', color: 'success' },
};

export function RiskSeverityBadge({ severity }: RiskSeverityBadgeProps): JSX.Element {
  const config = severityConfig[severity];

  return (
    <Chip
      label={config.label}
      color={config.color}
      size="small"
      sx={{
        fontWeight: 600,
        fontSize: '0.7rem',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
      }}
    />
  );
}