export interface RetryableOperationConfiguration {
  maximumRetryAttempts: number;
  initialDelayInMilliseconds: number;
  maximumDelayInMilliseconds: number;
  backoffMultiplier: number;
}

export const defaultRetryConfiguration: RetryableOperationConfiguration = {
  maximumRetryAttempts: 3,
  initialDelayInMilliseconds: 1000,
  maximumDelayInMilliseconds: 10000,
  backoffMultiplier: 2,
};

export async function executeWithRetry<T>(
  operation: () => Promise<T>,
  retryConfiguration: RetryableOperationConfiguration = defaultRetryConfiguration,
  isRetryableError?: (error: unknown) => boolean,
): Promise<T> {
  let lastError: unknown;
  let currentDelay = retryConfiguration.initialDelayInMilliseconds;

  for (
    let attemptNumber = 0;
    attemptNumber <= retryConfiguration.maximumRetryAttempts;
    attemptNumber++
  ) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      const shouldRetry =
        isRetryableError
          ? isRetryableError(error)
          : attemptNumber < retryConfiguration.maximumRetryAttempts;

      if (!shouldRetry) {
        throw error;
      }

      if (attemptNumber < retryConfiguration.maximumRetryAttempts) {
        await sleep(currentDelay);
        currentDelay = Math.min(
          currentDelay * retryConfiguration.backoffMultiplier,
          retryConfiguration.maximumDelayInMilliseconds,
        );
      }
    }
  }

  throw lastError;
}

function sleep(delayInMilliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delayInMilliseconds));
}

export function isRetryableBasedOnStatusCode(httpStatusCode: number): boolean {
  return httpStatusCode >= 500 || httpStatusCode === 429;
}