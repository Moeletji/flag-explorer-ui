import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Chip } from '@mui/material';
import { CountryDetails } from '../types';

interface CountryDetailViewProps {
  country: CountryDetails;
}

export const CountryDetailView: React.FC<CountryDetailViewProps> = ({ country }) => {
  if (!country) {
    return <Typography>No country data available.</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1, mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        {country.name}
      </Typography>
      <Card>
        <Box
          display="grid"
          gridTemplateColumns={{ xs: '1fr', md: '1fr 2fr' }}
          gap={4}
          sx={{ p: 2 }}
        >
          <Box>
            <CardMedia
              component="img"
              sx={{
                width: '100%',
                maxHeight: 300,
                objectFit: 'contain', 
              }}
              image={country.flag}
              alt={`Flag of ${country.name}`}
            />
          </Box>
          <Box>
            <CardContent>
              <Typography variant="h6" gutterBottom>Details:</Typography>

              {country.capital && (
                <Typography variant="body1" gutterBottom>
                  <strong>Capital:</strong> {country.capital}
                </Typography>
              )}

              {country.population !== undefined && country.population !== null && (
                <Typography variant="body1" gutterBottom>
                  <strong>Population:</strong> {country.population.toLocaleString()}
                </Typography>
              )}
            </CardContent>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};