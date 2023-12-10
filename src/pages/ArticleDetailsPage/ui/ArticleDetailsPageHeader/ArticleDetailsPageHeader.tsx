import { FC, memo, useCallback } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Button } from 'shared/ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { getArticleDetailsData } from 'entities/Article/model/selectors/articleDetails';
import { getCanEditArticle } from 'pages/ArticleDetailsPage/model/selectors/article';
import cls from './ArticleDetailsPageHeader.module.scss';

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader: FC<ArticleDetailsPageHeaderProps> = memo((props) => {
  const { className } = props;
  const navigate = useNavigate();
  const article = useSelector(getArticleDetailsData);
  const canEdit = useSelector(getCanEditArticle);

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

  const onEditArticle = useCallback(() => {
    navigate(`${RoutePath.article_details}${article?.id}/edit`);
  }, [article?.id, navigate]);

  return (
    <div className={classNames(cls.articleDetailsPageHeader, {}, [className])}>
      <Button onClick={onBackToList}>Назад к списку</Button>
      {canEdit && <Button className={cls.editBtn} onClick={onEditArticle}>Редактировать</Button>}
    </div>
  );
});
