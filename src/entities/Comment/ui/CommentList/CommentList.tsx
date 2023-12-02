import { FC, memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { Text } from 'shared/ui/Text/Text';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';
import cls from './CommentList.module.scss';

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList: FC<CommentListProps> = memo((props) => {
  const { className, comments, isLoading } = props;
  if (isLoading) {
    return (
      <div className={classNames(cls.commentList, {}, [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </div>
    );
  }
  return (
    <div className={classNames(cls.commentList, {}, [className])}>
      {comments?.length
        ? comments.map((comment) => (
          <CommentCard comment={comment} className={cls.comment} isLoading={isLoading} />
        ))
        : <Text title="Комментарии отсутствуют" />}
    </div>
  );
});
