# React visibility detector

A React component that notifies you when it enters or exits the viewport.
Based on a IntersectionObserver, resulting in improved performance.
Not supported by IE and some others, see here - https://caniuse.com/?search=IntersectionObserver

Install
----

`yarn add react-visibility-detector`

Example
----

To run the example locally:

- `yarn build`
- `cd example`
- `yarn`
- `yarn start`
- open `http://localhost:1234` in your browser

General usage goes something like:

```js
import VisibilityDetector from 'react-visibility-detector';

function handleVisibilityChange ({ visible, directionX, directionY }) {
  console.log('Element is now %s', visible ? 'visible' : 'hidden');
  console.log('Horizontal direction %s', directionX); // left, right, or none if no changed or initial
  console.log('Vertical direction %s', directionY); // up, down or none if no changed or initial
}

function MyComponent (props) {
  return (
    <VisibilityDetector onVisibilityChange={handleVisibilityChange}>
      <div>...content goes here...</div>
    </VisibilityDetector>
  );
}
```

Props
----

- `className` css class for styling, default `undefined`
- `distance` - distance to the viewport at which the detector will trigger, default `0`
- `onVisibilityChange` - callback, called when changed detector visibility
- `children`

License
----

MIT
