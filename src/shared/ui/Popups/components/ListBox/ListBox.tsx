import { Listbox as HListBox } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

import { Button } from '../../../Button/Button';
import { HStack } from '../../../Stack';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';

import cls from './ListBox.module.scss';

// const people = [
//   { id: 1, name: 'Durward Reynolds', unavailable: false },
//   { id: 2, name: 'Kenton Towne', unavailable: false },
//   { id: 3, name: 'Therese Wunsch', unavailable: false },
//   { id: 4, name: 'Benedict Kessler', unavailable: true },
//   { id: 5, name: 'Katelyn Rohan', unavailable: false },
// ];

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps {
  items?: ListBoxItem[];
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  readonly?: boolean;
  direction?: DropdownDirection;
  label?: string;
}

export function Listbox(props: ListBoxProps) {
  const {
    className, items, value, defaultValue, onChange, readonly, direction = 'bottom right', label,
  } = props;

  const optionsClasses = [mapDirectionClass[direction]];

  return (
    <HStack gap="4">
      {label && <span>{`${label}>`}</span>}
      <HListBox
        disabled={readonly}
        as="div"
        className={classNames(cls.listBox, {}, [className, popupCls.popup])}
        value={value}
        onChange={onChange}
      >

        <HListBox.Button className={cls.trigger}>
          <Button disabled={readonly}>
            {value ?? defaultValue}
          </Button>
        </HListBox.Button>
        <HListBox.Options className={classNames(cls.options, {}, optionsClasses)}>
          {items?.map((item) => (
            <HListBox.Option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li className={classNames(cls.item, { [popupCls.active]: active, [popupCls.disabled]: item.disabled })}>
                  {selected && '>'}
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  );
}
