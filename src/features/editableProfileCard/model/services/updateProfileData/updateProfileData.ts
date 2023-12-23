import { createAsyncThunk } from '@reduxjs/toolkit';

import { ValidateProfileError } from '../../consts/consts';
import { getProfileForm } from '../../selectors/getProfileForm';
import { validateProfileData } from '../validateProfileData/validateProfileData';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '@/entities/Profile';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<ValidateProfileError[]>>(
  'profile/updateProfileData',
  async (_, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    const formData = getProfileForm(getState());
    const errors = validateProfileData(formData);
    if (errors.length) {
      return rejectWithValue(errors);
    }
    try {
      const response = await extra.api.put<Profile>(`/profile/${formData?.id}`, formData);

      return response.data; // state.data = action.payload (в extraReducer'е)
    } catch (e) {
      console.log(e);
      return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
    }
  },
);
