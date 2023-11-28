import { FC, memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
  className?: string;
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = (props) => {
  const { className } = props;
  const { id } = useParams<{id: string}>();
  if (!id) {
    return (
      <div className={classNames(cls.articleDetailsPage$, {}, [className])}>
        Статья не найдена
      </div>
    );
  }
  return (
    <div className={classNames(cls.articleDetailsPage$, {}, [className])}>
      <ArticleDetails id={id} />
    </div>
  );
};

export default memo(ArticleDetailsPage);
