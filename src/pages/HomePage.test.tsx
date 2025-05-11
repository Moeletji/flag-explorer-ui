import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';
import { Country } from '../features/countries/types/index';

const API_BASE_URL = process.env.REACT_APP_API_URL;

describe('HomePage', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders loading state initially, then displays countries', async () => {
    const mockCountriesData: Country[] = [
      { name: 'Country A', flag: 'a.svg' },
      { name: 'Country B', flag: 'b.svg' },
    ];

    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockCountriesData,
    } as Response);

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Country A')).toBeInTheDocument();
      expect(screen.getByText('Country B')).toBeInTheDocument();
    });

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();

    expect(screen.getByAltText('Flag of Country A')).toBeInTheDocument();
    expect(screen.getByAltText('Flag of Country B')).toBeInTheDocument();
  });

  it('renders error message if API call fails', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ message: 'Network Error' }),
    } as Response);

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Could not load countries')).toBeInTheDocument();
      expect(screen.getByText(/Network Error/i)).toBeInTheDocument();
    });
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('renders "No countries found." if API returns empty array', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => [],
    } as Response);

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No countries found.')).toBeInTheDocument();
    });
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
});