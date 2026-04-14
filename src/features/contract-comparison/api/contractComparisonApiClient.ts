import { ContractComparisonResult } from '../types/contractComparison.types';
import { ApplicationError } from '../../../shared/errors/AppError';
import { ErrorService } from '../../../shared/errors/errorService';
import {
  executeWithRetry,
  defaultRetryConfiguration,
  isRetryableBasedOnStatusCode,
} from '../../../shared/utils/retryHelper';

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL ?? 'http://localhost:3500';

export class ContractComparisonApiClient {
  public async compareContractFiles(
    originalContractFile: File,
    revisedContractFile: File,
  ): Promise<ContractComparisonResult> {
    const comparisonOperation = async (): Promise<ContractComparisonResult> => {
      const multipartFormData = new FormData();
      multipartFormData.append('firstContractFile', originalContractFile);
      multipartFormData.append('secondContractFile', revisedContractFile);

      const comparisonResponse = await fetch(`${BACKEND_BASE_URL}/contract-comparison/compare`, {
        method: 'POST',
        body: multipartFormData,
      });

      if (!comparisonResponse.ok) {
        const errorPayload = await comparisonResponse
          .json()
          .catch(() => ({ message: 'Request failed' }));

        const error = ErrorService.createFromFetchError(
          new Error(errorPayload.message || 'Failed to compare contracts'),
          errorPayload.message || 'Failed to compare contracts',
          comparisonResponse.status,
        );

        if (!isRetryableBasedOnStatusCode(comparisonResponse.status)) {
          throw error;
        }

        throw error;
      }

      return comparisonResponse.json();
    };

    try {
      return await executeWithRetry(
        comparisonOperation,
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
        'Failed to compare contracts',
      );
    }
  }
}

export const contractComparisonApiClient = new ContractComparisonApiClient();