import { create } from "zustand";
import { ContractAnalysisResponse } from "../types/contractAnalysis.types";

interface ContractAnalysisStateStore {
  contractAnalysisResponse: ContractAnalysisResponse | null;
  isContractAnalysisInProgress: boolean;
  contractAnalysisErrorMessage: string | null;
  setContractAnalysisResponse: (
    contractAnalysisResponse: ContractAnalysisResponse,
  ) => void;
  setContractAnalysisInProgress: (
    isContractAnalysisInProgress: boolean,
  ) => void;
  setContractAnalysisErrorMessage: (
    contractAnalysisErrorMessage: string | null,
  ) => void;
  clearContractAnalysisState: () => void;
}

export const useContractAnalysisStateStore = create<ContractAnalysisStateStore>(
  (setState) => ({
    contractAnalysisResponse: null,
    isContractAnalysisInProgress: false,
    contractAnalysisErrorMessage: null,
    setContractAnalysisResponse: (
      contractAnalysisResponse: ContractAnalysisResponse,
    ) =>
      setState({
        contractAnalysisResponse,
        contractAnalysisErrorMessage: null,
      }),
    setContractAnalysisInProgress: (isContractAnalysisInProgress: boolean) =>
      setState({ isContractAnalysisInProgress }),
    setContractAnalysisErrorMessage: (
      contractAnalysisErrorMessage: string | null,
    ) => setState({ contractAnalysisErrorMessage }),
    clearContractAnalysisState: () =>
      setState({
        contractAnalysisResponse: null,
        isContractAnalysisInProgress: false,
        contractAnalysisErrorMessage: null,
      }),
  }),
);
