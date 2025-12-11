// src/components/ThemeToggle.tsx
import React from 'react';
import { IconButton, useColorMode, Tooltip } from '@chakra-ui/react';
// icons package (install with npm install @chakra-ui/icons)
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const ThemeToggle: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Tooltip label={colorMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
      <IconButton
        aria-label="Toggle color mode"
        onClick={toggleColorMode}
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        size="sm"
        variant="ghost"
      />
    </Tooltip>
  );
};

export default ThemeToggle;
