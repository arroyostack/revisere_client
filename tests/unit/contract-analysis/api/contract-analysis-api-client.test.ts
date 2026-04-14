import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ContractAnalysisApiClient } from '@/features/contract-analysis/api/contractAnalysisApiClient';
import { ContractAnalysisResponse } from '@/features/contract-analysis/types/contractAnalysis.types';
import { ApplicationErrorCode } from '@/shared/errors/errorCodes';

describe('ContractAnalysisApiClient', () => {
  let apiClient: ContractAnalysisApiClient;
  let mockFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    apiClient = new ContractAnalysisApiClient();
    mockFetch = vi.fn();
    vi.stubGlobal('fetch', mockFetch);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('analyzeContractFile', () => {
    it('returns contract analysis response on success', async () => {
      const mockResponse: ContractAnalysisResponse = {
        originalFileName: 'test-contract.pdf',
        extractedData: {
          contractTitle: 'Test Contract',
          contractType: 'NDA',
          parties: [{ partyName: 'Party A', partyRole: 'Disclosing Party' }],
          terminationConditions: {
            terminationConditions: ['30 days notice'],
            hasAutomaticRenewal: false,
          },
          keyObligations: [],
          confidentialityClauseExists: true,
          nonCompeteClauseExists: false,
          intellectualPropertyClauseExists: false,
        },
        riskAnalysis: {
          overallRiskLevel: 'low',
          riskFlags: [],
          totalHighSeverityRisks: 0,
          totalMediumSeverityRisks: 0,
          totalLowSeverityRisks: 0,
          riskAnalysisSummary: 'Low risk contract',
        },
        summary: {
          oneSentenceDescription: 'Test NDA',
          whatThisContractDoes: 'Non-disclosure agreement',
          whoIsInvolved: 'Party A',
          mainObligationsForEachParty: [],
          importantDatesAndDeadlines: [],
          whatHappensIfThingsGoWrong: 'Legal remedies',
          howToGetOut: 'Termination notice',
          threeThingsToKnowBeforeSigning: ['Confidential', 'Enforceable', 'Standard'],
        },
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const mockFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
      const result = await apiClient.analyzeContractFile(mockFile);

      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/contract-analysis/analyze'),
        expect.objectContaining({
          method: 'POST',
        }),
      );
    });

    it('throws ApplicationError for 400 status', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({ message: 'Invalid file' }),
      } as Response);

      const mockFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });

      await expect(apiClient.analyzeContractFile(mockFile)).rejects.toMatchObject({
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

      const mockFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });

      await expect(apiClient.analyzeContractFile(mockFile)).rejects.toMatchObject({
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

      const mockFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });

      await expect(apiClient.analyzeContractFile(mockFile)).rejects.toMatchObject({
        errorCode: ApplicationErrorCode.UNAUTHORIZED_ERROR,
        isRetryable: false,
      });
    });

    it('throws ApplicationError for 413 status', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 413,
        json: async () => ({ message: 'File too large' }),
      } as Response);

      const mockFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });

      await expect(apiClient.analyzeContractFile(mockFile)).rejects.toMatchObject({
        errorCode: ApplicationErrorCode.FILE_TOO_LARGE_ERROR,
        isRetryable: true,
      });
    }, 10000);

    it('throws ApplicationError for 500 status', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({ message: 'Server error' }),
      } as Response);

      const mockFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });

      await expect(apiClient.analyzeContractFile(mockFile)).rejects.toMatchObject({
        errorCode: ApplicationErrorCode.SERVER_ERROR,
        isRetryable: true,
      });
    }, 10000);

    it('throws ApplicationError for network error', async () => {
      mockFetch.mockRejectedValue(new Error('Failed to fetch'));

      const mockFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });

      await expect(apiClient.analyzeContractFile(mockFile)).rejects.toMatchObject({
        errorCode: ApplicationErrorCode.NETWORK_ERROR,
        isRetryable: true,
      });
    }, 10000);

    it('throws ApplicationError for timeout', async () => {
      mockFetch.mockRejectedValue(new Error('Request timeout'));

      const mockFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });

      await expect(apiClient.analyzeContractFile(mockFile)).rejects.toMatchObject({
        errorCode: ApplicationErrorCode.TIMEOUT_ERROR,
        isRetryable: true,
      });
    }, 10000);

    it('throws ApplicationError for unknown error', async () => {
      mockFetch.mockRejectedValue(new Error('Unknown error'));

      const mockFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });

      await expect(apiClient.analyzeContractFile(mockFile)).rejects.toMatchObject({
        errorCode: ApplicationErrorCode.UNKNOWN_ERROR,
        isRetryable: true,
      });
    }, 10000);
  });
});