import { describe, it, expect, beforeEach } from 'vitest';
import { useContractAnalysisStateStore } from '@/features/contract-analysis/state/contractAnalysisState.store';
import { ContractAnalysisResponse } from '@/features/contract-analysis/types/contractAnalysis.types';

describe('useContractAnalysisStateStore', () => {
  beforeEach(() => {
    useContractAnalysisStateStore.getState().clearContractAnalysisState();
  });

  describe('initial state', () => {
    it('has null contractAnalysisResponse', () => {
      expect(useContractAnalysisStateStore.getState().contractAnalysisResponse).toBeNull();
    });

    it('has isContractAnalysisInProgress as false', () => {
      expect(useContractAnalysisStateStore.getState().isContractAnalysisInProgress).toBe(false);
    });

    it('has null contractAnalysisErrorMessage', () => {
      expect(useContractAnalysisStateStore.getState().contractAnalysisErrorMessage).toBeNull();
    });
  });

  describe('setContractAnalysisResponse', () => {
    it('sets the contract analysis response', () => {
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

      useContractAnalysisStateStore.getState().setContractAnalysisResponse(mockResponse);

      expect(useContractAnalysisStateStore.getState().contractAnalysisResponse).toEqual(mockResponse);
    });

    it('clears error message when setting response', () => {
      useContractAnalysisStateStore.getState().setContractAnalysisErrorMessage('Previous error');

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

      useContractAnalysisStateStore.getState().setContractAnalysisResponse(mockResponse);

      expect(useContractAnalysisStateStore.getState().contractAnalysisErrorMessage).toBeNull();
    });
  });

  describe('setContractAnalysisInProgress', () => {
    it('sets in progress state to true', () => {
      useContractAnalysisStateStore.getState().setContractAnalysisInProgress(true);
      expect(useContractAnalysisStateStore.getState().isContractAnalysisInProgress).toBe(true);
    });

    it('sets in progress state to false', () => {
      useContractAnalysisStateStore.getState().setContractAnalysisInProgress(true);
      useContractAnalysisStateStore.getState().setContractAnalysisInProgress(false);
      expect(useContractAnalysisStateStore.getState().isContractAnalysisInProgress).toBe(false);
    });
  });

  describe('setContractAnalysisErrorMessage', () => {
    it('sets the error message', () => {
      useContractAnalysisStateStore.getState().setContractAnalysisErrorMessage('Analysis failed');
      expect(useContractAnalysisStateStore.getState().contractAnalysisErrorMessage).toBe('Analysis failed');
    });

    it('can clear the error message', () => {
      useContractAnalysisStateStore.getState().setContractAnalysisErrorMessage('Error');
      useContractAnalysisStateStore.getState().setContractAnalysisErrorMessage(null);
      expect(useContractAnalysisStateStore.getState().contractAnalysisErrorMessage).toBeNull();
    });
  });

  describe('clearContractAnalysisState', () => {
    it('resets all state to initial values', () => {
      useContractAnalysisStateStore.getState().setContractAnalysisInProgress(true);
      useContractAnalysisStateStore.getState().setContractAnalysisErrorMessage('Some error');

      useContractAnalysisStateStore.getState().clearContractAnalysisState();

      const state = useContractAnalysisStateStore.getState();
      expect(state.contractAnalysisResponse).toBeNull();
      expect(state.isContractAnalysisInProgress).toBe(false);
      expect(state.contractAnalysisErrorMessage).toBeNull();
    });
  });
});