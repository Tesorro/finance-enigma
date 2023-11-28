import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from '../../types/article';

export const fetchArticleById = createAsyncThunk<Article, string, ThunkConfig<string>>(
  'articleDetails/fetchArticleById',
  async (articleId, { extra, rejectWithValue }) => {
    try {
      const response = await extra.api.get<Article>(`/articles/${articleId}`);

      if (!response.data) {
        throw new Error();
      }

      return response.data; // state.data = action.payload (в extraReducer'е)
    } catch (e) {
      console.log(e);
      return rejectWithValue('error');
    }
  },
);
