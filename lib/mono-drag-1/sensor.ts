import { isHTMLElement } from '@nekobird/doko';

export type EventType = 'MOUSE' | 'TOUCH';

export interface SensorEvent {
  type: EventType;
  identifier?: number;
  isTouch: boolean;
  event: MouseEvent | TouchEvent;
  touch?: Touch;
}

export abstract class Sensor {
  public target: HTMLElement | null;
  public isListening: boolean = false;
  private event: Event;

  constructor(event: Event, target: HTMLElement) {

  }

  public addTarget(target: HTMLElement): boolean {
    if (isHTMLElement(target)) {
      this.target = target;
      return true;
    }
    return false;
  }

  public abstract attach(target: HTMLElement): this;
  public abstract detach(): this;
}

export class MouseDragSensor extends Sensor {
  private mouseIsDown: boolean = false;

  constructor(event: Event, target: HTMLElement) {
    super(event, target);
  }

  public attach(): this {
    this.target.addEventListener('mousedown', this.onMouseDown);
    return this;
  }

  public detach(): this {
    return this;
  }

  private onMouseDown = (event: MouseEvent) => {

  }

  private onMouseMove = (event: MouseEvent) => {

  }

  private onMouseUp =(event: MouseEvent) => {
    
  }
}