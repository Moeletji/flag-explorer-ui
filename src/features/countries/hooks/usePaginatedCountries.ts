import { useState, useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/store';
import { loadAllCountries } from '../slices/countriesSlice';
import { Country } from '../types';

interface FetchCountriesResponse {
  countries: Country[];
  totalCount: number;
}

const paginateCountries = (countries: Country[], page: number, limit: number): FetchCountriesResponse => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedCountries = countries.slice(startIndex, endIndex);
  const totalCount = countries.length;

  return {
    countries: paginatedCountries,
    totalCount: totalCount,
  };
};

interface UsePaginatedCountriesResult {
  countries: Country[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export const usePaginatedCountries = (limit: number): UsePaginatedCountriesResult => {
  const dispatch = useAppDispatch();

  const { items: allCountries, status, error } = useAppSelector((state) => state.countries);

  const [countries, setCountries] = useState<Country[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);

  const totalPages = Math.ceil(totalCount / limit);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(loadAllCountries());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (status === 'succeeded') {
      const { countries: paginatedCountries, totalCount: total } = paginateCountries(allCountries, currentPage, limit);
      setCountries(paginatedCountries);
      setTotalCount(total);
    }
  }, [allCountries, currentPage, limit, status]);

  const handlePageChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  }, []);

  return {
    countries,
    loading: status === 'loading',
    error: status === 'failed' ? error ?? null : null,
    currentPage,
    totalPages,
    handlePageChange,
  };
};