import React, { ReactNode, useRef } from 'react';

import useChangeVisibility from '../../hooks/useChangeVisibility';
import { OnVisibilityChangeData } from '../../types';

interface Props {
  className?: string;
  distance?: number;
  onVisibilityChange: (data: OnVisibilityChangeData) => void;
  children: ReactNode;
}

const VisibilityDetector = (props: Props) => {
  const { className, onVisibilityChange, children, distance = 0 } = props;
  const targetRef = useRef<HTMLDivElement | null>(null);
  useChangeVisibility({ onVisibilityChange, targetRef, distance });

  return (
    <div ref={targetRef} className={className}>
      {children}
    </div>
  );
};

export default React.memo(VisibilityDetector);
