import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useContractAnalysisWorkflow } from '@/features/contract-analysis/hooks/useContractAnalysisWorkflow';
import { useContractAnalysisStateStore } from '@/features/contract-analysis/state/contractAnalysisState.store';
import { ContractAnalysisResponse } from '@/features/contract-analysis/types/contractAnalysis.types';
import * as contractAnalysisApiClientModule from '@/features/contract-analysis/api/contractAnalysisApiClient';

vi.mock('@/features/contract-analysis/api/contractAnalysisApiClient', () => ({
  contractAnalysisApiClient: {
    analyzeContractFile: vi.fn(),
  },
}));

describe('useContractAnalysisWorkflow', () => {
  let mockAnalyzeContractFile: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    useContractAnalysisStateStore.getState().clearContractAnalysisState();
    mockAnalyzeContractFile = contractAnalysisApiClientModule.contractAnalysisApiClient.analyzeContractFile as ReturnType<typeof vi.fn>;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('initial state', () => {
    it('returns initial state values', () => {
      const { result } = renderHook(() => useContractAnalysisWorkflow());

      expect(result.current.isContractAnalysisInProgress).toBe(false);
      expect(result.current.contractAnalysisResponse).toBeNull();
      expect(result.current.contractAnalysisErrorMessage).toBeNull();
    });
  });

  describe('submitContractForAnalysis', () => {
    it('sets in progress and clears error on call', async () => {
      const mockResponse: ContractAnalysisResponse = {
        originalFileName: 'test.pdf',
        extractedData: {
          contractTitle: 'Test',
          contractType: 'Test',
          parties: [],
          terminationConditions: {
            terminationConditions: [],
            hasAutomaticRenewal: false,
          },
          keyObligations: [],
          confidentialityClauseExists: false,
          nonCompeteClauseExists: false,
          intellectualPropertyClauseExists: false,
        },
        riskAnalysis: {
          overallRiskLevel: 'low',
          riskFlags: [],
          totalHighSeverityRisks: 0,
          totalMediumSeverityRisks: 0,
          totalLowSeverityRisks: 0,
          riskAnalysisSummary: 'Summary',
        },
        summary: {
          oneSentenceDescription: 'Test',
          whatThisContractDoes: 'Test',
          whoIsInvolved: 'Test',
          mainObligationsForEachParty: [],
          importantDatesAndDeadlines: [],
          whatHappensIfThingsGoWrong: 'Test',
          howToGetOut: 'Test',
          threeThingsToKnowBeforeSigning: [],
        },
      };

      mockAnalyzeContractFile.mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useContractAnalysisWorkflow());
      const mockFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });

      await act(async () => {
        await result.current.submitContractForAnalysis(mockFile);
      });

      expect(result.current.isContractAnalysisInProgress).toBe(false);
      expect(result.current.contractAnalysisErrorMessage).toBeNull();
    });

    it('stores response on success', async () => {
      const mockResponse: ContractAnalysisResponse = {
        originalFileName: 'test.pdf',
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
          riskAnalysisSummary: 'Low risk',
        },
        summary: {
          oneSentenceDescription: 'NDA',
          whatThisContractDoes: 'Non-disclosure',
          whoIsInvolved: 'Party A',
          mainObligationsForEachParty: [],
          importantDatesAndDeadlines: [],
          whatHappensIfThingsGoWrong: 'Legal remedies',
          howToGetOut: 'Notice',
          threeThingsToKnowBeforeSigning: ['Confidential'],
        },
      };

      mockAnalyzeContractFile.mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useContractAnalysisWorkflow());
      const mockFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });

      await act(async () => {
        await result.current.submitContractForAnalysis(mockFile);
      });

      expect(result.current.contractAnalysisResponse).toEqual(mockResponse);
    });

    it('stores user-facing error message on failure', async () => {
      mockAnalyzeContractFile.mockRejectedValue(new Error('Network error'));

      const { result } = renderHook(() => useContractAnalysisWorkflow());
      const mockFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });

      await act(async () => {
        await result.current.submitContractForAnalysis(mockFile);
      });

      expect(result.current.contractAnalysisErrorMessage).toBeDefined();
      expect(result.current.contractAnalysisResponse).toBeNull();
    });

    it('resets in progress state after completion', async () => {
      const mockResponse: ContractAnalysisResponse = {
        originalFileName: 'test.pdf',
        extractedData: {
          contractTitle: 'Test',
          contractType: 'Test',
          parties: [],
          terminationConditions: {
            terminationConditions: [],
            hasAutomaticRenewal: false,
          },
          keyObligations: [],
          confidentialityClauseExists: false,
          nonCompeteClauseExists: false,
          intellectualPropertyClauseExists: false,
        },
        riskAnalysis: {
          overallRiskLevel: 'low',
          riskFlags: [],
          totalHighSeverityRisks: 0,
          totalMediumSeverityRisks: 0,
          totalLowSeverityRisks: 0,
          riskAnalysisSummary: 'Summary',
        },
        summary: {
          oneSentenceDescription: 'Test',
          whatThisContractDoes: 'Test',
          whoIsInvolved: 'Test',
          mainObligationsForEachParty: [],
          importantDatesAndDeadlines: [],
          whatHappensIfThingsGoWrong: 'Test',
          howToGetOut: 'Test',
          threeThingsToKnowBeforeSigning: [],
        },
      };

      mockAnalyzeContractFile.mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useContractAnalysisWorkflow());
      const mockFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });

      await act(async () => {
        await result.current.submitContractForAnalysis(mockFile);
      });

      expect(result.current.isContractAnalysisInProgress).toBe(false);
    });
  });
});