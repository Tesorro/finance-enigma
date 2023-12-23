import { FC, HTMLAttributeAnchorTarget, memo } from 'react';

import { ArticleView } from '../../model/consts/articleConsts';
import { Article } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/Text';

import cls from './ArticleList.module.scss';

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

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.articleListItem, {}, [className, cls[view]])}>
        <Text title="Статьи не найдены" size={TextSize.L} />
      </div>
    );
  }

  return (
    <div className={classNames(cls.articleListItem, {}, [className, cls[view]])}>
      {articles.map((item) => (
        <ArticleListItem
          article={item}
          view={view}
          className={cls.card}
          target={target}
          key={item.id}
        />
      ))}
      {isLoading && getSkeletons(view)}
    </div>
  );
});
