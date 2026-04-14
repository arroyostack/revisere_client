import { ApplicationErrorCode } from './errorCodes';

export interface ApplicationErrorProperties {
  errorCode: ApplicationErrorCode;
  userFacingMessage: string;
  technicalDetails?: string;
  isRetryable: boolean;
}

export class ApplicationError extends Error {
  public readonly errorCode: ApplicationErrorCode;
  public readonly userFacingMessage: string;
  public readonly technicalDetails: string | undefined;
  public readonly isRetryable: boolean;

  constructor(properties: ApplicationErrorProperties) {
    super(properties.userFacingMessage);
    this.name = 'ApplicationError';
    this.errorCode = properties.errorCode;
    this.userFacingMessage = properties.userFacingMessage;
    this.technicalDetails = properties.technicalDetails;
    this.isRetryable = properties.isRetryable;
    Object.setPrototypeOf(this, ApplicationError.prototype);
  }
}