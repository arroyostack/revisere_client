import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ContractComparisonApiClient } from '@/features/contract-comparison/api/contractComparisonApiClient';
import { ContractComparisonResult } from '@/features/contract-comparison/types/contractComparison.types';
import { ApplicationErrorCode } from '@/shared/errors/errorCodes';

describe('ContractComparisonApiClient', () => {
  let apiClient: ContractComparisonApiClient;
  let mockFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    apiClient = new ContractComparisonApiClient();
    mockFetch = vi.fn();
    vi.stubGlobal('fetch', mockFetch);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('compareContractFiles', () => {
    it('returns contract comparison result on success', async () => {
      const mockResult: ContractComparisonResult = {
        firstContractTitle: 'Original Contract',
        secondContractTitle: 'Revised Contract',
        overallAssessment: 'Some changes detected',
        totalChangesDetected: 2,
        identifiedChanges: [
          {
            changeTitle: 'Payment Terms',
            whatChangedDescription: 'Payment amount changed',
            changeDirection: 'favors_first_party',
            plainEnglishExplanation: 'Payment increased',
            significanceLevel: 'moderate',
          },
        ],
        clausesAddedInSecondContract: ['New clause'],
        clausesRemovedFromFirstContract: [],
        whichVersionIsFavorable: 'first_version',
        favorabilityExplanation: 'First version is better',
        recommendationBeforeSigning: 'Review carefully',
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockResult,
      } as Response);

      const mockOriginalFile = new File(['original'], 'original.pdf', { type: 'application/pdf' });
      const mockRevisedFile = new File(['revised'], 'revised.pdf', { type: 'application/pdf' });

      const result = await apiClient.compareContractFiles(mockOriginalFile, mockRevisedFile);

      expect(result).toEqual(mockResult);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/contract-comparison/compare'),
        expect.objectContaining({
          method: 'POST',
        }),
      );
    });

    it('throws ApplicationError for 400 status', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({ message: 'Invalid files' }),
      } as Response);

      const mockOriginalFile = new File(['original'], 'original.pdf', { type: 'application/pdf' });
      const mockRevisedFile = new File(['revised'], 'revised.pdf', { type: 'application/pdf' });

      await expect(apiClient.compareContractFiles(mockOriginalFile, mockRevisedFile)).rejects.toMatchObject({
        errorCode: ApplicationErrorCode.VALIDATION_ERROR,
        isRetryable: false,
      });
    });

    it('throws ApplicationError for 401 status', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 401,
        json: async () => ({ message: 'Unauthorized' }),
      } as Response);

      const mockOriginalFile = new File(['original'], 'original.pdf', { type: 'application/pdf' });
      const mockRevisedFile = new File(['revised'], 'revised.pdf', { type: 'application/pdf' });

      await expect(apiClient.compareContractFiles(mockOriginalFile, mockRevisedFile)).rejects.toMatchObject({
        errorCode: ApplicationErrorCode.UNAUTHORIZED_ERROR,
        isRetryable: false,
      });
    });

    it('throws ApplicationError for 403 status', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 403,
        json: async () => ({ message: 'Forbidden' }),
      } as Response);

      const mockOriginalFile = new File(['original'], 'original.pdf', { type: 'application/pdf' });
      const mockRevisedFile = new File(['revised'], 'revised.pdf', { type: 'application/pdf' });

      await expect(apiClient.compareContractFiles(mockOriginalFile, mockRevisedFile)).rejects.toMatchObject({
        errorCode: ApplicationErrorCode.UNAUTHORIZED_ERROR,
        isRetryable: false,
      });
    });

    it('throws ApplicationError for 413 status', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 413,
        json: async () => ({ message: 'Files too large' }),
      } as Response);

      const mockOriginalFile = new File(['original'], 'original.pdf', { type: 'application/pdf' });
      const mockRevisedFile = new File(['revised'], 'revised.pdf', { type: 'application/pdf' });

      await expect(apiClient.compareContractFiles(mockOriginalFile, mockRevisedFile)).rejects.toMatchObject({
        errorCode: ApplicationErrorCode.FILE_TOO_LARGE_ERROR,
        isRetryable: true,
      });
    });

    it('throws ApplicationError for 500 status', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({ message: 'Server error' }),
      } as Response);

      const mockOriginalFile = new File(['original'], 'original.pdf', { type: 'application/pdf' });
      const mockRevisedFile = new File(['revised'], 'revised.pdf', { type: 'application/pdf' });

      await expect(apiClient.compareContractFiles(mockOriginalFile, mockRevisedFile)).rejects.toMatchObject({
        errorCode: ApplicationErrorCode.SERVER_ERROR,
        isRetryable: true,
      });
    });

    it('throws ApplicationError for network error', async () => {
      mockFetch.mockRejectedValue(new Error('Failed to fetch'));

      const mockOriginalFile = new File(['original'], 'original.pdf', { type: 'application/pdf' });
      const mockRevisedFile = new File(['revised'], 'revised.pdf', { type: 'application/pdf' });

      await expect(apiClient.compareContractFiles(mockOriginalFile, mockRevisedFile)).rejects.toMatchObject({
        errorCode: ApplicationErrorCode.NETWORK_ERROR,
        isRetryable: true,
      });
    });

    it('throws ApplicationError for timeout', async () => {
      mockFetch.mockRejectedValue(new Error('Request timeout'));

      const mockOriginalFile = new File(['original'], 'original.pdf', { type: 'application/pdf' });
      const mockRevisedFile = new File(['revised'], 'revised.pdf', { type: 'application/pdf' });

      await expect(apiClient.compareContractFiles(mockOriginalFile, mockRevisedFile)).rejects.toMatchObject({
        errorCode: ApplicationErrorCode.TIMEOUT_ERROR,
        isRetryable: true,
      });
    });

    it('throws ApplicationError for unknown error', async () => {
      mockFetch.mockRejectedValue(new Error('Unknown error'));

      const mockOriginalFile = new File(['original'], 'original.pdf', { type: 'application/pdf' });
      const mockRevisedFile = new File(['revised'], 'revised.pdf', { type: 'application/pdf' });

      await expect(apiClient.compareContractFiles(mockOriginalFile, mockRevisedFile)).rejects.toMatchObject({
        errorCode: ApplicationErrorCode.UNKNOWN_ERROR,
        isRetryable: true,
      });
    });
  });
});