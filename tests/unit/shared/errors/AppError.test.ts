import { describe, it, expect } from 'vitest';
import { ApplicationError } from '@/shared/errors/AppError';
import { ApplicationErrorCode } from '@/shared/errors/errorCodes';

describe('ApplicationError', () => {
  describe('constructor', () => {
    it('should create error with all properties', () => {
      const error = new ApplicationError({
        errorCode: ApplicationErrorCode.NETWORK_ERROR,
        userFacingMessage: 'Unable to connect',
        technicalDetails: 'Network request failed',
        isRetryable: true,
      });

      expect(error.name).toBe('ApplicationError');
      expect(error.errorCode).toBe(ApplicationErrorCode.NETWORK_ERROR);
      expect(error.userFacingMessage).toBe('Unable to connect');
      expect(error.technicalDetails).toBe('Network request failed');
      expect(error.isRetryable).toBe(true);
      expect(error.message).toBe('Unable to connect');
    });

    it('should create error without technical details', () => {
      const error = new ApplicationError({
        errorCode: ApplicationErrorCode.VALIDATION_ERROR,
        userFacingMessage: 'Invalid input',
        isRetryable: false,
      });

      expect(error.technicalDetails).toBeUndefined();
      expect(error.message).toBe('Invalid input');
    });

    it('should set prototype correctly for instanceof checks', () => {
      const error = new ApplicationError({
        errorCode: ApplicationErrorCode.SERVER_ERROR,
        userFacingMessage: 'Server error',
        isRetryable: true,
      });

      expect(error instanceof Error).toBe(true);
      expect(error instanceof ApplicationError).toBe(true);
    });
  });

  describe('error code handling', () => {
    it('should handle NETWORK_ERROR code', () => {
      const error = new ApplicationError({
        errorCode: ApplicationErrorCode.NETWORK_ERROR,
        userFacingMessage: 'Network error',
        isRetryable: true,
      });

      expect(error.errorCode).toBe(ApplicationErrorCode.NETWORK_ERROR);
    });

    it('should handle TIMEOUT_ERROR code', () => {
      const error = new ApplicationError({
        errorCode: ApplicationErrorCode.TIMEOUT_ERROR,
        userFacingMessage: 'Timeout error',
        isRetryable: true,
      });

      expect(error.errorCode).toBe(ApplicationErrorCode.TIMEOUT_ERROR);
    });

    it('should handle VALIDATION_ERROR code', () => {
      const error = new ApplicationError({
        errorCode: ApplicationErrorCode.VALIDATION_ERROR,
        userFacingMessage: 'Validation error',
        isRetryable: false,
      });

      expect(error.errorCode).toBe(ApplicationErrorCode.VALIDATION_ERROR);
    });

    it('should handle SERVER_ERROR code', () => {
      const error = new ApplicationError({
        errorCode: ApplicationErrorCode.SERVER_ERROR,
        userFacingMessage: 'Server error',
        isRetryable: true,
      });

      expect(error.errorCode).toBe(ApplicationErrorCode.SERVER_ERROR);
    });

    it('should handle UNAUTHORIZED_ERROR code', () => {
      const error = new ApplicationError({
        errorCode: ApplicationErrorCode.UNAUTHORIZED_ERROR,
        userFacingMessage: 'Unauthorized',
        isRetryable: false,
      });

      expect(error.errorCode).toBe(ApplicationErrorCode.UNAUTHORIZED_ERROR);
    });

    it('should handle FILE_TOO_LARGE_ERROR code', () => {
      const error = new ApplicationError({
        errorCode: ApplicationErrorCode.FILE_TOO_LARGE_ERROR,
        userFacingMessage: 'File too large',
        isRetryable: true,
      });

      expect(error.errorCode).toBe(ApplicationErrorCode.FILE_TOO_LARGE_ERROR);
    });

    it('should handle FILE_TYPE_ERROR code', () => {
      const error = new ApplicationError({
        errorCode: ApplicationErrorCode.FILE_TYPE_ERROR,
        userFacingMessage: 'Invalid file type',
        isRetryable: false,
      });

      expect(error.errorCode).toBe(ApplicationErrorCode.FILE_TYPE_ERROR);
    });

    it('should handle UNKNOWN_ERROR code', () => {
      const error = new ApplicationError({
        errorCode: ApplicationErrorCode.UNKNOWN_ERROR,
        userFacingMessage: 'Unknown error',
        isRetryable: true,
      });

      expect(error.errorCode).toBe(ApplicationErrorCode.UNKNOWN_ERROR);
    });
  });
});