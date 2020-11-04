import React, { ReactNode, useCallback, useLayoutEffect, useRef, useState } from 'react';

import { getDirection } from '../../helpers';
import { DirectionX, DirectionY, OnVisibilityChangeData } from '../../types';

interface Props {
  className?: string;
  distance?: number;
  onVisibilityChange: (data: OnVisibilityChangeData) => void;
  children: ReactNode;
}

interface State {
  visible?: boolean;
  x?: number;
  y?: number;
}

const VisibilityDetector = (props: Props) => {
  const { className, onVisibilityChange, children, distance = 0 } = props;
  const [previos, setPrevios] = useState<State>({});
  const ref = useRef<HTMLDivElement | null>(null);
  
  const onVisibleCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    const [{ isIntersecting : visible, boundingClientRect: { y, x } }] = entries;

    if (visible === previos.visible) return;
    
    const directionY = getDirection(previos.y, y) as DirectionY;
    const directionX = getDirection(previos.x, x, false) as DirectionX;

    setPrevios({ visible, x, y });

    onVisibilityChange({ visible, directionX, directionY });
  }, [onVisibilityChange, previos]);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(onVisibleCallback, {
      root: null,
      rootMargin: `${distance}px`,
      threshold: 0,
    });

    observer.observe(ref.current);

    return () => {
      if (ref.current){
        observer.unobserve(ref.current);
      }
    };
  }, [onVisibleCallback, ref.current])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default React.memo(VisibilityDetector);
