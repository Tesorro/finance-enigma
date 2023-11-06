import {
  ChangeEvent, FC, memo, useMemo,
} from 'react';

import { classNames, Mods } from '../../lib/classNames/classNames';

import cls from './Select.module.scss';

export interface SelectOption {
  value: string;
  content: string;
}

interface SelectProps {
  className?: string;
  label?: string;
  options?: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
}

export const Select:FC<SelectProps> = memo((props) => {
  const {
    className,
    label,
    options,
    value,
    onChange,
    readonly,
  } = props;

  const optionsRender = useMemo(() => options?.map(({ value, content }) => (<option key={value} value={value} className={cls.option}>{content}</option>)), [options]);

  const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(event.target.value);
  };

  const mods: Mods = {};
  return (
    <div className={classNames(cls.wrapper, mods, [className])}>
      {label && <span className="label">{label}</span>}
      <select disabled={readonly} className={cls.select} value={value} onChange={onChangeHandler}>
        {optionsRender}
      </select>
    </div>
  );
});
