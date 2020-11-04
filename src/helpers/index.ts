export const getDirection = (prev: number | undefined, next: number, vertical = true) => {
  if (!prev || prev === next) return 'none';

  if (next > prev) return vertical ? 'down' : 'right';

  return vertical ? 'up' : 'left';
};
