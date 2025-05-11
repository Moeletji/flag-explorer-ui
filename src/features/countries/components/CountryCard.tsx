import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea, Box } from '@mui/material';
import { Country } from '../types';
import { Link } from 'react-router-dom';

interface CountryCardProps {
  country: Country;
}

export const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea component={Link} to={`/country/${country.name}`} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          sx={{
            height: 140, 
            objectFit: 'cover',
            width: '100%'
          }}
          image={country.flag}
          alt={`Flag of ${country.name}`}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="div">
            {country.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};