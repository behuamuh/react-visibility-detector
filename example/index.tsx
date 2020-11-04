import * as React from 'react';
import * as ReactDOM from 'react-dom';

import VisibilityDetector, { useChangeVisibility } from '../.';

function handleVisibilityChange({ visible, directionX, directionY }) {
  console.log('Element is now %s', visible ? 'visible' : 'hidden');
  console.log('Horizontal direction %s', directionX); // left, right, or none if no changed or initial
  console.log('Vertical direction %s', directionY); // up, down or none if no changed or initial
}

function handleVisibilityChangeWithHook({ visible, directionX, directionY }) {
  console.log('[Hook] Element is now %s', visible ? 'visible' : 'hidden');
  console.log('[Hook] Horizontal direction %s', directionX); // left, right, or none if no changed or initial
  console.log('[Hook] Vertical direction %s', directionY); // up, down or none if no changed or initial
}

// scroll to bottom and see the console

function MyComponent(props) {
  const targetRef = React.useRef(null);
  useChangeVisibility({ targetRef, onVisibilityChange: handleVisibilityChangeWithHook })
  return (
    <div style={{
      height: 2000,
      display: "flex",
      alignItems: "flex-end",
    }}>
      <VisibilityDetector onVisibilityChange={handleVisibilityChange}>
        <div>...content goes here...</div>
      </VisibilityDetector>
      <div ref={targetRef}>...with hook...</div>
    </div>
  );
}

ReactDOM.render(<MyComponent />, document.getElementById('root'));
