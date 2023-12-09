import {
  FC, HTMLAttributeAnchorTarget, memo, useCallback,
} from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { ArticleListItemSkeleton } from 'entities/Article/ui/ArticleListItem/ArticleListItemSkeleton';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import cls from './ArticleList.module.scss';
import { Article, ArticleView } from '../../model/types/article';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 9 : 3)
  .fill(0)
  .map((item, index) => (
    <ArticleListItemSkeleton className={cls.card} view={view} key={index} />
  ));

export const ArticleList: FC<ArticleListProps> = memo((props) => {
  const {
    className, articles, view = ArticleView.SMALL, isLoading, target,
  } = props;

  const renderArticle = useCallback((article: Article) => (
    <ArticleListItem article={article} view={view} className={cls.card} key={article.id} target={target} />
  ), [target, view]);

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.articleListItem, {}, [className, cls[view]])}>
        <Text title="Статьи не найдены" size={TextSize.L} />
      </div>
    );
  }

  return (
    <div className={classNames(cls.articleListItem, {}, [className, cls[view]])}>
      {articles.length > 0
        ? articles.map(renderArticle)
        : null}
      {isLoading && getSkeletons(view)}
    </div>
  );
});
