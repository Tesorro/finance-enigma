import { FC, Suspense } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Modal } from '@/shared/ui/Modal';
import { Loader } from '@/shared/ui/Loader';
import { LoginFormAsync as LoginForm } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal:FC<LoginModalProps> = (props) => {
  const { className, onClose, isOpen } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose} lazy className={classNames('', {}, [className])}>
      <Suspense fallback={<Loader />}>
        <LoginForm onSuccess={onClose} />
      </Suspense>
    </Modal>
  );
};
