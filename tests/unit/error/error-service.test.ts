import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ErrorService } from '@/shared/errors/errorService';
import { ApplicationError } from '@/shared/errors/AppError';
import { ApplicationErrorCode, HttpStatusCode } from '@/shared/errors/errorCodes';

describe('ErrorService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createFromFetchError', () => {
    describe('with http status code', () => {
      it('creates error for BAD_REQUEST', () => {
        const error = ErrorService.createFromFetchError(
          new Error('Invalid input'),
          'Validation failed',
          HttpStatusCode.BAD_REQUEST,
        );

        expect(error).toBeInstanceOf(ApplicationError);
        expect(error.errorCode).toBe(ApplicationErrorCode.VALIDATION_ERROR);
        expect(error.isRetryable).toBe(false);
      });

      it('creates error for UNAUTHORIZED', () => {
        const error = ErrorService.createFromFetchError(
          new Error('Unauthorized'),
          'Access denied',
          HttpStatusCode.UNAUTHORIZED,
        );

        expect(error.errorCode).toBe(ApplicationErrorCode.UNAUTHORIZED_ERROR);
        expect(error.isRetryable).toBe(false);
      });

      it('creates error for FORBIDDEN', () => {
        const error = ErrorService.createFromFetchError(
          new Error('Forbidden'),
          'Access denied',
          HttpStatusCode.FORBIDDEN,
        );

        expect(error.errorCode).toBe(ApplicationErrorCode.UNAUTHORIZED_ERROR);
      });

      it('creates error for PAYLOAD_TOO_LARGE', () => {
        const error = ErrorService.createFromFetchError(
          new Error('File too large'),
          'File too large',
          HttpStatusCode.PAYLOAD_TOO_LARGE,
        );

        expect(error.errorCode).toBe(ApplicationErrorCode.FILE_TOO_LARGE_ERROR);
        expect(error.isRetryable).toBe(true);
      });

      it('creates error for INTERNAL_SERVER_ERROR', () => {
        const error = ErrorService.createFromFetchError(
          new Error('Server error'),
          'Internal error',
          HttpStatusCode.INTERNAL_SERVER_ERROR,
        );

        expect(error.errorCode).toBe(ApplicationErrorCode.SERVER_ERROR);
        expect(error.isRetryable).toBe(true);
      });

      it('creates error for SERVICE_UNAVAILABLE', () => {
        const error = ErrorService.createFromFetchError(
          new Error('Service down'),
          'Service unavailable',
          HttpStatusCode.SERVICE_UNAVAILABLE,
        );

        expect(error.errorCode).toBe(ApplicationErrorCode.SERVER_ERROR);
        expect(error.isRetryable).toBe(true);
      });
    });

    describe('without http status code', () => {
      it('creates NETWORK_ERROR for network failure', () => {
        const networkError = new Error('Failed to fetch');
        const error = ErrorService.createFromFetchError(networkError, 'Network failed');

        expect(error.errorCode).toBe(ApplicationErrorCode.NETWORK_ERROR);
        expect(error.isRetryable).toBe(true);
      });

      it('creates TIMEOUT_ERROR for timeout', () => {
        const timeoutError = new Error('Request timeout');
        const error = ErrorService.createFromFetchError(timeoutError, 'Request timed out');

        expect(error.errorCode).toBe(ApplicationErrorCode.TIMEOUT_ERROR);
        expect(error.isRetryable).toBe(true);
      });

      it('creates UNKNOWN_ERROR for generic error', () => {
        const genericError = new Error('Something went wrong');
        const error = ErrorService.createFromFetchError(genericError, 'Unknown error');

        expect(error.errorCode).toBe(ApplicationErrorCode.UNKNOWN_ERROR);
      });

      it('handles non-Error input', () => {
        const error = ErrorService.createFromFetchError('string error', 'Fallback message');

        expect(error.errorCode).toBe(ApplicationErrorCode.UNKNOWN_ERROR);
        expect(error.technicalDetails).toBe('string error');
      });
    });
  });

  describe('logErrorToConsole', () => {
    it('logs error with all properties', () => {
      const consoleSpy = vi.spyOn(console, 'error');
      const error = new ApplicationError({
        errorCode: ApplicationErrorCode.NETWORK_ERROR,
        userFacingMessage: 'Network error',
        technicalDetails: 'Connection refused',
        isRetryable: true,
      });

      ErrorService.logErrorToConsole(error);

      expect(consoleSpy).toHaveBeenCalledWith('Application Error:', {
        errorCode: ApplicationErrorCode.NETWORK_ERROR,
        message: 'Network error',
        technicalDetails: 'Connection refused',
        isRetryable: true,
        stack: error.stack,
      });
    });
  });
});