import { FC, HTMLAttributeAnchorTarget, memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { ArticleListItemSkeleton } from 'entities/Article/ui/ArticleListItem/ArticleListItemSkeleton';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { List, ListRowProps, WindowScroller } from 'react-virtualized';
import { PAGE_ID } from 'widgets/Page/Page';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import cls from './ArticleList.module.scss';
import { Article, ArticleView } from '../../model/types/article';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 9 : 3)
  .fill(0)
  .map((item, index) => (
    <ArticleListItemSkeleton className={cls.card} view={view} key={index} />
  ));

export const ArticleList: FC<ArticleListProps> = memo((props) => {
  const {
    className, articles, view = ArticleView.SMALL, isLoading, target,
  } = props;

  const isBig = view === ArticleView.BIG;

  const itemsPerRow = isBig ? 1 : 3;
  const rowCount = isBig ? articles.length : Math.ceil(articles.length / itemsPerRow);
  const rowRenderer = ({
    index, isScrolling, key, style,
  }: ListRowProps) => {
    const items = [];
    const fromIndex = index * itemsPerRow;
    const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);
    for (let i = fromIndex; i < toIndex; i += 1) {
      items.push(<ArticleListItem article={articles[i]} view={view} className={cls.card} target={target} key={`str${i}`} />);
    }
    return (
      <div key={key} style={style} className={cls.row}>
        {items}
      </div>
    );
  };
  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.articleListItem, {}, [className, cls[view]])}>
        <Text title="Статьи не найдены" size={TextSize.L} />
      </div>
    );
  }

  return (
    <WindowScroller scrollElement={document.getElementById(PAGE_ID) as Element}>
      {({
        height, width, registerChild, isScrolling, onChildScroll, scrollTop,
      }) => (
        <div ref={registerChild} className={classNames(cls.articleListItem, {}, [className, cls[view]])}>
          <List
            height={height ?? 700}
            rowCount={rowCount}
            rowHeight={isBig ? 700 : 330}
            rowRenderer={rowRenderer}
            width={width ? width - 80 : 700}
            autoHeight
            onScroll={onChildScroll}
            isScrolling={isScrolling}
            scrollTop={scrollTop}
          />
          {isLoading && getSkeletons(view)}
        </div>
      )}
    </WindowScroller>
  );
});
