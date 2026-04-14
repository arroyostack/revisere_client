import { ContractAnalysisResponse } from '../types/contractAnalysis.types';
import { ApplicationError } from '../../../shared/errors/AppError';
import { ErrorService } from '../../../shared/errors/errorService';
import {
  executeWithRetry,
  defaultRetryConfiguration,
  isRetryableBasedOnStatusCode,
} from '../../../shared/utils/retryHelper';

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL ?? 'http://localhost:3500';

export class ContractAnalysisApiClient {
  public async analyzeContractFile(contractFileToAnalyze: File): Promise<ContractAnalysisResponse> {
    const analysisOperation = async (): Promise<ContractAnalysisResponse> => {
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

        const error = ErrorService.createFromFetchError(
          new Error(errorPayload.message || 'Failed to analyze contract'),
          errorPayload.message || 'Failed to analyze contract',
          analysisResponse.status,
        );

        if (!isRetryableBasedOnStatusCode(analysisResponse.status)) {
          throw error;
        }

        throw error;
      }

      return analysisResponse.json();
    };

    try {
      return await executeWithRetry(
        analysisOperation,
        defaultRetryConfiguration,
        (error): boolean => {
          if (error instanceof ApplicationError) {
            return error.isRetryable;
          }
          // Only retry HTTP-level errors (5xx, 429), not network/timeout issues
          return false;
        },
      );
    } catch (error) {
      if (error instanceof ApplicationError) {
        throw error;
      }
      throw ErrorService.createFromFetchError(
        error,
        'Failed to analyze contract',
      );
    }
  }
}

export const contractAnalysisApiClient = new ContractAnalysisApiClient();