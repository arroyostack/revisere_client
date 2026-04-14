import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useContractComparisonWorkflow } from '@/features/contract-comparison/hooks/useContractComparisonWorkflow';
import { useContractComparisonStateStore } from '@/features/contract-comparison/state/contractComparisonState.store';
import { ContractComparisonResult } from '@/features/contract-comparison/types/contractComparison.types';
import * as contractComparisonApiClientModule from '@/features/contract-comparison/api/contractComparisonApiClient';

vi.mock('@/features/contract-comparison/api/contractComparisonApiClient', () => ({
  contractComparisonApiClient: {
    compareContractFiles: vi.fn(),
  },
}));

describe('useContractComparisonWorkflow', () => {
  let mockCompareContractFiles: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    useContractComparisonStateStore.getState().clearContractComparisonState();
    mockCompareContractFiles = contractComparisonApiClientModule.contractComparisonApiClient.compareContractFiles as ReturnType<typeof vi.fn>;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('initial state', () => {
    it('returns initial state values', () => {
      const { result } = renderHook(() => useContractComparisonWorkflow());

      expect(result.current.isContractComparisonInProgress).toBe(false);
      expect(result.current.contractComparisonResult).toBeNull();
      expect(result.current.contractComparisonErrorMessage).toBeNull();
    });
  });

  describe('submitContractsForComparison', () => {
    it('sets in progress and clears error on call', async () => {
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

      mockCompareContractFiles.mockResolvedValue(mockResult);

      const { result } = renderHook(() => useContractComparisonWorkflow());
      const mockOriginalFile = new File(['original'], 'original.pdf', { type: 'application/pdf' });
      const mockRevisedFile = new File(['revised'], 'revised.pdf', { type: 'application/pdf' });

      await act(async () => {
        await result.current.submitContractsForComparison(mockOriginalFile, mockRevisedFile);
      });

      expect(result.current.isContractComparisonInProgress).toBe(false);
      expect(result.current.contractComparisonErrorMessage).toBeNull();
    });

    it('stores result on success', async () => {
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

      mockCompareContractFiles.mockResolvedValue(mockResult);

      const { result } = renderHook(() => useContractComparisonWorkflow());
      const mockOriginalFile = new File(['original'], 'original.pdf', { type: 'application/pdf' });
      const mockRevisedFile = new File(['revised'], 'revised.pdf', { type: 'application/pdf' });

      await act(async () => {
        await result.current.submitContractsForComparison(mockOriginalFile, mockRevisedFile);
      });

      expect(result.current.contractComparisonResult).toEqual(mockResult);
    });

    it('stores user-facing error message on failure', async () => {
      mockCompareContractFiles.mockRejectedValue(new Error('Network error'));

      const { result } = renderHook(() => useContractComparisonWorkflow());
      const mockOriginalFile = new File(['original'], 'original.pdf', { type: 'application/pdf' });
      const mockRevisedFile = new File(['revised'], 'revised.pdf', { type: 'application/pdf' });

      await act(async () => {
        await result.current.submitContractsForComparison(mockOriginalFile, mockRevisedFile);
      });

      expect(result.current.contractComparisonErrorMessage).toBeDefined();
      expect(result.current.contractComparisonResult).toBeNull();
    });

    it('resets in progress state after completion', async () => {
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

      mockCompareContractFiles.mockResolvedValue(mockResult);

      const { result } = renderHook(() => useContractComparisonWorkflow());
      const mockOriginalFile = new File(['original'], 'original.pdf', { type: 'application/pdf' });
      const mockRevisedFile = new File(['revised'], 'revised.pdf', { type: 'application/pdf' });

      await act(async () => {
        await result.current.submitContractsForComparison(mockOriginalFile, mockRevisedFile);
      });

      expect(result.current.isContractComparisonInProgress).toBe(false);
    });
  });
});