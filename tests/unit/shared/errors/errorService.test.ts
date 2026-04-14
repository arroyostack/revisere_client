import { describe, it, expect, beforeEach } from 'vitest';
import { ErrorService } from '@/shared/errors/errorService';
import { ApplicationError } from '@/shared/errors/AppError';
import { ApplicationErrorCode, HttpStatusCode } from '@/shared/errors/errorCodes';

describe('ErrorService', () => {
  describe('mapHttpStatusToError', () => {
    describe('when status code has a defined mapping', () => {
      it('should map BAD_REQUEST (400) to VALIDATION_ERROR', () => {
        const result = ErrorService.mapHttpStatusToError(
          HttpStatusCode.BAD_REQUEST,
          'Custom fallback message',
        );

        expect(result.errorCode).toBe(ApplicationErrorCode.VALIDATION_ERROR);
        expect(result.isRetryable).toBe(false);
        expect(result.userFacingMessage).toBe(
          'The request could not be processed. Please check your input and try again.',
        );
      });

      it('should map UNAUTHORIZED (401) to UNAUTHORIZED_ERROR', () => {
        const result = ErrorService.mapHttpStatusToError(
          HttpStatusCode.UNAUTHORIZED,
          'Fallback message',
        );

        expect(result.errorCode).toBe(ApplicationErrorCode.UNAUTHORIZED_ERROR);
        expect(result.isRetryable).toBe(false);
        expect(result.userFacingMessage).toBe(
          'You are not authorized to perform this action. Please log in and try again.',
        );
      });

      it('should map FORBIDDEN (403) to UNAUTHORIZED_ERROR', () => {
        const result = ErrorService.mapHttpStatusToError(
          HttpStatusCode.FORBIDDEN,
          'Fallback message',
        );

        expect(result.errorCode).toBe(ApplicationErrorCode.UNAUTHORIZED_ERROR);
        expect(result.isRetryable).toBe(false);
        expect(result.userFacingMessage).toBe(
          'You do not have permission to perform this action.',
        );
      });

      it('should map PAYLOAD_TOO_LARGE (413) to FILE_TOO_LARGE_ERROR with retry enabled', () => {
        const result = ErrorService.mapHttpStatusToError(
          HttpStatusCode.PAYLOAD_TOO_LARGE,
          'Fallback message',
        );

        expect(result.errorCode).toBe(ApplicationErrorCode.FILE_TOO_LARGE_ERROR);
        expect(result.isRetryable).toBe(true);
        expect(result.userFacingMessage).toBe(
          'The file is too large. Please upload a smaller file.',
        );
      });

      it('should map INTERNAL_SERVER_ERROR (500) to SERVER_ERROR', () => {
        const result = ErrorService.mapHttpStatusToError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'Custom fallback',
        );

        expect(result.errorCode).toBe(ApplicationErrorCode.SERVER_ERROR);
        expect(result.isRetryable).toBe(true);
        expect(result.userFacingMessage).toBe(
          'Something went wrong on our end. Please try again later.',
        );
      });

      it('should map SERVICE_UNAVAILABLE (503) to SERVER_ERROR with retry enabled', () => {
        const result = ErrorService.mapHttpStatusToError(
          HttpStatusCode.SERVICE_UNAVAILABLE,
          'Fallback message',
        );

        expect(result.errorCode).toBe(ApplicationErrorCode.SERVER_ERROR);
        expect(result.isRetryable).toBe(true);
        expect(result.userFacingMessage).toBe(
          'The service is temporarily unavailable. Please try again later.',
        );
      });
    });

    describe('when status code has no defined mapping', () => {
      it('should return VALIDATION_ERROR for unknown 4xx status', () => {
        const result = ErrorService.mapHttpStatusToError(418, 'I am a teapot');

        expect(result.errorCode).toBe(ApplicationErrorCode.VALIDATION_ERROR);
        expect(result.isRetryable).toBe(false);
        expect(result.userFacingMessage).toBe('I am a teapot');
      });

      it('should return SERVER_ERROR for unknown 5xx status', () => {
        const result = ErrorService.mapHttpStatusToError(502, 'Bad gateway message');

        expect(result.errorCode).toBe(ApplicationErrorCode.SERVER_ERROR);
        expect(result.isRetryable).toBe(true);
        expect(result.userFacingMessage).toBe('Bad gateway message');
      });

      it('should fall back to UNKNOWN_ERROR for invalid status codes', () => {
        const result = ErrorService.mapHttpStatusToError(200, 'Success message');

        expect(result.errorCode).toBe(ApplicationErrorCode.SERVER_ERROR);
        expect(result.isRetryable).toBe(true);
        expect(result.userFacingMessage).toBe('Success message');
      });
    });
  });

  describe('createFromFetchError', () => {
    describe('when httpStatusCode is provided', () => {
      it('should use the mapping based on HTTP status', () => {
        const error = ErrorService.createFromFetchError(
          new Error('Network request failed'),
          'Analysis failed',
          413,
        );

        expect(error.errorCode).toBe(ApplicationErrorCode.FILE_TOO_LARGE_ERROR);
        expect(error.isRetryable).toBe(true);
        expect(error.userFacingMessage).toBe(
          'The file is too large. Please upload a smaller file.',
        );
      });
    });

    describe('when httpStatusCode is not provided', () => {
      it('should detect network errors containing "Failed to fetch"', () => {
        const networkError = new Error('Failed to fetch');
        const error = ErrorService.createFromFetchError(networkError, 'Default message');

        expect(error.errorCode).toBe(ApplicationErrorCode.NETWORK_ERROR);
        expect(error.isRetryable).toBe(true);
        expect(error.userFacingMessage).toBe(
          'Unable to connect to the server. Please check your internet connection and try again.',
        );
      });

      it('should detect network errors containing "NetworkError"', () => {
        const networkError = new Error('NetworkError: Connection refused');
        const error = ErrorService.createFromFetchError(networkError, 'Default message');

        expect(error.errorCode).toBe(ApplicationErrorCode.NETWORK_ERROR);
        expect(error.isRetryable).toBe(true);
      });

      it('should detect network errors containing "network" (lowercase)', () => {
        const networkError = new Error('network unavailable');
        const error = ErrorService.createFromFetchError(networkError, 'Default message');

        expect(error.errorCode).toBe(ApplicationErrorCode.NETWORK_ERROR);
      });

      it('should detect timeout errors containing "timeout"', () => {
        const timeoutError = new Error('Request timeout');
        const error = ErrorService.createFromFetchError(timeoutError, 'Default message');

        expect(error.errorCode).toBe(ApplicationErrorCode.TIMEOUT_ERROR);
        expect(error.isRetryable).toBe(true);
        expect(error.userFacingMessage).toBe(
          'The request took too long. Please try again.',
        );
      });

      it('should detect abort errors containing "aborted"', () => {
        const abortError = new Error('fetch operation aborted');
        const error = ErrorService.createFromFetchError(abortError, 'Default message');

        expect(error.errorCode).toBe(ApplicationErrorCode.TIMEOUT_ERROR);
        expect(error.isRetryable).toBe(true);
      });

      it('should return UNKNOWN_ERROR for generic Error instances', () => {
        const genericError = new Error('Something went wrong');
        const error = ErrorService.createFromFetchError(genericError, 'Fallback');

        expect(error.errorCode).toBe(ApplicationErrorCode.UNKNOWN_ERROR);
        expect(error.isRetryable).toBe(true);
        expect(error.technicalDetails).toBe('Something went wrong');
      });

      it('should handle non-Error objects gracefully', () => {
        const error = ErrorService.createFromFetchError('String error', 'Fallback message');

        expect(error.errorCode).toBe(ApplicationErrorCode.UNKNOWN_ERROR);
        expect(error.technicalDetails).toBe('String error');
      });

      it('should handle null gracefully', () => {
        const error = ErrorService.createFromFetchError(null, 'Fallback message');

        expect(error.errorCode).toBe(ApplicationErrorCode.UNKNOWN_ERROR);
        expect(error.technicalDetails).toBe('null');
      });

      it('should handle undefined gracefully', () => {
        const error = ErrorService.createFromFetchError(undefined, 'Fallback message');

        expect(error.errorCode).toBe(ApplicationErrorCode.UNKNOWN_ERROR);
        expect(error.technicalDetails).toBe('undefined');
      });
    });
  });

  describe('logErrorToConsole', () => {
    it('should log error with all relevant properties', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const testError = new ApplicationError({
        errorCode: ApplicationErrorCode.NETWORK_ERROR,
        userFacingMessage: 'Test message',
        technicalDetails: 'Technical details',
        isRetryable: true,
      });

      ErrorService.logErrorToConsole(testError);

      expect(consoleSpy).toHaveBeenCalledWith('Application Error:', {
        errorCode: ApplicationErrorCode.NETWORK_ERROR,
        message: 'Test message',
        technicalDetails: 'Technical details',
        isRetryable: true,
        stack: testError.stack,
      });

      consoleSpy.mockRestore();
    });
  });
});