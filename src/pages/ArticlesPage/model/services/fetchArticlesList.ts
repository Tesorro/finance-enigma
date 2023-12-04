import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';

export const fetchArticlesList = createAsyncThunk<Article[], void, ThunkConfig<string>>(
  'articlesPage/fetchArticlesList',
  async (articleId, { extra, rejectWithValue }) => {
    try {
      const response = await extra.api.get<Article[]>('/articles', {
        params: {
          _expand: 'user',
        },
      });

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
