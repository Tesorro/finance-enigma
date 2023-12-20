import { FC, memo, useCallback } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Listbox } from '@/shared/ui/Popups/components/ListBox/ListBox';
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
    <Listbox
      className={classNames('', {}, [className])}
      onChange={onChangeHandler}
      value={value}
      items={options}
      defaultValue="Укажите валюту"
      label="Укажите валюту"
      readonly={readonly}
      direction="top right"
    />
  );
});
