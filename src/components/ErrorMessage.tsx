import React from 'react';
import { Box, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message = 'An unexpected error occurred.' }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="150px"
      color="error.main"
      textAlign="center"
      p={2}
    >
      <ErrorOutlineIcon sx={{ fontSize: 48, mb: 1 }} />
      <Typography variant="h6" color="error.main">
        Error
      </Typography>
      <Typography variant="body1">
        {message}
      </Typography>
    </Box>
  );
};