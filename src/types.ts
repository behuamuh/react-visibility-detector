export type DirectionX = 'left' | 'right' | 'none';

export type DirectionY = 'up' | 'down' | 'none';

export interface OnVisibilityChangeData {
  visible: boolean;
  directionX: DirectionX;
  directionY: DirectionY;
}
