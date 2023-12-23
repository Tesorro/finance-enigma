import { FC, memo } from 'react';

import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';

import { Page } from '@/widgets/Page';
import cls from './ArticleEditPage.module.scss';

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage: FC<ArticleEditPageProps> = memo((props) => {
  const { className } = props;
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  return (
    <Page className={classNames(cls.articleEditPage, {}, [className])}>
      {isEdit ? `Редактирование статьи с id = ${id}` : 'Создание статьи'}
    </Page>
  );
});

export default ArticleEditPage;
