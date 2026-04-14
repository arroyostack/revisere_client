import { Box, Typography, List, ListItem, ListItemText, Chip, Grid } from '@mui/material';
import { ContractRiskAnalysisResult } from '../../types/contract-analysis-api.types';
import { SectionCard } from '../ui/SectionCard';
import { RiskSeverityBadge } from './RiskSeverityBadge';

interface RiskAnalysisSectionProps {
  riskAnalysis: ContractRiskAnalysisResult;
}

export function RiskAnalysisSection({ riskAnalysis }: RiskAnalysisSectionProps): JSX.Element {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <SectionCard title="Overall Risk Level">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <RiskSeverityBadge severity={riskAnalysis.overallRiskLevel} />
            </Box>
          </SectionCard>
        </Grid>
        <Grid item xs={12} sm={4}>
          <SectionCard title="High Severity">
            <Typography variant="h4" color="error.main" fontWeight={700}>
              {riskAnalysis.totalHighSeverityRisks}
            </Typography>
          </SectionCard>
        </Grid>
        <Grid item xs={12} sm={4}>
          <SectionCard title="Medium Severity">
            <Typography variant="h4" color="warning.main" fontWeight={700}>
              {riskAnalysis.totalMediumSeverityRisks}
            </Typography>
          </SectionCard>
        </Grid>
      </Grid>

      <SectionCard title="Risk Analysis Summary">
        <Typography variant="body1" color="text.primary">
          {riskAnalysis.riskAnalysisSummary}
        </Typography>
      </SectionCard>

      <SectionCard title={`Risk Flags (${riskAnalysis.riskFlags.length})`}>
        {riskAnalysis.riskFlags.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No risk flags identified.
          </Typography>
        ) : (
          <List dense>
            {riskAnalysis.riskFlags.map((riskFlag, index) => (
              <ListItem
                key={index}
                sx={{
                  px: 0,
                  borderBottom: index < riskAnalysis.riskFlags.length - 1 ? '1px solid' : 'none',
                  borderColor: 'divider',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%', mb: 1 }}>
                  <Typography variant="subtitle1" color="text.primary" fontWeight={600} sx={{ flex: 1 }}>
                    {riskFlag.riskTitle}
                  </Typography>
                  <RiskSeverityBadge severity={riskFlag.riskSeverity} />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>Clause:</strong> {riskFlag.affectedClauseDescription}
                </Typography>
                <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
                  {riskFlag.plainEnglishExplanation}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <Chip label="Recommended Action" size="small" color="primary" variant="outlined" />
                  <Typography variant="body2" color="warning.main">
                    {riskFlag.recommendedAction}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        )}
      </SectionCard>
    </Box>
  );
}