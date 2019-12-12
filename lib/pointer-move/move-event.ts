import {
  Vector2,
} from '@nekobird/vector2';

export type MoveEventType = 'move' | 'enter' | 'leave';

export interface MoveEvent {
  event: MouseEvent;

  type: MoveEventType;

  time: number;

  position: Vector2;
  velocity: Vector2;
  acceleration: Vector2;
}
