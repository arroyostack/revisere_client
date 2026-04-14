import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { ContractSummaryResult } from '../types/contractAnalysis.types';
import { SectionCard } from '../../../shared/ui/SectionCard/SectionCard';

interface ContractSummarySectionProps {
  summary: ContractSummaryResult;
}

export function ContractSummarySection({ summary }: ContractSummarySectionProps): JSX.Element {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <SectionCard sectionTitle="One Sentence Description">
        <Typography variant="body1" color="text.primary">
          {summary.oneSentenceDescription}
        </Typography>
      </SectionCard>

      <SectionCard sectionTitle="What This Contract Does">
        <Typography variant="body1" color="text.primary">
          {summary.whatThisContractDoes}
        </Typography>
      </SectionCard>

      <SectionCard sectionTitle="Who Is Involved">
        <Typography variant="body1" color="text.primary">
          {summary.whoIsInvolved}
        </Typography>
      </SectionCard>

      <SectionCard sectionTitle="Main Obligations">
        <List dense>
          {summary.mainObligationsForEachParty.map((party, index) => (
            <ListItem key={index} sx={{ px: 0 }}>
              <ListItemText
                primary={
                  <Typography variant="subtitle2" color="primary.main" fontWeight={600}>
                    {party.partyName}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    {party.obligationsSummary}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </SectionCard>

      {summary.importantDatesAndDeadlines.length > 0 && (
        <SectionCard sectionTitle="Important Dates & Deadlines">
          <List dense>
            {summary.importantDatesAndDeadlines.map((date, index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <ListItemText
                  primary={
                    <Typography variant="body2" color="text.primary">
                      {date.dateDescription}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="primary.main" sx={{ fontFamily: 'monospace' }}>
                    {date.dateValue}
                  </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </SectionCard>
      )}

      <SectionCard sectionTitle="What Happens If Things Go Wrong">
        <Typography variant="body1" color="text.primary">
          {summary.whatHappensIfThingsGoWrong}
        </Typography>
      </SectionCard>

      <SectionCard sectionTitle="How To Get Out">
        <Typography variant="body1" color="text.primary">
          {summary.howToGetOut}
        </Typography>
      </SectionCard>

      <SectionCard sectionTitle="Three Things To Know Before Signing">
        <List dense>
          {summary.threeThingsToKnowBeforeSigning.map((item, index) => (
            <ListItem key={index} sx={{ px: 0 }}>
              <ListItemText
                primary={
                  <Typography variant="body2" color="text.primary">
                    {index + 1}. {item}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </SectionCard>
    </Box>
  );
}