import { useState, FormEvent } from 'react';
import { TextField, Button, MenuItem, Box, Typography } from '@mui/material';
import { useProviderConfigurationStore } from '../../store/provider-configuration.store';
import {
  ProviderConfigurationFormSchema,
  PROVIDER_DISPLAY_NAMES,
  DEFAULT_MODEL_PLACEHOLDERS,
  SupportedProvider,
} from '../../types/provider-configuration.types';
import { SectionCard } from '../ui/SectionCard';
import { providerConfigurationFormStyles } from './ProviderConfigurationForm.styles';

const PROVIDER_OPTIONS: SupportedProvider[] = [
  'openai',
  'anthropic',
  'groq',
  'google',
  'minimax',
];

export function ProviderConfigurationForm(): JSX.Element {
  const { savedConfiguration, saveProviderConfiguration } = useProviderConfigurationStore();
  const [providerName, setProviderName] = useState<SupportedProvider>(
    savedConfiguration?.providerName || 'openai',
  );
  const [apiKey, setApiKey] = useState(savedConfiguration?.apiKey || '');
  const [modelIdentifier, setModelIdentifier] = useState(
    savedConfiguration?.modelIdentifier || '',
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    setError(null);

    const result = ProviderConfigurationFormSchema.safeParse({
      providerName,
      apiKey,
      modelIdentifier: modelIdentifier || undefined,
    });

    if (!result.success) {
      const firstError = result.error.errors[0]?.message || 'Invalid configuration';
      setError(firstError);
      return;
    }

    saveProviderConfiguration(result.data);
  };

  return (
    <SectionCard title="AI Provider Configuration">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={providerConfigurationFormStyles.form}
      >
        <Box sx={providerConfigurationFormStyles.field}>
          <Typography
            component="label"
            variant="body2"
            sx={providerConfigurationFormStyles.label}
          >
            Provider
          </Typography>
          <TextField
            select
            value={providerName}
            onChange={(e) => setProviderName(e.target.value as SupportedProvider)}
            sx={providerConfigurationFormStyles.select}
            SelectProps={{
              native: true,
            }}
          >
            {PROVIDER_OPTIONS.map((provider) => (
              <option key={provider} value={provider}>
                {PROVIDER_DISPLAY_NAMES[provider]}
              </option>
            ))}
          </TextField>
        </Box>

        <Box sx={providerConfigurationFormStyles.field}>
          <Typography
            component="label"
            variant="body2"
            sx={providerConfigurationFormStyles.label}
          >
            API Key
          </Typography>
          <TextField
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key"
            sx={providerConfigurationFormStyles.input}
          />
        </Box>

        <Box sx={providerConfigurationFormStyles.field}>
          <Typography
            component="label"
            variant="body2"
            sx={providerConfigurationFormStyles.label}
          >
            Model (Optional)
          </Typography>
          <TextField
            type="text"
            value={modelIdentifier}
            onChange={(e) => setModelIdentifier(e.target.value)}
            placeholder={DEFAULT_MODEL_PLACEHOLDERS[providerName]}
            sx={providerConfigurationFormStyles.input}
          />
        </Box>

        {error && (
          <Typography variant="body2" sx={providerConfigurationFormStyles.error}>
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          sx={
            savedConfiguration
              ? providerConfigurationFormStyles.submitButtonSaved
              : providerConfigurationFormStyles.submitButton
          }
        >
          {savedConfiguration ? 'Update Configuration' : 'Save Configuration'}
        </Button>
      </Box>
    </SectionCard>
  );
}
