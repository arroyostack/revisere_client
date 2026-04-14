import { z } from 'zod';

export const ProviderConfigurationFormSchema = z.object({
  providerName: z.enum(['openai', 'anthropic', 'groq', 'google', 'minimax']),
  apiKey: z.string().min(1, 'API key is required'),
  modelIdentifier: z.string().optional(),
});

export type ProviderConfiguration = z.infer<typeof ProviderConfigurationFormSchema>;

export type SupportedProvider = ProviderConfiguration['providerName'];

export const PROVIDER_DISPLAY_NAMES: Record<SupportedProvider, string> = {
  openai: 'OpenAI',
  anthropic: 'Anthropic (Claude)',
  groq: 'Groq',
  google: 'Google Gemini',
  minimax: 'MiniMax',
};

export const DEFAULT_MODEL_PLACEHOLDERS: Record<SupportedProvider, string> = {
  openai: 'Default: gpt-4o',
  anthropic: 'Default: claude-sonnet-4-20250514',
  groq: 'Default: llama-3.3-70b-versatile',
  google: 'Default: gemini-1.5-pro',
  minimax: 'Default: abab6.5s-chat',
};
