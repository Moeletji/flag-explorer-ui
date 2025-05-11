import { createSlice, createAsyncThunk, PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { fetchAllCountriesFromBackend, fetchCountryDetailsFromBackend } from '../api/backendApi';
import { Country, CountryDetails } from '../types';

interface CountriesState {
  items: Country[];
  selectedCountry: CountryDetails | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  detailStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
  detailError: string | null | undefined;
}

const initialState: CountriesState = {
  items: [],
  selectedCountry: null,
  status: 'idle',
  detailStatus: 'idle',
  error: null,
  detailError: null,
};

export const loadAllCountries = createAsyncThunk<
  Country[],
  void, 
  { rejectValue: string }
>(
  'countries/loadAllCountries',
  async (_: any, { rejectWithValue }: any) => {
    try {
      const data = await fetchAllCountriesFromBackend();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message || 'Failed to fetch countries');
    }
  }
);

export const loadCountryDetails = createAsyncThunk<
  CountryDetails,
  string,
  { rejectValue: string }
>(
  'countries/loadCountryDetails',
  async (name: string, { rejectWithValue }: any) => {
    try {
      const data = await fetchCountryDetailsFromBackend(name);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message || 'Failed to fetch country details');
    }
  }
);

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    clearSelectedCountry: (state: CountriesState) => {
      state.selectedCountry = null;
      state.detailStatus = 'idle';
      state.detailError = null;
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<CountriesState>) => {
    builder
      .addCase(loadAllCountries.pending, (state: CountriesState) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadAllCountries.fulfilled, (state: { status: string; items: any; }, action: PayloadAction<Country[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadAllCountries.rejected, (state: { status: string; error: any; }, action: { payload: any; }) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(loadCountryDetails.pending, (state: CountriesState) => {
        state.detailStatus = 'loading';
        state.selectedCountry = null;
        state.detailError = null;
      })
      .addCase(loadCountryDetails.fulfilled, (state: { detailStatus: string; selectedCountry: any; }, action: PayloadAction<CountryDetails>) => {
        state.detailStatus = 'succeeded';
        state.selectedCountry = action.payload;
      })
      .addCase(loadCountryDetails.rejected, (state: { detailStatus: string; detailError: any; }, action: { payload: any; }) => {
        state.detailStatus = 'failed';
        state.detailError = action.payload;
      });
  },
});

export const { clearSelectedCountry } = countriesSlice.actions;
export default countriesSlice.reducer;