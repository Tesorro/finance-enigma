import React, {
  FC, InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';

import { classNames, Mods } from '../../lib/classNames/classNames';

import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

interface InputProps extends HTMLInputProps{
  className?: string;
  value?: string;
  onChange?: (newValue: string) => void;
  autofocus?: boolean;
  readonly?: boolean;
}

export const Input:FC<InputProps> = memo((props) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    placeholder,
    autofocus = false,
    readonly,
    ...rest
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const [caretPosition, setCaretPosition] = useState(0);

  const isCaretVisible = isFocused && !readonly;

  const onBlur = () => {
    setIsFocused(false);
  };
  const onFocus = () => {
    setIsFocused(true);
  };
  const onSelect = (e: any) => {
    setCaretPosition(e?.target?.selectionStart || 0);
  };

  const mods: Mods = {
    [cls.readonly]: readonly,
  };
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    setCaretPosition(e.target.value.length);
  };
  useEffect(() => {
    if (autofocus) {
      setIsFocused(true);
      ref.current?.focus();
    }
  }, [autofocus]);
  return (
    <div className={classNames(cls.inputWrapper, mods, [className])}>
      {placeholder && (
        <div className={cls.placeholder}>
          {`${placeholder}>`}
        </div>
      )}
      <div className={cls.caretWrapper}>
        <input
          ref={ref}
          readOnly={readonly}
          onFocus={onFocus}
          onBlur={onBlur}
          onSelect={onSelect}
          type={type}
          value={value}
          onChange={onChangeHandler}
          className={cls.input}
          {...rest}
        />
        {isCaretVisible && <span className={cls.caret} style={{ left: `${caretPosition * 9}px` }} />}
      </div>

    </div>
  );
});
