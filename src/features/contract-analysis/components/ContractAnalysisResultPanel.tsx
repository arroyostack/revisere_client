import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { ContractAnalysisResponse } from "../types/contractAnalysis.types";
import { contractAnalysisResultPanelStyles } from "./ContractAnalysisResultPanel.styles";
import { ContractSummarySection } from "./ContractSummarySection";
import { ExtractedDataSection } from "./ExtractedContractDataSection";
import { RiskAnalysisSection } from "./ContractRiskAnalysisSection";

interface ContractAnalysisResultPanelProps {
  contractAnalysisResponse: ContractAnalysisResponse;
}

export function ContractAnalysisResultPanel({
  contractAnalysisResponse,
}: ContractAnalysisResultPanelProps): JSX.Element {
  const [selectedResultTabIndex, setSelectedResultTabIndex] = useState(0);

  const handleSelectedResultTabChange = (
    _event: React.SyntheticEvent,
    selectedTabIndex: number,
  ): void => {
    setSelectedResultTabIndex(selectedTabIndex);
  };

  return (
    <Box sx={contractAnalysisResultPanelStyles.panelContainer}>
      <Box sx={contractAnalysisResultPanelStyles.tabNavigationContainer}>
        <Tabs
          value={selectedResultTabIndex}
          onChange={handleSelectedResultTabChange}
          sx={contractAnalysisResultPanelStyles.tabs}
        >
          <Tab label="Summary" />
          <Tab label="Extracted Data" />
          <Tab label="Risk Analysis" />
        </Tabs>
      </Box>

      {selectedResultTabIndex === 0 && (
        <ContractSummarySection
          summary={contractAnalysisResponse.summary}
        />
      )}
      {selectedResultTabIndex === 1 && (
        <ExtractedDataSection
          extractedData={contractAnalysisResponse.extractedData}
        />
      )}
      {selectedResultTabIndex === 2 && (
        <RiskAnalysisSection
          riskAnalysis={contractAnalysisResponse.riskAnalysis}
        />
      )}
    </Box>
  );
}
