import axios from 'axios';
import { Country, CountryDetails } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL ?? 'http://localhost:3000/api';

if (!API_BASE_URL) {
  console.error("Error: REACT_APP_API_URL is not defined. Frontend won't be able to connect to the backend.");
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API call error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const fetchAllCountriesFromBackend = async (): Promise<Country[]> => {
  const response = await apiClient.get<Country[]>('/countries');
  return response.data;
};

export const fetchCountryDetailsFromBackend = async (name: string): Promise<CountryDetails> => {
  const response = await apiClient.get<CountryDetails>(`/countries/${encodeURIComponent(name)}`);
  return response.data;
};
