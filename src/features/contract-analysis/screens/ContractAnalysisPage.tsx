import { useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { ContractAnalysisResultPanel } from "../components/ContractAnalysisResultPanel";
import { useContractAnalysisWorkflow } from "../hooks/useContractAnalysisWorkflow";
import { SingleContractFileDropZone } from "../../contract-upload/components/SingleContractFileDropZone";
import { ErrorDisplay } from "../../../shared/ui/ErrorDisplay/ErrorDisplay";
import { LoadingIndicator } from "../../../shared/ui/LoadingIndicator/LoadingIndicator";
import { SectionCard } from "../../../shared/ui/SectionCard/SectionCard";
import { contractAnalysisPageStyles } from "./ContractAnalysisPage.styles";

export function ContractAnalysisPage(): JSX.Element {
  const [selectedContractFile, setSelectedContractFile] = useState<File | null>(
    null,
  );
  const {
    submitContractForAnalysis,
    isContractAnalysisInProgress,
    contractAnalysisErrorMessage,
    contractAnalysisResponse,
  } = useContractAnalysisWorkflow();

  const handleContractAnalysisRequest = (): void => {
    if (selectedContractFile) {
      submitContractForAnalysis(selectedContractFile);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={contractAnalysisPageStyles.pageContentContainer}>
        <Box sx={contractAnalysisPageStyles.heroSection}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={contractAnalysisPageStyles.heroTitle}
          >
            Contract Analysis
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Upload a legal contract to get AI-powered analysis including
            extraction, risk assessment, and plain English summary.
          </Typography>
        </Box>

        <SectionCard sectionTitle="Upload Contract">
          <Box sx={contractAnalysisPageStyles.uploadSectionContent}>
            <SingleContractFileDropZone
              onContractFileSelected={setSelectedContractFile}
              selectedContractFile={selectedContractFile}
              disabled={isContractAnalysisInProgress}
            />

            <Button
              variant="contained"
              size="large"
              onClick={handleContractAnalysisRequest}
              disabled={!selectedContractFile || isContractAnalysisInProgress}
              sx={contractAnalysisPageStyles.submitButton}
            >
              {isContractAnalysisInProgress
                ? "Analyzing..."
                : "Analyze Contract"}
            </Button>
          </Box>
        </SectionCard>

        {isContractAnalysisInProgress && (
          <LoadingIndicator loadingMessage="Analyzing contract..." />
        )}

        {contractAnalysisErrorMessage && (
          <ErrorDisplay
            errorMessage={contractAnalysisErrorMessage}
            onRetryRequested={
              selectedContractFile
                ? () => submitContractForAnalysis(selectedContractFile)
                : undefined
            }
          />
        )}

        {contractAnalysisResponse && !isContractAnalysisInProgress && (
          <SectionCard sectionTitle="Analysis Results">
            <ContractAnalysisResultPanel
              contractAnalysisResponse={contractAnalysisResponse}
            />
          </SectionCard>
        )}
      </Box>
    </Container>
  );
}
