import { ContractAnalysisResponse } from '../types/contractAnalysis.types';
import { ApplicationError } from '../../../shared/errors/AppError';
import { ErrorService } from '../../../shared/errors/errorService';

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL ?? 'http://localhost:3500';

export class ContractAnalysisApiClient {
  public async analyzeContractFile(contractFileToAnalyze: File): Promise<ContractAnalysisResponse> {
    const multipartFormData = new FormData();
    multipartFormData.append('contractFile', contractFileToAnalyze);

    try {
      const analysisResponse = await fetch(`${BACKEND_BASE_URL}/contract-analysis/analyze`, {
        method: 'POST',
        body: multipartFormData,
      });

      if (!analysisResponse.ok) {
        const errorPayload = await analysisResponse
          .json()
          .catch(() => ({ message: 'Request failed' }));

        throw ErrorService.createFromFetchError(
          new Error(errorPayload.message || 'Failed to analyze contract'),
          errorPayload.message || 'Failed to analyze contract',
          analysisResponse.status,
        );
      }

      return analysisResponse.json();
    } catch (error) {
      if (error instanceof ApplicationError) {
        throw error;
      }
      throw ErrorService.createFromFetchError(error, 'Failed to analyze contract');
    }
  }
}

export const contractAnalysisApiClient = new ContractAnalysisApiClient();