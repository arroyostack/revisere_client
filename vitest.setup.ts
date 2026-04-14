import { beforeAll, afterAll, vi } from 'vitest';

beforeAll(() => {
  vi.spyOn(console, 'error').mockImplementation(() => undefined);
  vi.spyOn(console, 'warn').mockImplementation(() => undefined);
});

afterAll(() => {
  vi.resetAllMocks();
});