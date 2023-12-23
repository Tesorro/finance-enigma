import { FC, memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { fetchNextArticlePage } from '../../model/services/fetchNextArticlePage';
import { initArticlesPage } from '../../model/services/initArticlesPage';
import { articlePageReducer } from '../../model/slices/articlesPageSlice';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { ArticlePageFilters } from '../ArticlePageFilters/ArticlePageFilters';

import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { Page } from '@/widgets/Page';

import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlePageReducer,
};

const ArticlesPage: FC<ArticlesPageProps> = (props) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlePage());
  }, [dispatch]);
  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams));
  });
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page onScrollEnd={onLoadNextPart} className={classNames(cls.articlesPage$, {}, [className])}>
        <ArticlePageFilters />
        <ArticleInfiniteList className={cls.list} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
