import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from './app/store';
import HomePage from './pages/HomePage';
import CountryDetailPage from './pages/CountryDetailPage';
import { theme } from './theme/theme';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Box } from '@mui/material';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh', 
          }}
        >
          <Router>
            <Header />
            <Box component="main" sx={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/country/:name" element={<CountryDetailPage />} />
              </Routes>
            </Box>
            <br />
            <Footer />
          </Router>
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;