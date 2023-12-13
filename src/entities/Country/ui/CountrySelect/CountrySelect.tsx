import {
  FC, memo, useCallback,
} from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { Select } from 'shared/ui/Select/Select';
import { Listbox } from 'shared/ui/ListBox/ListBox';
import { Country } from '../../model/types/country';

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

const options = [
  { value: Country.Armenia, content: 'Армения' },
  { value: Country.Belarus, content: 'Беларусь' },
  { value: Country.Kazakhstan, content: 'Казахстан' },
  { value: Country.Ukraine, content: 'Украина' },
  { value: Country.Russia, content: 'Россия' },
];

export const CountrySelect:FC<CountrySelectProps> = memo((props) => {
  const {
    className, value, onChange, readonly,
  } = props;

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Country);
  }, [onChange]);

  return (
    <Listbox
      className={classNames('', {}, [className])}
      onChange={onChangeHandler}
      value={value}
      items={options}
      defaultValue="Укажите страну"
      label="Укажите страну"
      readonly={readonly}
      direction="top"
    />
  );
  // return (
  //   <Select
  //     className={classNames('', {}, [className])}
  //     options={options}
  //     label="Укажите страну"
  //     value={value}
  //     onChange={onChangeHandler}
  //     readonly={readonly}
  //   />
  // );
});
