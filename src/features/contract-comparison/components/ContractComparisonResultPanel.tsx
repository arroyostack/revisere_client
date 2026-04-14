import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ContractComparisonResult } from "../types/contractComparison.types";
import { SectionCard } from "../../../shared/ui/SectionCard/SectionCard";
import { ContractChangeSummaryCard } from "./ContractChangeSummaryCard";
import { contractComparisonResultPanelStyles } from "./ContractComparisonResultPanel.styles";
import { FavorableContractVersionIndicator } from "./FavorableContractVersionIndicator";

interface ContractComparisonResultPanelProps {
  contractComparisonResult: ContractComparisonResult;
}

function getContractChangeSortOrder(contractChangeItem: {
  significanceLevel: string;
}): number {
  const contractChangePriority = { significant: 0, moderate: 1, minor: 2 };

  return (
    contractChangePriority[
      contractChangeItem.significanceLevel as keyof typeof contractChangePriority
    ] ?? 3
  );
}

export function ContractComparisonResultPanel({
  contractComparisonResult,
}: ContractComparisonResultPanelProps): JSX.Element {
  const sortedContractChanges = [
    ...contractComparisonResult.identifiedChanges,
  ].sort(
    (firstContractChange, secondContractChange) =>
      getContractChangeSortOrder(firstContractChange) -
      getContractChangeSortOrder(secondContractChange),
  );

  return (
    <Box sx={contractComparisonResultPanelStyles.panelContainer}>
      <SectionCard sectionTitle="Overall Assessment">
        <Typography variant="body1" color="text.primary">
          {contractComparisonResult.overallAssessment}
        </Typography>
      </SectionCard>

      <FavorableContractVersionIndicator
        favorableVersion={
          contractComparisonResult.whichVersionIsFavorable
        }
        explanation={
          contractComparisonResult.favorabilityExplanation
        }
      />

      <SectionCard
        sectionTitle={`Identified Changes (${contractComparisonResult.totalChangesDetected})`}
      >
        {sortedContractChanges.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No changes detected between the two contracts.
          </Typography>
        ) : (
          <Box sx={contractComparisonResultPanelStyles.changeListContainer}>
            {sortedContractChanges.map(
              (contractChangeItem, contractChangeIndex) => (
                <ContractChangeSummaryCard
                  key={contractChangeIndex}
                  change={contractChangeItem}
                />
              ),
            )}
          </Box>
        )}
      </SectionCard>

      {contractComparisonResult.clausesAddedInSecondContract.length > 0 && (
        <SectionCard
          sectionTitle={`Clauses Added in Second Contract (${contractComparisonResult.clausesAddedInSecondContract.length})`}
        >
          <List dense>
            {contractComparisonResult.clausesAddedInSecondContract.map(
              (addedClause, clauseIndex) => (
                <ListItem
                  key={clauseIndex}
                  sx={contractComparisonResultPanelStyles.listItem}
                >
                  <ListItemIcon
                    sx={contractComparisonResultPanelStyles.listItemIcon}
                  >
                    <AddIcon color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2" color="text.primary">
                        {addedClause}
                      </Typography>
                    }
                  />
                </ListItem>
              ),
            )}
          </List>
        </SectionCard>
      )}

      {contractComparisonResult.clausesRemovedFromFirstContract.length > 0 && (
        <SectionCard
          sectionTitle={`Clauses Removed from First Contract (${contractComparisonResult.clausesRemovedFromFirstContract.length})`}
        >
          <List dense>
            {contractComparisonResult.clausesRemovedFromFirstContract.map(
              (removedClause, clauseIndex) => (
                <ListItem
                  key={clauseIndex}
                  sx={contractComparisonResultPanelStyles.listItem}
                >
                  <ListItemIcon
                    sx={contractComparisonResultPanelStyles.listItemIcon}
                  >
                    <RemoveIcon color="error" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2" color="text.primary">
                        {removedClause}
                      </Typography>
                    }
                  />
                </ListItem>
              ),
            )}
          </List>
        </SectionCard>
      )}

      <SectionCard sectionTitle="Recommendation Before Signing">
        <Typography variant="body1" color="text.primary">
          {contractComparisonResult.recommendationBeforeSigning}
        </Typography>
      </SectionCard>
    </Box>
  );
}
