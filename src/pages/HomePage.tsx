import React from 'react';
import { Container, Typography, Box, Pagination } from '@mui/material';
import { usePaginatedCountries } from '../features/countries/hooks/usePaginatedCountries';
import { CountryGrid } from '../features/countries/components/CountryGrid';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';

const HomePage: React.FC = () => {
  const { countries, loading, error, currentPage, totalPages, handlePageChange } = usePaginatedCountries(12);

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mt: 4, mb: 4 }}>
        Countries of the World
      </Typography>

      <Box sx={{ mt: 4 }}>
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && countries && countries.length > 0 && (
          <>
            <CountryGrid countries={countries} />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          </>
        )}
        {!loading && !error && countries && countries.length === 0 && (
          <Typography align="center">No countries found.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;