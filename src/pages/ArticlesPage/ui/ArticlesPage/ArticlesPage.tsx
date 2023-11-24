import { FC, memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage: FC<ArticlesPageProps> = (props) => {
  const { className } = props;
  return (
    <div className={classNames(cls.articlesPage$, {}, [className])}>

    </div>
  );
};

export default memo(ArticlesPage);
