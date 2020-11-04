import { MutableRefObject, useCallback, useLayoutEffect, useState } from 'react';

import { getDirection } from '../helpers';
import { DirectionX, DirectionY, OnVisibilityChangeData } from '../types';

interface Props {
  distance?: number;
  onVisibilityChange: (data: OnVisibilityChangeData) => void;
  targetRef: MutableRefObject<HTMLElement | null>;
}

interface State {
  visible?: boolean;
  x?: number;
  y?: number;
}

export default (props: Props) => {
  const { onVisibilityChange, targetRef, distance = 0 } = props;
  const [previos, setPrevios] = useState<State>({});

  const onVisibleCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    const [{ isIntersecting : visible, boundingClientRect: { y, x } }] = entries;

    if (visible === previos.visible) return;

    const directionY = getDirection(previos.y, y) as DirectionY;
    const directionX = getDirection(previos.x, x, false) as DirectionX;

    setPrevios({ visible, x, y });

    onVisibilityChange({ visible, directionX, directionY });
  }, [onVisibilityChange, previos]);

  useLayoutEffect(() => {
    if (!targetRef.current) return;

    const observer = new IntersectionObserver(onVisibleCallback, {
      root: null,
      rootMargin: `${distance}px`,
      threshold: 0,
    });

    observer.observe(targetRef.current);

    return () => {
      if (targetRef.current){
        observer.unobserve(targetRef.current);
      }
    };
  }, [onVisibleCallback, targetRef.current])
};
