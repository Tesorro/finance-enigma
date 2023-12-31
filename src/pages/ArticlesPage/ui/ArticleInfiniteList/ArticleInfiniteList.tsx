import { FC, memo } from 'react';
import { useSelector } from 'react-redux';

import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { getArticles } from '../../model/slices/articlesPageSlice';

import { ArticleList } from '@/entities/Article';
import { Text } from '@/shared/ui/Text';

interface ArticleInfiniteListProps {
  className?: string;
}

export const ArticleInfiniteList: FC<ArticleInfiniteListProps> = memo((props) => {
  const { className } = props;
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const error = useSelector(getArticlesPageError);
  const view = useSelector(getArticlesPageView);

  if (error) {
    return <Text text="Ошибка при загрузке статьи" />;
  }

  return (
    <ArticleList isLoading={isLoading} view={view} articles={articles} className={className} />
  );
});
