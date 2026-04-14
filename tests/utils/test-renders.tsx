import type { ReactElement, ReactNode } from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { vi } from 'vitest';

/**
 * Custom render function that wraps components with necessary providers
 * Follows React Testing Library best practices
 */
function render(
  ui: ReactElement,
  renderOptions?: Omit<RenderOptions, 'wrapper'>,
) {
  return rtlRender(ui, renderOptions);
}

/**
 * Creates a mock function with a specific return value
 * Useful for mocking API calls or callbacks
 */
function createMockFunction<T extends (...args: unknown[]) => unknown>(
  returnValue: ReturnType<T>,
): jest.Mock<ReturnType<T>, Parameters<T>> {
  return vi.fn(() => returnValue) as jest.Mock<ReturnType<T>, Parameters<T>>;
}

/**
 * Creates a mock Error object for testing error handling
 */
function createMockError(message: string): Error {
  return new Error(message);
}

/**
 * Creates a mock File object for testing file uploads
 */
function createMockFile(
  fileName: string,
  fileContent: string,
  mimeType: string = 'application/pdf',
): File {
  const blob = new Blob([fileContent], { type: mimeType });
  return new File([blob], fileName, { type: mimeType });
}

/**
 * Wait for a condition to be true
 * Useful for testing async state changes
 */
async function waitForCondition(
  condition: () => boolean,
  options?: { timeout?: number; interval?: number },
): Promise<void> {
  const { timeout = 1000, interval = 16 } = options || {};
  const startTime = Date.now();

  while (condition()) {
    if (Date.now() - startTime > timeout) {
      throw new Error('Timeout waiting for condition');
    }
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
}

export { render, createMockFunction, createMockError, createMockFile, waitForCondition };
export { rtlRender as renderWithoutProviders };
export { render as renderWithProviders };