import { FC, memo, useCallback } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { ArticleList, ArticleView, ArticleViewSelector } from 'entities/Article';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useSelector } from 'react-redux';
import { fetchArticlesList } from '../../model/services/fetchArticlesList';
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { articlePageReducer, articlesPageActions, getArticles } from '../../model/slices/articlesPageSlice';
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
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const error = useSelector(getArticlesPageError);
  const view = useSelector(getArticlesPageView);
  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view));
  }, [dispatch]);
  useInitialEffect(() => {
    dispatch(fetchArticlesList());
    dispatch(articlesPageActions.initState());
  });
  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.articlesPage$, {}, [className])}>
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
        <ArticleList isLoading={isLoading} view={view} articles={articles} />
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
