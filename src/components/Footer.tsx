import React from 'react';
import { Box, Typography } from '@mui/material';

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto', 
        py: 2,
        textAlign: 'center',
        backgroundColor: 'primary.main',
        color: 'white',
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Country Explorer. All rights reserved.
      </Typography>
    </Box>
  );
};