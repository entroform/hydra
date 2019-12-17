import { isHTMLElement } from '@nekobird/doko';

export type SensorEventType = 'MOUSE' | 'TOUCH';

export type EventType = 'down' | 'up' | 'move' | 'drag/start' | 'drag/end' | 'drag/move' | 'pointer/drag/start';

export interface SensorEvent {
  type: SensorEventType;
  identifier?: number;
  isTouch: boolean;
  event: MouseEvent | TouchEvent;
  touch?: Touch;
}

export default abstract class Sensor {
  public target: HTMLElement | Window | null = null;
  public isListening: boolean = false;

  constructor(target: HTMLElement | Window) {
    if (!this.addTarget(target)) {
      console.error('Sensor: fail to add target.');
    }
  }

  public addTarget(target: HTMLElement | Window): boolean {
    if (isHTMLElement(target)) {
      this.target = target;
      return true;
    }
    return false;
  }

  public abstract attach(): boolean;
  public abstract detach(): boolean;
}