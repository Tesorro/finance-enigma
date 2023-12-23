import {
  ChangeEvent, useMemo,
} from 'react';

import { classNames, Mods } from '../../lib/classNames/classNames';

import cls from './Select.module.scss';

export interface SelectOption<T extends string> {
  value: T;
  content: string;
}

interface SelectProps<T extends string> {
  className?: string;
  label?: string;
  options?: SelectOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  readonly?: boolean;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
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
    onChange?.(event.target.value as T);
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
};
