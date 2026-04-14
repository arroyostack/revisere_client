import { create } from "zustand";
import { ContractComparisonResult } from "../types/contractComparison.types";

interface ContractComparisonStateStore {
  contractComparisonResult: ContractComparisonResult | null;
  isContractComparisonInProgress: boolean;
  contractComparisonErrorMessage: string | null;
  setContractComparisonResult: (
    contractComparisonResult: ContractComparisonResult,
  ) => void;
  setContractComparisonInProgress: (
    isContractComparisonInProgress: boolean,
  ) => void;
  setContractComparisonErrorMessage: (
    contractComparisonErrorMessage: string | null,
  ) => void;
  clearContractComparisonState: () => void;
}

export const useContractComparisonStateStore =
  create<ContractComparisonStateStore>((setState) => ({
    contractComparisonResult: null,
    isContractComparisonInProgress: false,
    contractComparisonErrorMessage: null,
    setContractComparisonResult: (
      contractComparisonResult: ContractComparisonResult,
    ) =>
      setState({
        contractComparisonResult,
        contractComparisonErrorMessage: null,
      }),
    setContractComparisonInProgress: (
      isContractComparisonInProgress: boolean,
    ) => setState({ isContractComparisonInProgress }),
    setContractComparisonErrorMessage: (
      contractComparisonErrorMessage: string | null,
    ) => setState({ contractComparisonErrorMessage }),
    clearContractComparisonState: () =>
      setState({
        contractComparisonResult: null,
        isContractComparisonInProgress: false,
        contractComparisonErrorMessage: null,
      }),
  }));
