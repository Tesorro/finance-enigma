import { createAsyncThunk } from '@reduxjs/toolkit';

import { Article } from '../../types/article';

import { ThunkConfig } from '@/app/providers/StoreProvider';

export const fetchArticleById = createAsyncThunk<Article, string | undefined, ThunkConfig<string>>(
  'articleDetails/fetchArticleById',
  async (articleId, { extra, rejectWithValue }) => {
    try {
      if (!articleId) {
        throw new Error('отсутсвует id статьи');
      }
      const response = await extra.api.get<Article>(`/articles/${articleId}`, {
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
