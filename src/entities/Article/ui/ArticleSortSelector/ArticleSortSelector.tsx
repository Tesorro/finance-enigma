import { FC, memo, useMemo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Select, SelectOption } from '@/shared/ui/Select';
import { SortOrder } from '@/shared/types';
import { ArticleSortField } from '../../model/consts/articleConsts';
import cls from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector: FC<ArticleSortSelectorProps> = memo((props) => {
  const {
    className, sort, onChangeSort, onChangeOrder, order,
  } = props;

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
    { value: 'asc', content: 'возрастанию' },
    { value: 'desc', content: 'убыванию' },
  ], []);

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
    { value: ArticleSortField.CREATED, content: 'дате создания' },
    { value: ArticleSortField.TITLE, content: 'названию' },
    { value: ArticleSortField.VIEWS, content: 'просмотрам' },
  ], []);

  // const changeSortHandler = useCallback((newSort: string) => {
  //   onChangeSort(newSort as ArticleSortField);
  // }, [onChangeSort]);
  //
  // const changeOrderHandler = useCallback((newOrder: string) => {
  //   onChangeOrder(newOrder as SortOrder);
  // }, [onChangeOrder]);

  return (
    <div className={classNames(cls.articleSortSelector, {}, [className])}>
      <Select<ArticleSortField>
        label="Сортировать по"
        options={sortFieldOptions}
        value={sort}
        onChange={onChangeSort}
      />
      <Select
        label="по"
        options={orderOptions}
        value={order}
        onChange={onChangeOrder}
        className={cls.order}
      />

    </div>
  );
});
