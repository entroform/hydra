import { isHTMLElement } from '@nekobird/doko';

export type SensorEventType = 'MOUSE' | 'TOUCH';

export interface SensorEvent {
  type: SensorEventType;
  identifier?: number;
  isTouch: boolean;
  event: MouseEvent | TouchEvent;
  touch?: Touch;
}

export default abstract class Sensor {
  public target: HTMLElement | null = null;
  public isListening: boolean = false;

  constructor(target: HTMLElement) {
    if (!this.addTarget(target)) {
      console.error('Sensor: fail to add target.');
    }
  }

  public addTarget(target: HTMLElement): boolean {
    if (isHTMLElement(target)) {
      this.target = target;
      return true;
    }
    return false;
  }

  public abstract attach(): boolean;
  public abstract detach(): boolean;
}