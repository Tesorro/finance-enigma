import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { IProfile } from '../../types/profile';

export const fetchProfileData = createAsyncThunk<IProfile, void, ThunkConfig<string>>(
  'profile/fetchProfileData',
  async (_, { extra, rejectWithValue }) => {
    try {
      const response = await extra.api.get<IProfile>('/profile');

      return response.data; // state.data = action.payload (в extraReducer'е)
    } catch (e) {
      console.log(e);
      return rejectWithValue('error');
    }
  },
);
