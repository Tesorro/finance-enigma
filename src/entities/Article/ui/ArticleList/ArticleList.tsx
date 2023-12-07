import { FC, memo, useCallback } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { ArticleListItemSkeleton } from 'entities/Article/ui/ArticleListItem/ArticleListItemSkeleton';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import cls from './ArticleList.module.scss';
import { Article, ArticleView } from '../../model/types/article';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 9 : 3)
  .fill(0)
  .map((item, index) => (
    <ArticleListItemSkeleton className={cls.card} view={view} key={index} />
  ));

export const ArticleList: FC<ArticleListProps> = memo((props) => {
  const {
    className, articles, view = ArticleView.SMALL, isLoading,
  } = props;

  const renderArticle = useCallback((article: Article) => (
    <ArticleListItem article={article} view={view} className={cls.card} key={article.id} />
  ), [view]);

  return (
    <div className={classNames(cls.articleListItem, {}, [className, cls[view]])}>
      {articles.length > 0
        ? articles.map(renderArticle)
        : null}
      {isLoading && getSkeletons(view)}
    </div>
  );
});
