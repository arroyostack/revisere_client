import { z } from 'zod';

export type SupportedProvider = 'openai' | 'anthropic' | 'groq' | 'google' | 'minimax';

export const PROVIDER_DISPLAY_NAMES: Record<SupportedProvider, string> = {
  openai: 'OpenAI',
  anthropic: 'Anthropic',
  groq: 'Groq',
  google: 'Google',
  minimax: 'MiniMax',
};

export const DEFAULT_MODEL_PLACEHOLDERS: Record<SupportedProvider, string> = {
  openai: 'gpt-4o-mini',
  anthropic: 'claude-3-5-haiku-latest',
  groq: 'llama-3.1-70b-versatile',
  google: 'gemini-2.0-flash',
  minimax: 'MiniMax-Text-01',
};

export const ProviderConfigurationFormSchema = z.object({
  providerName: z.enum(['openai', 'anthropic', 'groq', 'google', 'minimax']),
  modelIdentifier: z.string().optional(),
});

export interface ProviderConfiguration {
  providerName: SupportedProvider;
  modelIdentifier?: string;
}