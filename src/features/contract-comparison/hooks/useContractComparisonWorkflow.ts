import { useCallback } from 'react';
import { contractComparisonApiClient } from '../api/contractComparisonApiClient';
import { useContractComparisonStateStore } from '../state/contractComparisonState.store';
import { ApplicationError } from '../../../shared/errors/AppError';
import { ErrorService } from '../../../shared/errors/errorService';

interface ContractComparisonWorkflowReturn {
  submitContractsForComparison: (originalContractFile: File, revisedContractFile: File) => Promise<void>;
  isContractComparisonInProgress: boolean;
  contractComparisonErrorMessage: string | null;
  contractComparisonResult: import('../types/contractComparison.types').ContractComparisonResult | null;
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
        const contractComparisonResultData =
          await contractComparisonApiClient.compareContractFiles(
            originalContractFile,
            revisedContractFile,
          );
        setContractComparisonResult(contractComparisonResultData);
      } catch (error) {
        let applicationError: ApplicationError;

        if (error instanceof ApplicationError) {
          applicationError = error;
        } else {
          applicationError = ErrorService.createFromFetchError(
            error,
            'Failed to compare contracts',
          );
        }

        ErrorService.logErrorToConsole(applicationError);
        setContractComparisonErrorMessage(applicationError.userFacingMessage);
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