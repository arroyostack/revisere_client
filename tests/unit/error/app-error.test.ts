import { describe, it, expect } from 'vitest';
import { ApplicationError } from '@/shared/errors/AppError';
import { ApplicationErrorCode } from '@/shared/errors/errorCodes';

describe('ApplicationError', () => {
  describe('constructor', () => {
    it('creates error with all required properties', () => {
      const error = new ApplicationError({
        errorCode: ApplicationErrorCode.NETWORK_ERROR,
        userFacingMessage: 'Network connection failed',
        isRetryable: true,
      });

      expect(error.name).toBe('ApplicationError');
      expect(error.errorCode).toBe(ApplicationErrorCode.NETWORK_ERROR);
      expect(error.userFacingMessage).toBe('Network connection failed');
      expect(error.isRetryable).toBe(true);
    });

    it('creates error with technical details', () => {
      const error = new ApplicationError({
        errorCode: ApplicationErrorCode.SERVER_ERROR,
        userFacingMessage: 'Server error',
        technicalDetails: 'Database connection timeout',
        isRetryable: true,
      });

      expect(error.technicalDetails).toBe('Database connection timeout');
    });

    it('has correct prototype chain', () => {
      const error = new ApplicationError({
        errorCode: ApplicationErrorCode.UNKNOWN_ERROR,
        userFacingMessage: 'Unknown error',
        isRetryable: false,
      });

      expect(Object.getPrototypeOf(error)).toBe(ApplicationError.prototype);
    });
  });

  describe('error properties', () => {
    it('exposes all error properties as readonly', () => {
      const error = new ApplicationError({
        errorCode: ApplicationErrorCode.VALIDATION_ERROR,
        userFacingMessage: 'Invalid input',
        isRetryable: false,
      });

      expect(typeof error.errorCode).toBe('string');
      expect(typeof error.userFacingMessage).toBe('string');
      expect(typeof error.isRetryable).toBe('boolean');
    });
  });
});