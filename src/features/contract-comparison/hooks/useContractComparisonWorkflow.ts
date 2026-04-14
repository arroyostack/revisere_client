import { useCallback } from "react";
import { contractComparisonApiClient } from "../api/contractComparisonApiClient";
import { useContractComparisonStateStore } from "../state/contractComparisonState.store";

interface ContractComparisonWorkflowReturn {
  submitContractsForComparison: (originalContractFile: File, revisedContractFile: File) => Promise<void>;
  isContractComparisonInProgress: boolean;
  contractComparisonErrorMessage: string | null;
  contractComparisonResult: import("../types/contractComparison.types").ContractComparisonResult | null;
}

export function useContractComparisonWorkflow(): ContractComparisonWorkflowReturn {
  const contractComparisonResult = useContractComparisonStateStore(
    (state) => state.contractComparisonResult,
  );
  const isContractComparisonInProgress = useContractComparisonStateStore(
    (state) => state.isContractComparisonInProgress,
  );
  const contractComparisonErrorMessage = useContractComparisonStateStore(
    (state) => state.contractComparisonErrorMessage,
  );
  const setContractComparisonResult = useContractComparisonStateStore(
    (state) => state.setContractComparisonResult,
  );
  const setContractComparisonInProgress = useContractComparisonStateStore(
    (state) => state.setContractComparisonInProgress,
  );
  const setContractComparisonErrorMessage = useContractComparisonStateStore(
    (state) => state.setContractComparisonErrorMessage,
  );

  const submitContractsForComparison = useCallback(
    async (
      originalContractFile: File,
      revisedContractFile: File,
    ): Promise<void> => {
      setContractComparisonInProgress(true);
      setContractComparisonErrorMessage(null);

      try {
        const contractComparisonResult =
          await contractComparisonApiClient.compareContractFiles(
            originalContractFile,
            revisedContractFile,
          );
        setContractComparisonResult(contractComparisonResult);
      } catch (error) {
        const contractComparisonErrorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred";
        setContractComparisonErrorMessage(contractComparisonErrorMessage);
      } finally {
        setContractComparisonInProgress(false);
      }
    },
    [
      setContractComparisonErrorMessage,
      setContractComparisonInProgress,
      setContractComparisonResult,
    ],
  );

  return {
    submitContractsForComparison,
    isContractComparisonInProgress,
    contractComparisonErrorMessage,
    contractComparisonResult,
  };
}
