// Configurable color palette
/*export const theme = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // Main primary
    600: '#2563eb', // Main primary dark
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  accent: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
  },
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
};
*/
// Elegant & Professional Theme for Nival Cloud Solutions
export const theme = {
  primary: {
    50: '#f5f8ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#4f46e5', // Main primary (deep indigo blue)
    600: '#4338ca', // Darker shade
    700: '#3730a3',
    800: '#312e81',
    900: '#1e1b4b',
  },
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b', // Neutral gray-blue tone for text/UI
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  accent: {
    50: '#fdfcfb',
    100: '#f4e9e1',
    200: '#ead6c8',
    300: '#d8bfa8',
    400: '#c9a983',
    500: '#b99460', // Muted gold accent (professional luxury)
    600: '#9c7b4b',
    700: '#7f6239',
    800: '#634c2b',
    900: '#4b3a20',
  },
  success: '#16a34a', // Refined green
  error: '#dc2626',   // Professional red tone
  warning: '#eab308', // Warm but controlled yellow
  info: '#2563eb',    // Deep tech blue for informational elements
};

// Helper function to get CSS variables
export const getThemeCSS = () => {
  return `
    :root {
      --color-primary: ${theme.primary[600]};
      --color-primary-light: ${theme.primary[500]};
      --color-primary-dark: ${theme.primary[700]};
      --color-secondary: ${theme.secondary[600]};
      --color-accent: ${theme.accent[600]};
      --color-success: ${theme.success};
      --color-error: ${theme.error};
      --color-warning: ${theme.warning};
      --color-info: ${theme.info};
    }
  `;
};

