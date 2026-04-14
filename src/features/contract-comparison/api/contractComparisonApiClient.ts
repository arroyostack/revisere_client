import { ContractComparisonResult } from '../types/contractComparison.types';
import { ApplicationError } from '../../../shared/errors/AppError';
import { ErrorService } from '../../../shared/errors/errorService';

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL ?? 'http://localhost:3500';

export class ContractComparisonApiClient {
  public async compareContractFiles(
    originalContractFile: File,
    revisedContractFile: File,
  ): Promise<ContractComparisonResult> {
    const multipartFormData = new FormData();
    multipartFormData.append('firstContractFile', originalContractFile);
    multipartFormData.append('secondContractFile', revisedContractFile);

    try {
      const comparisonResponse = await fetch(`${BACKEND_BASE_URL}/contract-comparison/compare`, {
        method: 'POST',
        body: multipartFormData,
      });

      if (!comparisonResponse.ok) {
        const errorPayload = await comparisonResponse
          .json()
          .catch(() => ({ message: 'Request failed' }));

        throw ErrorService.createFromFetchError(
          new Error(errorPayload.message || 'Failed to compare contracts'),
          errorPayload.message || 'Failed to compare contracts',
          comparisonResponse.status,
        );
      }

      return comparisonResponse.json();
    } catch (error) {
      if (error instanceof ApplicationError) {
        throw error;
      }
      throw ErrorService.createFromFetchError(error, 'Failed to compare contracts');
    }
  }
}

export const contractComparisonApiClient = new ContractComparisonApiClient();