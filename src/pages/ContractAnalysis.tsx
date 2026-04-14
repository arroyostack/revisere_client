import { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { SingleContractDropZone } from '../components/contract-upload/SingleContractDropZone';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { SectionCard } from '../components/ui/SectionCard';
import { useContractAnalysis } from '../hooks/useContractAnalysis';
import { ContractAnalysisResultPanel } from '../components/contract-analysis/ContractAnalysisResultPanel';

export function ContractAnalysis(): JSX.Element {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { analyzeContract, isLoading, error, result } = useContractAnalysis();

  const handleAnalyze = (): void => {
    if (selectedFile) {
      analyzeContract(selectedFile);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontFamily: 'Georgia, serif' }}>
            Contract Analysis
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Upload a legal contract to get AI-powered analysis including extraction, risk assessment, and plain English summary.
          </Typography>
        </Box>

        <SectionCard title="Upload Contract">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <SingleContractDropZone
              onFileSelect={setSelectedFile}
              selectedFile={selectedFile}
              disabled={isLoading}
            />

            <Button
              variant="contained"
              size="large"
              onClick={handleAnalyze}
              disabled={!selectedFile || isLoading}
              sx={{
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': { backgroundColor: 'primary.dark' },
                '&:disabled': { backgroundColor: 'rgba(255,255,255,0.1)' },
              }}
            >
              {isLoading ? 'Analyzing...' : 'Analyze Contract'}
            </Button>
          </Box>
        </SectionCard>

        {isLoading && (
          <LoadingSpinner message="Analyzing contract..." />
        )}

        {error && (
          <ErrorMessage message={error} onRetry={selectedFile ? () => analyzeContract(selectedFile) : undefined} />
        )}

        {result && !isLoading && (
          <SectionCard title="Analysis Results">
            <ContractAnalysisResultPanel result={result} />
          </SectionCard>
        )}
      </Box>
    </Container>
  );
}