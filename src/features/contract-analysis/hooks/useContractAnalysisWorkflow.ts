import { useCallback } from "react";
import { contractAnalysisApiClient } from "../api/contractAnalysisApiClient";
import { useContractAnalysisStateStore } from "../state/contractAnalysisState.store";

export function useContractAnalysisWorkflow() {
  const contractAnalysisResponse = useContractAnalysisStateStore(
    (state) => state.contractAnalysisResponse,
  );
  const isContractAnalysisInProgress = useContractAnalysisStateStore(
    (state) => state.isContractAnalysisInProgress,
  );
  const contractAnalysisErrorMessage = useContractAnalysisStateStore(
    (state) => state.contractAnalysisErrorMessage,
  );
  const setContractAnalysisResponse = useContractAnalysisStateStore(
    (state) => state.setContractAnalysisResponse,
  );
  const setContractAnalysisInProgress = useContractAnalysisStateStore(
    (state) => state.setContractAnalysisInProgress,
  );
  const setContractAnalysisErrorMessage = useContractAnalysisStateStore(
    (state) => state.setContractAnalysisErrorMessage,
  );

  const submitContractForAnalysis = useCallback(
    async (contractFileToAnalyze: File): Promise<void> => {
      setContractAnalysisInProgress(true);
      setContractAnalysisErrorMessage(null);

      try {
        const contractAnalysisResponse =
          await contractAnalysisApiClient.analyzeContractFile(
            contractFileToAnalyze,
          );
        setContractAnalysisResponse(contractAnalysisResponse);
      } catch (error) {
        const contractAnalysisErrorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred";
        setContractAnalysisErrorMessage(contractAnalysisErrorMessage);
      } finally {
        setContractAnalysisInProgress(false);
      }
    },
    [
      setContractAnalysisErrorMessage,
      setContractAnalysisInProgress,
      setContractAnalysisResponse,
    ],
  );

  return {
    submitContractForAnalysis,
    isContractAnalysisInProgress,
    contractAnalysisErrorMessage,
    contractAnalysisResponse,
  };
}
