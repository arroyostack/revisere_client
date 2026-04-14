import { ContractComparisonResult } from '../types/contractComparison.types';

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL ?? 'http://localhost:3500';

export class ContractComparisonApiClient {
  async compareContractFiles(
    originalContractFile: File,
    revisedContractFile: File,
  ): Promise<ContractComparisonResult> {
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

      throw new Error(errorPayload.message || 'Failed to compare contracts');
    }

    return comparisonResponse.json();
  }
}

export const contractComparisonApiClient = new ContractComparisonApiClient();
