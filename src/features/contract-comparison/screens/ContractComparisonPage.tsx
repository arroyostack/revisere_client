import { useState, useMemo } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { ContractComparisonResultPanel } from '../components/ContractComparisonResultPanel';
import { useContractComparisonWorkflow } from '../hooks/useContractComparisonWorkflow';
import { DualContractFileDropZone } from '../../contract-upload/components/DualContractFileDropZone';
import { ErrorDisplay } from '../../../shared/ui/ErrorDisplay/ErrorDisplay';
import { LoadingIndicator } from '../../../shared/ui/LoadingIndicator/LoadingIndicator';
import { createContractComparisonProgressMessageManager } from '../../../shared/ui/LoadingIndicator/progressMessages';
import { SectionCard } from '../../../shared/ui/SectionCard/SectionCard';
import { contractComparisonPageStyles } from './ContractComparisonPage.styles';

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

  const contractComparisonProgressMessageRotator = useMemo(
    () => createContractComparisonProgressMessageManager(),
    [],
  );

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

        <Box
          sx={{
            mb: 3,
            p: 2,
            bgcolor: "#f5f5f5",
            borderRadius: 1,
            border: "1px solid",
            borderColor: "#ddd",
          }}
        >
          <Typography variant="body2" sx={{ color: "#333", fontWeight: 500 }}>
            ⚠️ For demonstration purposes only. This tool is not a substitute for
            professional legal advice. Do not rely on its analysis for actual legal
            decisions. Consult a qualified attorney for legal matters.
          </Typography>
        </Box>

        <SectionCard sectionTitle="Upload Contracts">
          <Box sx={contractComparisonPageStyles.uploadSectionContent}>
            <Box sx={{ position: 'relative' }}>
              <DualContractFileDropZone
                onOriginalContractFileSelected={setOriginalContractFile}
                onRevisedContractFileSelected={setRevisedContractFile}
                selectedOriginalContractFile={originalContractFile}
                selectedRevisedContractFile={revisedContractFile}
                disabled={isContractComparisonInProgress}
              />
              {isContractComparisonInProgress && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 1,
                    zIndex: 10,
                    animation: 'smoothOverlayIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '@keyframes smoothOverlayIn': {
                      '0%': { opacity: 0 },
                      '100%': { opacity: 1 },
                    },
                  }}
                >
                  <LoadingIndicator progressMessageRotator={contractComparisonProgressMessageRotator} />
                  <Typography variant="caption" sx={{ mt: 2, color: 'text.secondary' }}>
                    This may take up to 2 minutes
                  </Typography>
                </Box>
              )}
            </Box>

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
