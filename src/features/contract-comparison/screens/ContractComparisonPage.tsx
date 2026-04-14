import { useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { ContractComparisonResultPanel } from "../components/ContractComparisonResultPanel";
import { useContractComparisonWorkflow } from "../hooks/useContractComparisonWorkflow";
import { DualContractFileDropZone } from "../../contract-upload/components/DualContractFileDropZone";
import { ErrorDisplay } from "../../../shared/ui/ErrorDisplay/ErrorDisplay";
import { LoadingIndicator } from "../../../shared/ui/LoadingIndicator/LoadingIndicator";
import { SectionCard } from "../../../shared/ui/SectionCard/SectionCard";
import { contractComparisonPageStyles } from "./ContractComparisonPage.styles";

export function ContractComparisonPage(): JSX.Element {
  const [originalContractFile, setOriginalContractFile] = useState<File | null>(
    null,
  );
  const [revisedContractFile, setRevisedContractFile] = useState<File | null>(
    null,
  );
  const {
    submitContractsForComparison,
    isContractComparisonInProgress,
    contractComparisonErrorMessage,
    contractComparisonResult,
  } = useContractComparisonWorkflow();

  const handleContractComparisonRequest = (): void => {
    if (originalContractFile && revisedContractFile) {
      submitContractsForComparison(originalContractFile, revisedContractFile);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={contractComparisonPageStyles.pageContentContainer}>
        <Box sx={contractComparisonPageStyles.heroSection}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={contractComparisonPageStyles.heroTitle}
          >
            Contract Comparison
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Upload two versions of a contract to identify changes, additions,
            and which version is more favorable.
          </Typography>
        </Box>

        <SectionCard sectionTitle="Upload Contracts">
          <Box sx={contractComparisonPageStyles.uploadSectionContent}>
            <DualContractFileDropZone
              onOriginalContractFileSelected={setOriginalContractFile}
              onRevisedContractFileSelected={setRevisedContractFile}
              selectedOriginalContractFile={originalContractFile}
              selectedRevisedContractFile={revisedContractFile}
              disabled={isContractComparisonInProgress}
            />

            <Button
              variant="contained"
              size="large"
              onClick={handleContractComparisonRequest}
              disabled={
                !originalContractFile ||
                !revisedContractFile ||
                isContractComparisonInProgress
              }
              sx={contractComparisonPageStyles.submitButton}
            >
              {isContractComparisonInProgress
                ? "Comparing..."
                : "Compare Contracts"}
            </Button>
          </Box>
        </SectionCard>

        {isContractComparisonInProgress && (
          <LoadingIndicator loadingMessage="Comparing contracts..." />
        )}

        {contractComparisonErrorMessage && (
          <ErrorDisplay
            errorMessage={contractComparisonErrorMessage}
            onRetryRequested={
              originalContractFile && revisedContractFile
                ? () =>
                    submitContractsForComparison(
                      originalContractFile,
                      revisedContractFile,
                    )
                : undefined
            }
          />
        )}

        {contractComparisonResult && !isContractComparisonInProgress && (
          <SectionCard sectionTitle="Comparison Results">
            <ContractComparisonResultPanel
              contractComparisonResult={contractComparisonResult}
            />
          </SectionCard>
        )}
      </Box>
    </Container>
  );
}
