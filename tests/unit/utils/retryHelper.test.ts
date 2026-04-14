import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  executeWithRetry,
  defaultRetryConfiguration,
  isRetryableBasedOnStatusCode,
} from '../../../src/shared/utils/retryHelper';

describe('retryHelper', () => {
  describe('executeWithRetry', () => {
    describe('when operation succeeds on first attempt', () => {
      it('should return result without retries', async () => {
        const operation = vi.fn().mockResolvedValue('success');
        const result = await executeWithRetry(operation);

        expect(result).toBe('success');
        expect(operation).toHaveBeenCalledTimes(1);
      });
    });

    describe('when operation fails and succeeds on retry', () => {
      it('should retry and return successful result', async () => {
        const operation = vi
          .fn()
          .mockRejectedValueOnce(new Error('Temporary failure'))
          .mockResolvedValue('success');

        const result = await executeWithRetry(operation);

        expect(result).toBe('success');
        expect(operation).toHaveBeenCalledTimes(2);
      });
    });

    describe('when operation always fails', () => {
      it('should throw error after all retries exhausted', async () => {
        const operation = vi.fn().mockRejectedValue(new Error('Persistent failure'));

        await expect(() => executeWithRetry(operation)).rejects.toThrow('Persistent failure');
        expect(operation).toHaveBeenCalledTimes(
          defaultRetryConfiguration.maximumRetryAttempts + 1,
        );
      }, 15000);
    });

    describe('when isRetryableError is provided', () => {
      it('should only retry based on custom logic', async () => {
        const operation = vi
          .fn()
          .mockRejectedValueOnce({ status: 429 })
          .mockResolvedValue('success');

        const isRetryableError = (error: unknown): boolean =>
          error && typeof error === 'object' && 'status' in error && error.status === 429;

        const result = await executeWithRetry(operation, defaultRetryConfiguration, isRetryableError);

        expect(result).toBe('success');
      });
    });
  });

  describe('isRetryableBasedOnStatusCode', () => {
    it('should return true for 5xx status codes', () => {
      expect(isRetryableBasedOnStatusCode(500)).toBe(true);
      expect(isRetryableBasedOnStatusCode(502)).toBe(true);
      expect(isRetryableBasedOnStatusCode(503)).toBe(true);
    });

    it('should return true for 429 status code', () => {
      expect(isRetryableBasedOnStatusCode(429)).toBe(true);
    });

    it('should return false for 4xx status codes', () => {
      expect(isRetryableBasedOnStatusCode(400)).toBe(false);
      expect(isRetryableBasedOnStatusCode(401)).toBe(false);
      expect(isRetryableBasedOnStatusCode(404)).toBe(false);
    });
  });
});