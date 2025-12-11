// src/theme.ts
import { extendTheme } from '@chakra-ui/react';
import type { ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

// global styles ensure body text & background are set for both modes
const styles = {
  global: {
    // body background + default text color for light/dark
    body: {
      bg: 'gray.50',
      color: 'gray.800',
      _dark: {
        bg: 'gray.800',
        color: 'gray.100',
      },
    },
    // ensure headings and other elements inherit readable color
    'h1, h2, h3, h4, h5, h6': {
      color: 'inherit',
    },
    // inputs/texts should also inherit correct color
    input: {
      color: 'inherit',
      background: 'transparent',
    },
  },
};

const theme = extendTheme({ config, styles });

export default theme;
