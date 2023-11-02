import { FC, memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { useSelector } from 'react-redux';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading';
import { getProfileError } from '../../model/selectors/getProfileError';
import { getProfileData } from '../../model/selectors/getProfileData';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
  className?: string;
}

export const ProfileCard:FC<ProfileCardProps> = memo((props) => {
  const { className } = props;
  const data = useSelector(getProfileData);
  const error = useSelector(getProfileError);
  const isLoading = useSelector(getProfileIsLoading);
  return (
    <div className={classNames(cls.profileCard, {}, [className])}>
      <div className={cls.header}>
        <Text title="Профиль" />
        <Button className={cls.editBtn} theme={ButtonTheme.OUTLINE}>Редактировать</Button>
      </div>
      <div className={cls.data}>
        <Input value={data?.firstname} placeholder="Имя" className={cls.input} />
        <Input value={data?.lastname} placeholder="Фамилия" className={cls.input} />
      </div>
    </div>
  );
});
