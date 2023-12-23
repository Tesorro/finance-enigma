import { createAsyncThunk } from '@reduxjs/toolkit';

import { getArticlesPageInited } from '../../model/selectors/articlesPageSelectors';
import { fetchArticlesList } from '../../model/services/fetchArticlesList';
import { articlesPageActions } from '../../model/slices/articlesPageSlice';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ArticleSortField } from '@/entities/Article';
import { SortOrder } from '@/shared/types';

export const initArticlesPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
  'articlesPage/initArticlesPage',
  async (searchParams, {
    extra, rejectWithValue, getState, dispatch,
  }) => {
    const inited = getArticlesPageInited(getState());
    if (!inited) {
      const orderFromURL = searchParams.get('order') as SortOrder;
      const sortFromURL = searchParams.get('sort') as ArticleSortField;
      const searchFromURL = searchParams.get('search');
      if (orderFromURL) {
        dispatch(articlesPageActions.setOrder(orderFromURL));
      }

      if (sortFromURL) {
        dispatch(articlesPageActions.setSort(sortFromURL));
      }

      if (searchFromURL) {
        dispatch(articlesPageActions.setSearch(searchFromURL));
      }
      dispatch(articlesPageActions.initState());
      dispatch(fetchArticlesList({}));
    }
  },
);
