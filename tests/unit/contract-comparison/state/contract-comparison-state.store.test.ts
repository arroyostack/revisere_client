import { describe, it, expect, beforeEach } from 'vitest';
import { useContractComparisonStateStore } from '@/features/contract-comparison/state/contractComparisonState.store';
import { ContractComparisonResult } from '@/features/contract-comparison/types/contractComparison.types';

describe('useContractComparisonStateStore', () => {
  beforeEach(() => {
    useContractComparisonStateStore.getState().clearContractComparisonState();
  });

  describe('initial state', () => {
    it('has null contractComparisonResult', () => {
      expect(useContractComparisonStateStore.getState().contractComparisonResult).toBeNull();
    });

    it('has isContractComparisonInProgress as false', () => {
      expect(useContractComparisonStateStore.getState().isContractComparisonInProgress).toBe(false);
    });

    it('has null contractComparisonErrorMessage', () => {
      expect(useContractComparisonStateStore.getState().contractComparisonErrorMessage).toBeNull();
    });
  });

  describe('setContractComparisonResult', () => {
    it('sets the contract comparison result', () => {
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

      useContractComparisonStateStore.getState().setContractComparisonResult(mockResult);

      expect(useContractComparisonStateStore.getState().contractComparisonResult).toEqual(mockResult);
    });

    it('clears error message when setting result', () => {
      useContractComparisonStateStore.getState().setContractComparisonErrorMessage('Previous error');

      const mockResult: ContractComparisonResult = {
        firstContractTitle: 'Original',
        secondContractTitle: 'Revised',
        overallAssessment: 'Assessment',
        totalChangesDetected: 0,
        identifiedChanges: [],
        clausesAddedInSecondContract: [],
        clausesRemovedFromFirstContract: [],
        whichVersionIsFavorable: 'roughly_equal',
        favorabilityExplanation: 'Equal',
        recommendationBeforeSigning: 'None',
      };

      useContractComparisonStateStore.getState().setContractComparisonResult(mockResult);

      expect(useContractComparisonStateStore.getState().contractComparisonErrorMessage).toBeNull();
    });
  });

  describe('setContractComparisonInProgress', () => {
    it('sets in progress state to true', () => {
      useContractComparisonStateStore.getState().setContractComparisonInProgress(true);
      expect(useContractComparisonStateStore.getState().isContractComparisonInProgress).toBe(true);
    });

    it('sets in progress state to false', () => {
      useContractComparisonStateStore.getState().setContractComparisonInProgress(true);
      useContractComparisonStateStore.getState().setContractComparisonInProgress(false);
      expect(useContractComparisonStateStore.getState().isContractComparisonInProgress).toBe(false);
    });
  });

  describe('setContractComparisonErrorMessage', () => {
    it('sets the error message', () => {
      useContractComparisonStateStore.getState().setContractComparisonErrorMessage('Comparison failed');
      expect(useContractComparisonStateStore.getState().contractComparisonErrorMessage).toBe('Comparison failed');
    });

    it('can clear the error message', () => {
      useContractComparisonStateStore.getState().setContractComparisonErrorMessage('Error');
      useContractComparisonStateStore.getState().setContractComparisonErrorMessage(null);
      expect(useContractComparisonStateStore.getState().contractComparisonErrorMessage).toBeNull();
    });
  });

  describe('clearContractComparisonState', () => {
    it('resets all state to initial values', () => {
      useContractComparisonStateStore.getState().setContractComparisonInProgress(true);
      useContractComparisonStateStore.getState().setContractComparisonErrorMessage('Some error');

      useContractComparisonStateStore.getState().clearContractComparisonState();

      const state = useContractComparisonStateStore.getState();
      expect(state.contractComparisonResult).toBeNull();
      expect(state.isContractComparisonInProgress).toBe(false);
      expect(state.contractComparisonErrorMessage).toBeNull();
    });
  });
});