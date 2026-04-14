import { ApplicationErrorCode, HttpStatusCode } from './errorCodes';
import { ApplicationError, ApplicationErrorProperties } from './AppError';

interface ErrorMappingConfiguration {
  statusCode: HttpStatusCode;
  errorCode: ApplicationErrorCode;
  userFacingMessage: string;
  isRetryable: boolean;
}

const httpStatusErrorMappings: ErrorMappingConfiguration[] = [
  {
    statusCode: HttpStatusCode.BAD_REQUEST,
    errorCode: ApplicationErrorCode.VALIDATION_ERROR,
    userFacingMessage: 'The request could not be processed. Please check your input and try again.',
    isRetryable: false,
  },
  {
    statusCode: HttpStatusCode.UNAUTHORIZED,
    errorCode: ApplicationErrorCode.UNAUTHORIZED_ERROR,
    userFacingMessage: 'You are not authorized to perform this action. Please log in and try again.',
    isRetryable: false,
  },
  {
    statusCode: HttpStatusCode.FORBIDDEN,
    errorCode: ApplicationErrorCode.UNAUTHORIZED_ERROR,
    userFacingMessage: 'You do not have permission to perform this action.',
    isRetryable: false,
  },
  {
    statusCode: HttpStatusCode.PAYLOAD_TOO_LARGE,
    errorCode: ApplicationErrorCode.FILE_TOO_LARGE_ERROR,
    userFacingMessage: 'The file is too large. Please upload a smaller file.',
    isRetryable: true,
  },
  {
    statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    errorCode: ApplicationErrorCode.SERVER_ERROR,
    userFacingMessage: 'Something went wrong on our end. Please try again later.',
    isRetryable: true,
  },
  {
    statusCode: HttpStatusCode.SERVICE_UNAVAILABLE,
    errorCode: ApplicationErrorCode.SERVER_ERROR,
    userFacingMessage: 'The service is temporarily unavailable. Please try again later.',
    isRetryable: true,
  },
];

export class ErrorService {
  private static mapHttpStatusToError(
    httpStatusCode: number,
    fallbackMessage: string,
  ): ApplicationErrorProperties {
    const matchingMapping = httpStatusErrorMappings.find(
      (mapping) => mapping.statusCode === httpStatusCode,
    );

    if (matchingMapping) {
      return {
        errorCode: matchingMapping.errorCode,
        userFacingMessage: matchingMapping.userFacingMessage,
        isRetryable: matchingMapping.isRetryable,
      };
    }

    if (httpStatusCode >= 400 && httpStatusCode < 500) {
      return {
        errorCode: ApplicationErrorCode.VALIDATION_ERROR,
        userFacingMessage: fallbackMessage || 'The request could not be processed.',
        isRetryable: false,
      };
    }

    return {
      errorCode: ApplicationErrorCode.SERVER_ERROR,
      userFacingMessage: fallbackMessage || 'Something went wrong. Please try again.',
      isRetryable: true,
    };
  }

  public static createFromFetchError(
    fetchError: unknown,
    fallbackErrorMessage: string,
    httpStatusCode?: number,
  ): ApplicationError {
    if (httpStatusCode) {
      const errorProperties = this.mapHttpStatusToError(httpStatusCode, fallbackErrorMessage);
      return new ApplicationError({
        ...errorProperties,
        technicalDetails: fallbackErrorMessage,
      });
    }

    if (fetchError instanceof Error) {
      const isNetworkError = fetchError.message.includes('Failed to fetch') ||
        fetchError.message.includes('NetworkError') ||
        fetchError.message.includes('network');

      if (isNetworkError) {
        return new ApplicationError({
          errorCode: ApplicationErrorCode.NETWORK_ERROR,
          userFacingMessage: 'Unable to connect to the server. Please check your internet connection and try again.',
          technicalDetails: fetchError.message,
          isRetryable: true,
        });
      }

      const isTimeoutError = fetchError.message.includes('timeout') ||
        fetchError.message.includes('aborted');

      if (isTimeoutError) {
        return new ApplicationError({
          errorCode: ApplicationErrorCode.TIMEOUT_ERROR,
          userFacingMessage: 'The request took too long. Please try again.',
          technicalDetails: fetchError.message,
          isRetryable: true,
        });
      }
    }

    return new ApplicationError({
      errorCode: ApplicationErrorCode.UNKNOWN_ERROR,
      userFacingMessage: fallbackErrorMessage || 'An unexpected error occurred. Please try again.',
      technicalDetails: fetchError instanceof Error ? fetchError.message : String(fetchError),
      isRetryable: true,
    });
  }

  public static logErrorToConsole(error: ApplicationError): void {
    console.error('Application Error:', {
      errorCode: error.errorCode,
      message: error.userFacingMessage,
      technicalDetails: error.technicalDetails,
      isRetryable: error.isRetryable,
      stack: error.stack,
    });
  }
}