import { describe, it, expect, beforeEach } from 'vitest';
import { useContractAnalysisStateStore } from '@/features/contract-analysis/state/contractAnalysisState.store';
import { ContractAnalysisResponse } from '@/features/contract-analysis/types/contractAnalysis.types';

describe('useContractAnalysisStateStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useContractAnalysisStateStore.getState().clearContractAnalysisState();
  });

  describe('initial state', () => {
    it('should have null contract analysis response', () => {
      const { contractAnalysisResponse } = useContractAnalysisStateStore.getState();
      expect(contractAnalysisResponse).toBeNull();
    });

    it('should have isContractAnalysisInProgress as false', () => {
      const { isContractAnalysisInProgress } = useContractAnalysisStateStore.getState();
      expect(isContractAnalysisInProgress).toBe(false);
    });

    it('should have null contract analysis error message', () => {
      const { contractAnalysisErrorMessage } = useContractAnalysisStateStore.getState();
      expect(contractAnalysisErrorMessage).toBeNull();
    });
  });

  describe('setContractAnalysisResponse', () => {
    it('should set the contract analysis response', () => {
      const mockResponse: ContractAnalysisResponse = {
        summary: 'Test summary',
        risks: [],
        clauses: [],
      };

      useContractAnalysisStateStore.getState().setContractAnalysisResponse(
        mockResponse,
      );

      const { contractAnalysisResponse } = useContractAnalysisStateStore.getState();
      expect(contractAnalysisResponse).toEqual(mockResponse);
    });

    it('should clear error message when response is set', () => {
      // First set an error
      useContractAnalysisStateStore
        .getState()
        .setContractAnalysisErrorMessage('Previous error');

      // Then set a response
      const mockResponse: ContractAnalysisResponse = {
        summary: 'Test summary',
        risks: [],
        clauses: [],
      };
      useContractAnalysisStateStore
        .getState()
        .setContractAnalysisResponse(mockResponse);

      const { contractAnalysisErrorMessage } = useContractAnalysisStateStore.getState();
      expect(contractAnalysisErrorMessage).toBeNull();
    });
  });

  describe('setContractAnalysisInProgress', () => {
    it('should set in progress to true', () => {
      useContractAnalysisStateStore
        .getState()
        .setContractAnalysisInProgress(true);

      const { isContractAnalysisInProgress } = useContractAnalysisStateStore.getState();
      expect(isContractAnalysisInProgress).toBe(true);
    });

    it('should set in progress to false', () => {
      useContractAnalysisStateStore
        .getState()
        .setContractAnalysisInProgress(true);
      useContractAnalysisStateStore
        .getState()
        .setContractAnalysisInProgress(false);

      const { isContractAnalysisInProgress } = useContractAnalysisStateStore.getState();
      expect(isContractAnalysisInProgress).toBe(false);
    });
  });

  describe('setContractAnalysisErrorMessage', () => {
    it('should set the error message', () => {
      useContractAnalysisStateStore
        .getState()
        .setContractAnalysisErrorMessage('Network error');

      const { contractAnalysisErrorMessage } = useContractAnalysisStateStore.getState();
      expect(contractAnalysisErrorMessage).toBe('Network error');
    });

    it('should allow setting null to clear error', () => {
      useContractAnalysisStateStore
        .getState()
        .setContractAnalysisErrorMessage('Error');
      useContractAnalysisStateStore
        .getState()
        .setContractAnalysisErrorMessage(null);

      const { contractAnalysisErrorMessage } = useContractAnalysisStateStore.getState();
      expect(contractAnalysisErrorMessage).toBeNull();
    });
  });

  describe('clearContractAnalysisState', () => {
    it('should reset all state to initial values', () => {
      // Set some state
      const mockResponse: ContractAnalysisResponse = {
        summary: 'Test summary',
        risks: [],
        clauses: [],
      };
      useContractAnalysisStateStore
        .getState()
        .setContractAnalysisResponse(mockResponse);
      useContractAnalysisStateStore
        .getState()
        .setContractAnalysisInProgress(true);
      useContractAnalysisStateStore
        .getState()
        .setContractAnalysisErrorMessage('Some error');

      // Clear state
      useContractAnalysisStateStore.getState().clearContractAnalysisState();

      // Verify all reset
      const state = useContractAnalysisStateStore.getState();
      expect(state.contractAnalysisResponse).toBeNull();
      expect(state.isContractAnalysisInProgress).toBe(false);
      expect(state.contractAnalysisErrorMessage).toBeNull();
    });
  });

  describe('state transitions', () => {
    it('should handle full workflow: start → success', () => {
      // Start in progress
      useContractAnalysisStateStore
        .getState()
        .setContractAnalysisInProgress(true);
      expect(
        useContractAnalysisStateStore.getState().isContractAnalysisInProgress,
      ).toBe(true);

      // Complete with response
      const mockResponse: ContractAnalysisResponse = {
        summary: 'Test summary',
        risks: [],
        clauses: [],
      };
      useContractAnalysisStateStore
        .getState()
        .setContractAnalysisResponse(mockResponse);
      useContractAnalysisStateStore
        .getState()
        .setContractAnalysisInProgress(false);

      const state = useContractAnalysisStateStore.getState();
      expect(state.contractAnalysisResponse).toEqual(mockResponse);
      expect(state.isContractAnalysisInProgress).toBe(false);
    });

    it('should handle full workflow: start → error', () => {
      // Start in progress
      useContractAnalysisStateStore
        .getState()
        .setContractAnalysisInProgress(true);

      // Complete with error
      useContractAnalysisStateStore
        .getState()
        .setContractAnalysisErrorMessage('Analysis failed');
      useContractAnalysisStateStore
        .getState()
        .setContractAnalysisInProgress(false);

      const state = useContractAnalysisStateStore.getState();
      expect(state.contractAnalysisErrorMessage).toBe('Analysis failed');
      expect(state.isContractAnalysisInProgress).toBe(false);
    });
  });
});