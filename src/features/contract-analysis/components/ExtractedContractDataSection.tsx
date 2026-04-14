import { Box, Typography, List, ListItem, ListItemText, Chip, Grid } from '@mui/material';
import { ExtractedContractData } from '../types/contractAnalysis.types';
import { SectionCard } from '../../../shared/ui/SectionCard/SectionCard';

interface ExtractedDataSectionProps {
  extractedData: ExtractedContractData;
}

export function ExtractedDataSection({ extractedData }: ExtractedDataSectionProps): JSX.Element {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <SectionCard sectionTitle="Contract Title">
            <Typography variant="body1" color="text.primary" sx={{ fontFamily: 'monospace' }}>
              {extractedData.contractTitle}
            </Typography>
          </SectionCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <SectionCard sectionTitle="Contract Type">
            <Typography variant="body1" color="text.primary">
              {extractedData.contractType}
            </Typography>
          </SectionCard>
        </Grid>
      </Grid>

      <SectionCard sectionTitle="Parties">
        <List dense>
          {extractedData.parties.map((party, index) => (
            <ListItem key={index} sx={{ px: 0 }}>
              <ListItemText
                primary={
                  <Typography variant="body1" color="text.primary" fontWeight={600}>
                    {party.partyName}
                  </Typography>
                }
                secondary={
                  <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                    <Chip label={party.partyRole} size="small" color="primary" variant="outlined" />
                    {party.jurisdiction && (
                      <Chip label={party.jurisdiction} size="small" variant="outlined" />
                    )}
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </SectionCard>

      <Grid container spacing={2}>
        {extractedData.effectiveDate && (
          <Grid item xs={12} sm={6}>
            <SectionCard sectionTitle="Effective Date">
              <Typography variant="body1" color="text.primary" sx={{ fontFamily: 'monospace' }}>
                {extractedData.effectiveDate}
              </Typography>
            </SectionCard>
          </Grid>
        )}
        {extractedData.expirationDate && (
          <Grid item xs={12} sm={6}>
            <SectionCard sectionTitle="Expiration Date">
              <Typography variant="body1" color="text.primary" sx={{ fontFamily: 'monospace' }}>
                {extractedData.expirationDate}
              </Typography>
            </SectionCard>
          </Grid>
        )}
        {extractedData.governingLaw && (
          <Grid item xs={12} sm={6}>
            <SectionCard sectionTitle="Governing Law">
              <Typography variant="body1" color="text.primary">
                {extractedData.governingLaw}
              </Typography>
            </SectionCard>
          </Grid>
        )}
        {extractedData.disputeResolutionMethod && (
          <Grid item xs={12} sm={6}>
            <SectionCard sectionTitle="Dispute Resolution">
              <Typography variant="body1" color="text.primary">
                {extractedData.disputeResolutionMethod}
              </Typography>
            </SectionCard>
          </Grid>
        )}
      </Grid>

      {extractedData.paymentTerms && (
        <SectionCard sectionTitle="Payment Terms">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {extractedData.paymentTerms.paymentAmount && (
              <Typography variant="body1" color="text.primary">
                <strong>Amount:</strong> {extractedData.paymentTerms.paymentAmount}
                {extractedData.paymentTerms.paymentCurrency && ` ${extractedData.paymentTerms.paymentCurrency}`}
              </Typography>
            )}
            {extractedData.paymentTerms.paymentScheduleDescription && (
              <Typography variant="body2" color="text.secondary">
                {extractedData.paymentTerms.paymentScheduleDescription}
              </Typography>
            )}
            {extractedData.paymentTerms.latePenaltyDescription && (
              <Typography variant="body2" color="warning.main">
                {extractedData.paymentTerms.latePenaltyDescription}
              </Typography>
            )}
          </Box>
        </SectionCard>
      )}

      <SectionCard sectionTitle="Termination Conditions">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {extractedData.terminationConditions.noticePeriodInDays && (
            <Typography variant="body2" color="text.secondary">
              Notice period: {extractedData.terminationConditions.noticePeriodInDays} days
            </Typography>
          )}
          {extractedData.terminationConditions.hasAutomaticRenewal && (
            <Chip label="Automatic Renewal" size="small" color="warning" />
          )}
          {extractedData.terminationConditions.automaticRenewalDescription && (
            <Typography variant="body2" color="text.secondary">
              {extractedData.terminationConditions.automaticRenewalDescription}
            </Typography>
          )}
          <List dense>
            {extractedData.terminationConditions.terminationConditions.map((condition, index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <ListItemText
                  primary={
                    <Typography variant="body2" color="text.primary">
                      {condition}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </SectionCard>

      <SectionCard sectionTitle="Key Obligations">
        <List dense>
          {extractedData.keyObligations.map((obligation, index) => (
            <ListItem key={index} sx={{ px: 0 }}>
              <ListItemText
                primary={
                  <Typography variant="body1" color="text.primary" fontWeight={600}>
                    {obligation.obligatedPartyName}
                  </Typography>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {obligation.obligationDescription}
                    </Typography>
                    {obligation.dueDateOrCondition && (
                      <Typography variant="body2" color="primary.main" sx={{ fontFamily: 'monospace', mt: 0.5 }}>
                        {obligation.dueDateOrCondition}
                      </Typography>
                    )}
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </SectionCard>

      <Grid container spacing={2}>
        {extractedData.confidentialityClauseExists && (
          <Grid item xs={12} sm={4}>
            <Chip label="Confidentiality Clause" color="success" />
          </Grid>
        )}
        {extractedData.nonCompeteClauseExists && (
          <Grid item xs={12} sm={4}>
            <Chip label="Non-Compete Clause" color="success" />
          </Grid>
        )}
        {extractedData.intellectualPropertyClauseExists && (
          <Grid item xs={12} sm={4}>
            <Chip label="IP Clause" color="success" />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}