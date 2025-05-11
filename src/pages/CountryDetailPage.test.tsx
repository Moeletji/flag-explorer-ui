import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CountryDetailPage from './CountryDetailPage'; 
import { CountryDetails } from '../features/countries/types/index';

const API_BASE_URL = process.env.REACT_APP_API_URL;

describe('CountryDetailPage', () => {
  const countryName = 'DetailedLand';
  const mockCountryDetailData: CountryDetails = {
    name: countryName,
    flag: 'detailed.svg',
    population: 98765,
    capital: 'DetailCity',
  };

  const renderPage = (initialEntry = `/country/${countryName}`) => {
    render(
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path="/country/:name" element={<CountryDetailPage />} />
        </Routes>
      </MemoryRouter>
    );
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders loading state then country details', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockCountryDetailData,
    } as Response);

    renderPage();

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(countryName)).toBeInTheDocument();
      expect(screen.getByText(mockCountryDetailData.population.toLocaleString())).toBeInTheDocument();
      expect(screen.getByText(mockCountryDetailData.capital)).toBeInTheDocument();
      expect(screen.getByAltText(`Flag of ${countryName}`)).toHaveAttribute('src', 'detailed.svg');
    });
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('renders error message if API call fails', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ message: 'Failed to fetch details' }),
    } as Response);

    renderPage();

    await waitFor(() => {
      expect(screen.getByText(`Could not load details for ${countryName}`)).toBeInTheDocument();
      expect(screen.getByText(/Failed to fetch details/i)).toBeInTheDocument();
    });
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('renders "Country details not found." if API returns 404 (or data is null after success)', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({ message: 'Not Found From API' }),
    } as Response);

    renderPage();

    await waitFor(() => {
      expect(screen.getByText(`Could not load details for ${countryName}`)).toBeInTheDocument();
      expect(screen.getByText(/Not Found From API/i)).toBeInTheDocument();
    });
  });
});
