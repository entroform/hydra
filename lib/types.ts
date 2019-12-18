export type PointerDragEventType = 'pointer/drag/start' | 'pointer/drag/move' | 'pointer/drag/stop' | 'pointer/drag/cancel';
export type PointerEventType = 'pointer/down' | 'pointer/up';
export type MouseEventType = 'mouse/down' | 'mouse/move' | 'mouse/up';
export type DragEventType = 'drag/start' | 'drag/end' | 'drag/move' | 'drag/cancel';

export type EventType = PointerDragEventType | PointerEventType | MouseEventType | DragEventType;

export type EventIdentifier = 'MOUSE' | number;

export interface SensorEvent {
  type: EventType;

  identifier: EventIdentifier;
  isTouch: boolean;

  event: MouseEvent | TouchEvent;
  touch?: Touch;

  time: number;
}

export interface HydraEvent extends SensorEvent {
  position: [number, number];
  velocity: [number, number];
  acceleration: [number, number];
}

export interface HydraStory {
  isActive: boolean;
  startTime: number;
  endTime?: number;

  events: HydraEvent[];
}