import {
  Vector2,
} from '@nekobird/vector2';

export type DragEventType = 'start' | 'drag' | 'stop' | 'cancel';

export type DragEventIdentifier = 'mouse' | number;

export interface DragEvent {
  type: DragEventType;
  identifier: DragEventIdentifier;

  originalEvent: MouseEvent | TouchEvent;

  target: HTMLElement | null;
  targetFromEvent: EventTarget | null;

  isTouch: boolean;
  touch?: Touch;

  position: Vector2;
  velocity: Vector2;
  acceleration: Vector2;

  time: number;
}

export interface DragStory {
  identifier: DragEventIdentifier
  offset:
}

abstract class Sensor {
  public isListening: boolean;
  public target: HTMLElement | null;

  abstract attach(target: HTMLElement): boolean {
    return false;
  }

  abstract dispatch(type: DragEventType, event: MouseEvent | TouchEvent) {

  }
}