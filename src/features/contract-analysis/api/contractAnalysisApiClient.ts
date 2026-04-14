import { ContractAnalysisResponse } from '../types/contractAnalysis.types';

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL ?? 'http://localhost:3500';

export class ContractAnalysisApiClient {
  async analyzeContractFile(contractFileToAnalyze: File): Promise<ContractAnalysisResponse> {
    const multipartFormData = new FormData();
    multipartFormData.append('contractFile', contractFileToAnalyze);

    const analysisResponse = await fetch(`${BACKEND_BASE_URL}/contract-analysis/analyze`, {
      method: 'POST',
      body: multipartFormData,
    });

    if (!analysisResponse.ok) {
      const errorPayload = await analysisResponse
        .json()
        .catch(() => ({ message: 'Request failed' }));

      throw new Error(errorPayload.message || 'Failed to analyze contract');
    }

    return analysisResponse.json();
  }
}

export const contractAnalysisApiClient = new ContractAnalysisApiClient();
