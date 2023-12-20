import { FC, HTMLAttributeAnchorTarget, memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Text } from '@/shared/ui/Text/Text';
import { Icon } from '@/shared/ui/Icon/Icon';
import { Card } from '@/shared/ui/Card/Card';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Button } from '@/shared/ui/Button/Button';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import {
  Article, ArticleTextBlock,
} from '../../model/types/article';
import { ArticleBlockType, ArticleView } from '../../model/consts/articleConsts';
import cls from './ArticleListItem.module.scss';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem: FC<ArticleListItemProps> = memo((props) => {
  const {
    className, article, view, target,
  } = props;

  const views = (
    <Text text={String(article.views)} className={cls.views} />
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
            <AppLink target={target} to={RoutePath.article_details + article.id}>
              {' '}
              <Button>Читать далее...</Button>
              {' '}
            </AppLink>

            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AppLink target={target} to={RoutePath.article_details + article.id} className={classNames(cls.articleListItem, {}, [className, cls[view]])}>
      <Card className={cls.card}>
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
    </AppLink>
  );
});
