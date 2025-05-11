import React from 'react';
import { Box, Typography, Pagination, Grid } from '@mui/material';
import { usePaginatedCountries } from '../hooks/usePaginatedCountries';
import { CountryGrid } from './CountryGrid'; 
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { ErrorMessage } from '../../../components/ErrorMessage'; 

interface PaginatedCountryListProps {
  itemsPerPage: number;
}

export const PaginatedCountryList: React.FC<PaginatedCountryListProps> = ({ itemsPerPage }) => {
  const { countries, loading, error, currentPage, totalPages, handlePageChange } = usePaginatedCountries(itemsPerPage);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (countries.length === 0 && !loading && !error) {
    return <Typography>No countries found.</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1, mt: 2 }}>
      {/* CountryGrid component to display the current page's countries */}
      {/* We assume CountryGrid accepts a 'countries' prop */}
      <CountryGrid countries={countries} />

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Box>
  );
};