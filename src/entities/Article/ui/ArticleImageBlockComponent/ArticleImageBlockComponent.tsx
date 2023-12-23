import { FC, memo } from 'react';

import { ArticleImageBlock } from '../../model/types/article';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextAlign } from '@/shared/ui/Text';

import cls from './ArticleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

export const ArticleImageBlockComponent: FC<ArticleImageBlockComponentProps> = memo((props) => {
  const { className, block } = props;
  return (
    <div className={classNames(cls.articleImageBlockComponent, {}, [className])}>
      <img src={block.src} className={cls.img} alt={block.title} />
      {block.title && (
        <Text text={block.title} align={TextAlign.CENTER} />
      )}
    </div>
  );
});
