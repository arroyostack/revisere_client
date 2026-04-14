import { Box, Typography, List, ListItem, ListItemText, Collapse, ListItemIcon } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';
import { ContractComparisonResult } from '../../types/contract-analysis-api.types';
import { SectionCard } from '../ui/SectionCard';
import { ChangeItemCard } from './ChangeItemCard';
import { FavorabilityIndicator } from './FavorabilityIndicator';

interface ComparisonResultPanelProps {
  result: ContractComparisonResult;
}

function ChangeItemSortOrder(a: { significanceLevel: string }): number {
  const order = { significant: 0, moderate: 1, minor: 2 };
  return order[a.significanceLevel as keyof typeof order] ?? 3;
}

export function ComparisonResultPanel({ result }: ComparisonResultPanelProps): JSX.Element {
  const [addedOpen, setAddedOpen] = useState(false);
  const [removedOpen, setRemovedOpen] = useState(false);

  const sortedChanges = [...result.identifiedChanges].sort((a, b) => ChangeItemSortOrder(a) - ChangeItemSortOrder(b));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <SectionCard title="Overall Assessment">
        <Typography variant="body1" color="text.primary">
          {result.overallAssessment}
        </Typography>
      </SectionCard>

      <FavorabilityIndicator
        favorableVersion={result.whichVersionIsFavorable}
        explanation={result.favorabilityExplanation}
      />

      <SectionCard title={`Identified Changes (${result.totalChangesDetected})`}>
        {sortedChanges.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No changes detected between the two contracts.
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {sortedChanges.map((change, index) => (
              <ChangeItemCard key={index} change={change} />
            ))}
          </Box>
        )}
      </SectionCard>

      {result.clausesAddedInSecondContract.length > 0 && (
        <SectionCard
          title={`Clauses Added in Second Contract (${result.clausesAddedInSecondContract.length})`}
        >
          <List dense>
            {result.clausesAddedInSecondContract.map((clause, index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <AddIcon color="success" fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" color="text.primary">
                      {clause}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </SectionCard>
      )}

      {result.clausesRemovedFromFirstContract.length > 0 && (
        <SectionCard title={`Clauses Removed from First Contract (${result.clausesRemovedFromFirstContract.length})`}>
          <List dense>
            {result.clausesRemovedFromFirstContract.map((clause, index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <RemoveIcon color="error" fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" color="text.primary">
                      {clause}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </SectionCard>
      )}

      <SectionCard title="Recommendation Before Signing">
        <Typography variant="body1" color="text.primary">
          {result.recommendationBeforeSigning}
        </Typography>
      </SectionCard>
    </Box>
  );
}