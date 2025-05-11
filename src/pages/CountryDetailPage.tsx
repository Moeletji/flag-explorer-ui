import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import { CountryDetailView } from '../features/countries/components/CountryDetailView';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { useFetchCountryDetails } from '../features/countries/hooks/useFetchCountryDetails';

const CountryDetailPage: React.FC = () => {
  const { name } = useParams<{ name: string }>(); 

  const { data: country, loading, error } = useFetchCountryDetails(name);

  return (
    <Container maxWidth="lg">
       <Box sx={{ mt: 4, mb: 4 }}>
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && country && (
          <CountryDetailView country={country} />
        )}
         {!loading && !error && !country && !error && (
             <Typography align="center">Country not found or no data.</Typography>
         )}
       </Box>
    </Container>
  );
};

export default CountryDetailPage;