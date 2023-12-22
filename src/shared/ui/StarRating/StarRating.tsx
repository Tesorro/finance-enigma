import { FC, memo, useState } from 'react';

import { classNames } from '../../lib/classNames/classNames';

import cls from './StarRating.module.scss';
import StarIcon from '@/shared/assets/icons/star-20-20.svg';
import { Icon } from '@/shared/ui/Icon/Icon';

interface StarRatingProps {
  className?: string;
  onSelect?: (starsCount: number) => void;
  size?: number;
  selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating: FC<StarRatingProps> = memo((props) => {
  const {
    className, size = 30, selectedStars = 0, onSelect,
  } = props;
  const [isSelected, setIsSelected] = useState(Boolean(selectedStars));
  const [currentStarsCount, setCurrentStartsCount] = useState(selectedStars);
  const onHover = (starsCount: number) => () => {
    if (!isSelected) {
      setCurrentStartsCount(starsCount);
    }
  };
  const onLeave = () => {
    if (!isSelected) {
      setCurrentStartsCount(0);
    }
  };
  const onClick = (starsCount: number) => () => {
    if (!isSelected) {
      onSelect?.(starsCount);
      setCurrentStartsCount(starsCount);
      setIsSelected(true);
    }
  };
  return (
    <div className={classNames(cls.starRating, {}, [className])}>
      {stars.map((starNumber) => (
        <Icon
          Svg={StarIcon}
          key={starNumber}
          className={classNames(cls.starIcon, { [cls.selected]: isSelected }, [currentStarsCount >= starNumber ? cls.hovered : cls.normal])}
          width={size}
          height={size}
          onMouseLeave={onLeave}
          onMouseEnter={onHover(starNumber)}
          onClick={onClick(starNumber)}
        />
      ))}
    </div>
  );
});
