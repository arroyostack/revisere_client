import { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { ContractFullAnalysisResponse } from '../../types/contract-analysis-api.types';
import { ContractSummarySection } from './ContractSummarySection';
import { ExtractedDataSection } from './ExtractedDataSection';
import { RiskAnalysisSection } from './RiskAnalysisSection';

interface ContractAnalysisResultPanelProps {
  result: ContractFullAnalysisResponse;
}

export function ContractAnalysisResultPanel({ result }: ContractAnalysisResultPanelProps): JSX.Element {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number): void => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.9rem',
            },
          }}
        >
          <Tab label="Summary" />
          <Tab label="Extracted Data" />
          <Tab label="Risk Analysis" />
        </Tabs>
      </Box>

      {selectedTab === 0 && <ContractSummarySection summary={result.summary} />}
      {selectedTab === 1 && <ExtractedDataSection extractedData={result.extractedData} />}
      {selectedTab === 2 && <RiskAnalysisSection riskAnalysis={result.riskAnalysis} />}
    </Box>
  );
}