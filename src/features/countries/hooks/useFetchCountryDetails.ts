import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/store';
import { loadCountryDetails, clearSelectedCountry } from '../slices/countriesSlice';
import { CountryDetails } from '../types';

export interface DataFetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useFetchCountryDetails = (countryName: string | undefined): DataFetchState<CountryDetails> => {
  const dispatch = useAppDispatch();
  const { selectedCountry, detailStatus, detailError } = useAppSelector((state) => state.countries);

  useEffect(() => {
    if (!countryName) {
      dispatch(clearSelectedCountry());
      return;
    }

    dispatch(loadCountryDetails(countryName));

    return () => {
      dispatch(clearSelectedCountry());
    };
  }, [dispatch, countryName]);

  return {
    data: selectedCountry,
    loading: detailStatus === 'loading',
    error: detailStatus === 'failed' ? detailError ?? null : null,
  };
};
