import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { ContractAnalysisResponse } from "../types/contractAnalysis.types";
import { contractAnalysisResultPanelStyles } from "./ContractAnalysisResultPanel.styles";
import { ContractSummarySection } from "./ContractSummarySection";
import { ExtractedContractDataSection } from "./ExtractedContractDataSection";
import { ContractRiskAnalysisSection } from "./ContractRiskAnalysisSection";

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
          contractSummary={contractAnalysisResponse.summary}
        />
      )}
      {selectedResultTabIndex === 1 && (
        <ExtractedContractDataSection
          extractedContractData={contractAnalysisResponse.extractedData}
        />
      )}
      {selectedResultTabIndex === 2 && (
        <ContractRiskAnalysisSection
          contractRiskAnalysis={contractAnalysisResponse.riskAnalysis}
        />
      )}
    </Box>
  );
}
