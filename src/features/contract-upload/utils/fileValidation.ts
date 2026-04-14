import { ApplicationErrorCode } from '../../../shared/errors/errorCodes';
import { ApplicationError } from '../../../shared/errors/AppError';

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] as const;

const ALLOWED_FILE_EXTENSIONS = ['.pdf', '.docx'] as const;

const MAXIMUM_FILE_SIZE_IN_BYTES = 10 * 1024 * 1024;

const FILE_TYPE_Magic_BYTES: Record<string, Uint8Array> = {
  'application/pdf': new Uint8Array([0x25, 0x50, 0x44, 0x46]),
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': new Uint8Array([
    0x50, 0x4b, 0x03, 0x04,
  ]),
};

export type AllowedMimeType = (typeof ALLOWED_MIME_TYPES)[number];

export interface FileValidationResult {
  isValid: boolean;
  errorCode?: ApplicationErrorCode;
  errorMessage?: string;
}

export async function validateContractFile(file: File): Promise<FileValidationResult> {
  const fileExtension = getFileExtensionFromFileName(file.name);

  if (!fileExtension || !isAllowedFileExtension(fileExtension)) {
    return {
      isValid: false,
      errorCode: ApplicationErrorCode.FILE_TYPE_ERROR,
      errorMessage: `Invalid file type. Allowed types: ${ALLOWED_FILE_EXTENSIONS.join(', ')}`,
    };
  }

  if (file.size > MAXIMUM_FILE_SIZE_IN_BYTES) {
    return {
      isValid: false,
      errorCode: ApplicationErrorCode.FILE_TOO_LARGE_ERROR,
      errorMessage: `File exceeds maximum size of ${MAXIMUM_FILE_SIZE_IN_BYTES / (1024 * 1024)}MB`,
    };
  }

  const hasValidMagicBytes = await validateFileMagicBytes(file);

  if (!hasValidMagicBytes) {
    return {
      isValid: false,
      errorCode: ApplicationErrorCode.FILE_TYPE_ERROR,
      errorMessage: 'File content does not match its extension',
    };
  }

  return { isValid: true };
}

function getFileExtensionFromFileName(fileName: string): string {
  const lastDotIndex = fileName.lastIndexOf('.');
  if (lastDotIndex === -1) return '';
  return fileName.substring(lastDotIndex).toLowerCase();
}

function isAllowedFileExtension(extension: string): boolean {
  return ALLOWED_FILE_EXTENSIONS.includes(extension as typeof ALLOWED_FILE_EXTENSIONS[number]);
}

async function validateFileMagicBytes(file: File): Promise<boolean> {
  const fileArrayBuffer = await file.slice(0, 4).arrayBuffer();
  const fileMagicBytes = new Uint8Array(fileArrayBuffer);

  for (const expectedMagicBytes of Object.values(FILE_TYPE_Magic_BYTES)) {
    if (arraysAreEqual(fileMagicBytes, expectedMagicBytes)) {
      return true;
    }
  }

  return false;
}

function arraysAreEqual(array1: Uint8Array, array2: Uint8Array): boolean {
  if (array1.length !== array2.length) return false;
  for (let index = 0; index < array1.length; index++) {
    if (array1[index] !== array2[index]) return false;
  }
  return true;
}

export function createFileValidationError(
  errorCode: ApplicationErrorCode,
  errorMessage: string,
): ApplicationError {
  return new ApplicationError({
    errorCode,
    userFacingMessage: errorMessage,
    isRetryable: false,
  });
}

export { MAXIMUM_FILE_SIZE_IN_BYTES, ALLOWED_FILE_EXTENSIONS, ALLOWED_MIME_TYPES };