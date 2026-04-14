import { create } from 'zustand';
import { ProviderConfiguration } from '../types/provider-configuration.types';

interface ProviderConfigurationStore {
  savedConfiguration: ProviderConfiguration | null;
  saveProviderConfiguration: (configuration: ProviderConfiguration) => void;
  clearProviderConfiguration: () => void;
}

export const useProviderConfigurationStore = create<ProviderConfigurationStore>((set) => ({
  savedConfiguration: null,
  saveProviderConfiguration: (configuration: ProviderConfiguration) =>
    set({ savedConfiguration: configuration }),
  clearProviderConfiguration: () => set({ savedConfiguration: null }),
}));
