import React from 'react';
import { Box } from '@mui/material';
import { Country } from '../types';
import { CountryCard } from './CountryCard';

interface CountryGridProps {
  countries: Country[];
}

export const CountryGrid: React.FC<CountryGridProps> = ({ countries }) => {
  if (!countries || countries.length === 0) {
    return null;
  }

  return (
    <Box 
      display="grid" 
      gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))" 
      gap={16}
    >
      {countries.map((country) => (
        <Box key={country.name}>
          <CountryCard country={country} />
        </Box>
      ))}
    </Box>
  );
};