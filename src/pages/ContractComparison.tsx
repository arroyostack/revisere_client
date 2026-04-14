import { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { DualContractDropZone } from '../components/contract-upload/DualContractDropZone';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { SectionCard } from '../components/ui/SectionCard';
import { useContractComparison } from '../hooks/useContractComparison';
import { ComparisonResultPanel } from '../components/contract-comparison/ComparisonResultPanel';

export function ContractComparison(): JSX.Element {
  const [firstFile, setFirstFile] = useState<File | null>(null);
  const [secondFile, setSecondFile] = useState<File | null>(null);
  const { compareContracts, isLoading, error, result } = useContractComparison();

  const handleCompare = (): void => {
    if (firstFile && secondFile) {
      compareContracts(firstFile, secondFile);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontFamily: 'Georgia, serif' }}>
            Contract Comparison
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Upload two versions of a contract to identify changes, additions, and which version is more favorable.
          </Typography>
        </Box>

        <SectionCard title="Upload Contracts">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <DualContractDropZone
              onFirstFileSelect={setFirstFile}
              onSecondFileSelect={setSecondFile}
              firstFile={firstFile}
              secondFile={secondFile}
              disabled={isLoading}
            />

            <Button
              variant="contained"
              size="large"
              onClick={handleCompare}
              disabled={!firstFile || !secondFile || isLoading}
              sx={{
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': { backgroundColor: 'primary.dark' },
                '&:disabled': { backgroundColor: 'rgba(255,255,255,0.1)' },
              }}
            >
              {isLoading ? 'Comparing...' : 'Compare Contracts'}
            </Button>
          </Box>
        </SectionCard>

        {isLoading && (
          <LoadingSpinner message="Comparing contracts..." />
        )}

        {error && (
          <ErrorMessage 
            message={error} 
            onRetry={firstFile && secondFile ? () => compareContracts(firstFile, secondFile) : undefined} 
          />
        )}

        {result && !isLoading && (
          <SectionCard title="Comparison Results">
            <ComparisonResultPanel result={result} />
          </SectionCard>
        )}
      </Box>
    </Container>
  );
}