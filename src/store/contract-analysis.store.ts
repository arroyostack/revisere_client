import { create } from 'zustand';
import { ContractFullAnalysisResponse } from '../types/contract-analysis-api.types';

interface ContractAnalysisStore {
  analysisResult: ContractFullAnalysisResponse | null;
  isAnalysisLoading: boolean;
  analysisError: string | null;
  setAnalysisResult: (result: ContractFullAnalysisResponse) => void;
  setIsAnalysisLoading: (isLoading: boolean) => void;
  setAnalysisError: (error: string | null) => void;
  clearAnalysisResult: () => void;
}

export const useContractAnalysisStore = create<ContractAnalysisStore>((set) => ({
  analysisResult: null,
  isAnalysisLoading: false,
  analysisError: null,
  setAnalysisResult: (result: ContractFullAnalysisResponse) =>
    set({ analysisResult: result, analysisError: null }),
  setIsAnalysisLoading: (isLoading: boolean) => set({ isAnalysisLoading: isLoading }),
  setAnalysisError: (error: string | null) => set({ analysisError: error }),
  clearAnalysisResult: () =>
    set({ analysisResult: null, isAnalysisLoading: false, analysisError: null }),
}));
