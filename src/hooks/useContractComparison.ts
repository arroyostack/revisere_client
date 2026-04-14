import { useCallback } from 'react';
import { useProviderConfigurationStore } from '../store/provider-configuration.store';
import { useContractComparisonStore } from '../store/contract-comparison.store';
import { contractAnalysisApiService } from '../services/contract-analysis-api.service';

export function useContractComparison() {
  const savedConfiguration = useProviderConfigurationStore(
    (state) => state.savedConfiguration,
  );
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
  const clearComparisonResult = useContractComparisonStore(
    (state) => state.clearComparisonResult,
  );

  const compareContracts = useCallback(
    async (firstFile: File, secondFile: File): Promise<void> => {
      if (!savedConfiguration) {
        setComparisonError('Please configure your AI provider first.');
        return;
      }

      setIsComparisonLoading(true);
      setComparisonError(null);

      try {
        const result = await contractAnalysisApiService.compareContracts(
          firstFile,
          secondFile,
          savedConfiguration,
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
      savedConfiguration,
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
    clearComparisonResult,
  };
}
