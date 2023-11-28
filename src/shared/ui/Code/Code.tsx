import React, { FC, memo, useCallback } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { Button } from '../Button/Button';
import cls from './Code.module.scss';

interface CodeProps {
  className?: string;
  text: string;
}

export const Code: FC<CodeProps> = memo((props) => {
  const { className, text } = props;

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <pre className={classNames(cls.code, {}, [className])}>
      <Button onClick={onCopy} className={cls.copyBtn}>Копировать</Button>
      <code>
        {text}
      </code>
    </pre>
  );
});
