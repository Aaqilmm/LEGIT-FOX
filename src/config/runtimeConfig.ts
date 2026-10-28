/**
 * Runtime configuration loaded from environment variables.
 * This ensures safe, typed access to configuration throughout the application.
 */

export type DataMode = 'mock' | 'api';

interface RuntimeConfig {
  dataMode: DataMode;
  apiBaseUrl: string;
}

function getDataMode(): DataMode {
  const mode = import.meta.env.VITE_DATA_MODE || 'mock';
  if (mode !== 'mock' && mode !== 'api') {
    console.warn(`Invalid VITE_DATA_MODE "${mode}", defaulting to "mock"`);
    return 'mock';
  }
  return mode;
}

export const runtimeConfig: RuntimeConfig = {
  dataMode: getDataMode(),
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
};

export const isDemoMode = runtimeConfig.dataMode === 'mock';
