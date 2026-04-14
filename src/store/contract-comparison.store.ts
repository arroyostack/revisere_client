import { create } from 'zustand';
import { ContractComparisonResult } from '../types/contract-analysis-api.types';

interface ContractComparisonStore {
  comparisonResult: ContractComparisonResult | null;
  isComparisonLoading: boolean;
  comparisonError: string | null;
  setComparisonResult: (result: ContractComparisonResult) => void;
  setIsComparisonLoading: (isLoading: boolean) => void;
  setComparisonError: (error: string | null) => void;
  clearComparisonResult: () => void;
}

export const useContractComparisonStore = create<ContractComparisonStore>((set) => ({
  comparisonResult: null,
  isComparisonLoading: false,
  comparisonError: null,
  setComparisonResult: (result: ContractComparisonResult) =>
    set({ comparisonResult: result, comparisonError: null }),
  setIsComparisonLoading: (isLoading: boolean) => set({ isComparisonLoading: isLoading }),
  setComparisonError: (error: string | null) => set({ comparisonError: error }),
  clearComparisonResult: () =>
    set({ comparisonResult: null, isComparisonLoading: false, comparisonError: null }),
}));
