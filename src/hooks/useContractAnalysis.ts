import { useCallback } from 'react';
import { useProviderConfigurationStore } from '../store/provider-configuration.store';
import { useContractAnalysisStore } from '../store/contract-analysis.store';
import { contractAnalysisApiService } from '../services/contract-analysis-api.service';

export function useContractAnalysis() {
  const savedConfiguration = useProviderConfigurationStore(
    (state) => state.savedConfiguration,
  );
  const analysisResult = useContractAnalysisStore((state) => state.analysisResult);
  const isAnalysisLoading = useContractAnalysisStore((state) => state.isAnalysisLoading);
  const analysisError = useContractAnalysisStore((state) => state.analysisError);
  const setAnalysisResult = useContractAnalysisStore((state) => state.setAnalysisResult);
  const setIsAnalysisLoading = useContractAnalysisStore(
    (state) => state.setIsAnalysisLoading,
  );
  const setAnalysisError = useContractAnalysisStore((state) => state.setAnalysisError);
  const clearAnalysisResult = useContractAnalysisStore(
    (state) => state.clearAnalysisResult,
  );

  const analyzeContract = useCallback(
    async (contractFile: File): Promise<void> => {
      if (!savedConfiguration) {
        setAnalysisError('Please configure your AI provider first.');
        return;
      }

      setIsAnalysisLoading(true);
      setAnalysisError(null);

      try {
        const result = await contractAnalysisApiService.analyzeContract(
          contractFile,
          savedConfiguration,
        );
        setAnalysisResult(result);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'An unexpected error occurred';
        setAnalysisError(errorMessage);
      } finally {
        setIsAnalysisLoading(false);
      }
    },
    [
      savedConfiguration,
      setIsAnalysisLoading,
      setAnalysisError,
      setAnalysisResult,
    ],
  );

  return {
    analyzeContract,
    isLoading: isAnalysisLoading,
    error: analysisError,
    result: analysisResult,
    clearAnalysisResult,
  };
}
