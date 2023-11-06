import {
  FC, memo, useCallback,
} from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { Select } from 'shared/ui/Select/Select';
import { Currency } from '../../index';

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

const options = [
  { value: Currency.RUB, content: 'Рубль' },
  { value: Currency.USD, content: 'Доллар' },
  { value: Currency.EUR, content: 'Евро' },
];

export const CurrencySelect:FC<CurrencySelectProps> = memo((props) => {
  const {
    className, value, onChange, readonly,
  } = props;

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Currency);
  }, [onChange]);

  return (
    <Select
      className={classNames('', {}, [className])}
      options={options}
      label="Укажите валюту"
      value={value}
      onChange={onChangeHandler}
      readonly={readonly}
    />
  );
});
