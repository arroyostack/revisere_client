import { useCallback } from 'react';
import { useContractComparisonStore } from '../store/contract-comparison.store';
import { contractAnalysisApiService } from '../services/contract-analysis-api.service';

export function useContractComparison() {
  const comparisonResult = useContractComparisonStore(
    (state) => state.comparisonResult,
  );
  const isComparisonLoading = useContractComparisonStore(
    (state) => state.isComparisonLoading,
  );
  const comparisonError = useContractComparisonStore(
    (state) => state.comparisonError,
  );
  const setComparisonResult = useContractComparisonStore(
    (state) => state.setComparisonResult,
  );
  const setIsComparisonLoading = useContractComparisonStore(
    (state) => state.setIsComparisonLoading,
  );
  const setComparisonError = useContractComparisonStore(
    (state) => state.setComparisonError,
  );

  const compareContracts = useCallback(
    async (firstFile: File, secondFile: File): Promise<void> => {
      setIsComparisonLoading(true);
      setComparisonError(null);

      try {
        const result = await contractAnalysisApiService.compareContracts(
          firstFile,
          secondFile,
        );
        setComparisonResult(result);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'An unexpected error occurred';
        setComparisonError(errorMessage);
      } finally {
        setIsComparisonLoading(false);
      }
    },
    [
      setIsComparisonLoading,
      setComparisonError,
      setComparisonResult,
    ],
  );

  return {
    compareContracts,
    isLoading: isComparisonLoading,
    error: comparisonError,
    result: comparisonResult,
  };
}