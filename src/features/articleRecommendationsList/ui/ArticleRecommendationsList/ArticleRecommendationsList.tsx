import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { ArticleList } from 'entities/Article';
import { VStack } from 'shared/ui/Stack';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';

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
      <ArticleList articles={articles} target="_blank" virtualized={false} />
    </VStack>
  );
});
