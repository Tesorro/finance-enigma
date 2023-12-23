import { FC, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getCanEditArticle } from '../../model/selectors/article';

import { getArticleDetailsData } from '@/entities/Article';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader: FC<ArticleDetailsPageHeaderProps> = memo((props) => {
  const { className } = props;
  const navigate = useNavigate();
  const article = useSelector(getArticleDetailsData);
  const canEdit = useSelector(getCanEditArticle);

  const onBackToList = useCallback(() => {
    navigate(getRouteArticles());
  }, [navigate]);

  const onEditArticle = useCallback(() => {
    if (article?.id) {
      navigate(getRouteArticleEdit(article?.id));
    }
  }, [article?.id, navigate]);

  return (
    <HStack max justify="between" className={classNames('', {}, [className])}>
      <Button onClick={onBackToList}>Назад к списку</Button>
      {canEdit && <Button onClick={onEditArticle}>Редактировать</Button>}
    </HStack>
  );
});
