import {
  FC, memo, useCallback, useState,
} from 'react';
import { BrowserView, MobileView } from 'react-device-detect';

import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Drawer } from '@/shared/ui/Drawer';
import { Input } from '@/shared/ui/Input';
import { Modal } from '@/shared/ui/Modal';
import { HStack, VStack } from '@/shared/ui/Stack';
import { StarRating } from '@/shared/ui/StarRating';
import { Text } from '@/shared/ui/Text';

interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
  rate?: number;
}

export const RatingCard: FC<RatingCardProps> = memo((props) => {
  const {
    className, title, feedbackTitle, hasFeedback, onAccept, onCancel, rate = 0,
  } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starsCount, setStarsCount] = useState(rate);
  const [feedback, setFeedback] = useState('');
  const onSelectStars = useCallback((selectedStarsCount: number) => {
    setStarsCount(selectedStarsCount);
    if (hasFeedback) {
      setIsModalOpen(true);
    } else {
      onAccept?.(selectedStarsCount);
    }
  }, [hasFeedback, onAccept]);

  const acceptHandler = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starsCount, feedback);
  }, [feedback, onAccept, starsCount]);

  const cancelHandler = useCallback(() => {
    onCancel?.(starsCount);
  }, [onCancel, starsCount]);

  const modalContent = (
    <>
      <Text title={feedbackTitle} />
      <Input value={feedback} onChange={setFeedback} placeholder="Введите отзыв" />
    </>
  );

  return (
    <Card className={className} max>
      <VStack align="center" gap="8" max>
        <Text title={starsCount ? 'Спасибо за оценку!' : title} />
        <StarRating size={40} onSelect={onSelectStars} selectedStars={starsCount} />
      </VStack>
      <BrowserView>
        <Modal isOpen={isModalOpen} lazy>
          <VStack max gap="32">
            {modalContent}
            <HStack max gap="16" justify="end">
              <Button onClick={acceptHandler}>
                Отправить
              </Button>
              <Button onClick={cancelHandler} theme={ButtonTheme.OUTLINE_RED}>
                Закрыть
              </Button>
            </HStack>
          </VStack>
        </Modal>
      </BrowserView>
      <MobileView>
        <Drawer isOpen={isModalOpen} lazy onClose={cancelHandler}>
          <VStack gap="32">
            {modalContent}
            <Button onClick={acceptHandler} size={ButtonSize.L} fullWidth>
              Отправить
            </Button>
          </VStack>
        </Drawer>
      </MobileView>
    </Card>
  );
});
