import { FC, memo, useCallback } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { Text } from 'shared/ui/Text/Text';
import { Icon } from 'shared/ui/Icon/Icon';
import CopyIcon from 'src/shared/assets/icons/user-32-32.png';
import { Card } from 'shared/ui/Card/Card';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button } from 'shared/ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import {
  Article, ArticleBlockType, ArticleTextBlock, ArticleView,
} from '../../model/types/article';
import cls from './ArticleListItem.module.scss';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
}

export const ArticleListItem: FC<ArticleListItemProps> = memo((props) => {
  const { className, article, view } = props;
  const navigate = useNavigate();
  const onOpenArticle = useCallback(() => {
    navigate(RoutePath.article_details + article.id);
  }, [article.id, navigate]);
  const views = (
    <>
      <Text text={String(article.views)} className={cls.views} />
      <Icon Svg={CopyIcon} className={cls.icon} />
    </>
  );
  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;
    return (
      <div className={classNames(cls.articleListItem, {}, [className, cls[view]])}>
        <Card className={cls.card}>
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text text={article.user.username} className={cls.username} />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <Text title={article.title} className={cls.title} />
          <Text text={article.type.join(', ')} className={cls.types} />
          <img src={article.img} alt={article.title} className={cls.img} />
          {textBlock && (
            <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />
          )}
          <div className={cls.footer}>
            <Button onClick={onOpenArticle}>Читать далее...</Button>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={classNames(cls.articleListItem, {}, [className, cls[view]])}>
      <Card className={cls.card} onClick={onOpenArticle}>
        <div className={cls.imageWrapper}>
          <img src={article.img} alt={article.title} className={cls.img} />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div className={cls.infoWrapper}>
          <Text text={article.type.join(', ')} className={cls.types} />
          {views}
        </div>
        <Text title={article.title} className={cls.title} />
      </Card>
    </div>
  );
});
