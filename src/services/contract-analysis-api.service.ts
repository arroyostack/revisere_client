import { ContractFullAnalysisResponse, ContractComparisonResult } from '../types/contract-analysis-api.types';

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL ?? 'http://localhost:3500';

class ContractAnalysisApiService {
  async analyzeContract(
    contractFile: File,
  ): Promise<ContractFullAnalysisResponse> {
    const formData = new FormData();
    formData.append('contractFile', contractFile);

    const response = await fetch(`${BACKEND_BASE_URL}/contract-analysis/analyze`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(errorData.message || 'Failed to analyze contract');
    }

    return response.json();
  }

  async compareContracts(
    firstContractFile: File,
    secondContractFile: File,
  ): Promise<ContractComparisonResult> {
    const formData = new FormData();
    formData.append('firstContractFile', firstContractFile);
    formData.append('secondContractFile', secondContractFile);

    const response = await fetch(`${BACKEND_BASE_URL}/contract-comparison/compare`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(errorData.message || 'Failed to compare contracts');
    }

    return response.json();
  }
}

export const contractAnalysisApiService = new ContractAnalysisApiService();