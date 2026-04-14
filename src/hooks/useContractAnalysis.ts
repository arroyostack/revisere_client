import { useCallback } from 'react';
import { useContractAnalysisStore } from '../store/contract-analysis.store';
import { contractAnalysisApiService } from '../services/contract-analysis-api.service';

export function useContractAnalysis() {
  const analysisResult = useContractAnalysisStore((state) => state.analysisResult);
  const isAnalysisLoading = useContractAnalysisStore((state) => state.isAnalysisLoading);
  const analysisError = useContractAnalysisStore((state) => state.analysisError);
  const setAnalysisResult = useContractAnalysisStore((state) => state.setAnalysisResult);
  const setIsAnalysisLoading = useContractAnalysisStore(
    (state) => state.setIsAnalysisLoading,
  );
  const setAnalysisError = useContractAnalysisStore((state) => state.setAnalysisError);

  const analyzeContract = useCallback(
    async (contractFile: File): Promise<void> => {
      setIsAnalysisLoading(true);
      setAnalysisError(null);

      try {
        const result = await contractAnalysisApiService.analyzeContract(contractFile);
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
  };
}