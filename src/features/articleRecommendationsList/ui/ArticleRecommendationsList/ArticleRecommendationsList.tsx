import { memo } from 'react';

import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';

import { ArticleList } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Text, TextSize } from '@/shared/ui/Text';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
  const { className } = props;
  const { isLoading, data: articles, error } = useArticleRecommendationsList(3);
  if (isLoading || error || !articles) {
    return null;
  }
  return (
    <VStack gap="8" className={classNames('', {}, [className])}>
      <Text title="Рекомендуем" size={TextSize.L} />
      <ArticleList articles={articles} target="_blank" />
    </VStack>
  );
});
