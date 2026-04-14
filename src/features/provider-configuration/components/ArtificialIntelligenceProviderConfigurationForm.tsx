import { useState, FormEvent } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useProviderConfigurationStore } from '../state/providerConfigurationState.store';
import {
  PROVIDER_DISPLAY_NAMES,
  DEFAULT_MODEL_PLACEHOLDERS,
  SupportedProvider,
} from '../types/providerConfiguration.types';
import { SectionCard } from '../../../shared/ui/SectionCard/SectionCard';
import { providerConfigurationFormStyles } from './ArtificialIntelligenceProviderConfigurationForm.styles';

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
  const [modelIdentifier, setModelIdentifier] = useState(
    savedConfiguration?.modelIdentifier || '',
  );

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    saveProviderConfiguration({
      providerName,
      modelIdentifier: modelIdentifier || undefined,
    });
  };

  return (
    <SectionCard sectionTitle="AI Provider Configuration">
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