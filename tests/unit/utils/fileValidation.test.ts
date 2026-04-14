import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  validateContractFile,
  MAXIMUM_FILE_SIZE_IN_BYTES,
  ALLOWED_FILE_EXTENSIONS,
  createFileValidationError,
} from '../../../src/features/contract-upload/utils/fileValidation';
import { ApplicationErrorCode } from '../../../src/shared/errors/errorCodes';

describe('fileValidation', () => {
  describe('validateContractFile', () => {
    describe('when file extension is invalid', () => {
      it('should return invalid result with FILE_TYPE_ERROR', async () => {
        const invalidFile = new File(['test'], 'contract.txt', { type: 'text/plain' });
        const result = await validateContractFile(invalidFile);

        expect(result.isValid).toBe(false);
        expect(result.errorCode).toBe(ApplicationErrorCode.FILE_TYPE_ERROR);
      });
    });

    describe('when file size exceeds maximum', () => {
      it('should return invalid result with FILE_TOO_LARGE_ERROR', async () => {
        const largeContent = new Array(MAXIMUM_FILE_SIZE_IN_BYTES + 1).fill('x').join('');
        const largeFile = new File([largeContent], 'contract.pdf', { type: 'application/pdf' });
        const result = await validateContractFile(largeFile);

        expect(result.isValid).toBe(false);
        expect(result.errorCode).toBe(ApplicationErrorCode.FILE_TOO_LARGE_ERROR);
      });
    });

    describe('when file has valid extension but invalid magic bytes', () => {
      it('should return invalid result with FILE_TYPE_ERROR', async () => {
        const mismatchedFile = new File(
          ['not a pdf content'],
          'document.pdf',
          { type: 'application/pdf' },
        );
        const result = await validateContractFile(mismatchedFile);

        expect(result.isValid).toBe(false);
        expect(result.errorCode).toBe(ApplicationErrorCode.FILE_TYPE_ERROR);
      });
    });

    describe('when file passes all validations', () => {
      it('should return valid result', async () => {
        const pdfMagicBytes = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x0d]);
        const validPdfFile = new File([pdfMagicBytes], 'contract.pdf', {
          type: 'application/pdf',
        });
        const result = await validateContractFile(validPdfFile);

        expect(result.isValid).toBe(true);
        expect(result.errorCode).toBeUndefined();
      });
    });
  });

  describe('createFileValidationError', () => {
    it('should create ApplicationError with correct properties', () => {
      const error = createFileValidationError(
        ApplicationErrorCode.FILE_TYPE_ERROR,
        'Invalid file type',
      );

      expect(error.errorCode).toBe(ApplicationErrorCode.FILE_TYPE_ERROR);
      expect(error.userFacingMessage).toBe('Invalid file type');
      expect(error.isRetryable).toBe(false);
    });
  });
});