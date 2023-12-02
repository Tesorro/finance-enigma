import { FC, useCallback } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import {
  getProfileData, getProfileReadonly, profileActions, updateProfileData,
} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { getUserAuthData } from 'entities/User';
import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader:FC<ProfilePageHeaderProps> = (props) => {
  const { className } = props;
  const authData = useSelector(getUserAuthData);
  const profileData = useSelector(getProfileData);
  const canEdit = authData?.id === profileData?.id;
  const readonly = useSelector(getProfileReadonly);
  const dispatch = useAppDispatch();
  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);
  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);
  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);
  return (
    <div className={classNames(cls.profilePageHeader, {}, [className])}>
      <Text title="Профиль" />
      {canEdit && (
        <div className={cls.btnsWrapper}>
          {readonly
            ? <Button className={cls.editBtn} theme={ButtonTheme.OUTLINE} onClick={onEdit}>Редактировать</Button>
            : (
              <>
                <Button className={cls.editBtn} theme={ButtonTheme.OUTLINE} onClick={onSave}>Сохранить</Button>
                <Button className={cls.saveBtn} theme={ButtonTheme.OUTLINE_RED} onClick={onCancelEdit}>Отменить</Button>
              </>
            )}
        </div>
      )}
    </div>
  );
};
