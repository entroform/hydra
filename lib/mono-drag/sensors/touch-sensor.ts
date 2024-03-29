import {
  isHTMLElement,
} from '@nekobird/doko';

import {
  MonoDrag,
  MonoDragEventType,
} from '../internal';

import {
  MonoDragEvent,
} from '../mono-drag-event';

export class TouchSensorConfig {
  target: HTMLElement;
  dispatch: ()
}

export class TouchSensor {
  private monoDrag: MonoDrag;

  public isListening: boolean = false;
  public target: HTMLElement | null = null;

  constructor(config: TouchSensorConfig) {
    this.monoDrag = monoDrag;
  }

  public attach(): boolean {
    let { target } = this.monoDrag.config;
    if (
      this.isListening === false
      && isHTMLElement(target) === true
    ) {
      this.target = target as HTMLElement;
      this.target.addEventListener('touchstart', this.onTouchStart);
      window.addEventListener('touchmove', this.onTouchMove);
      window.addEventListener('touchend', this.onTouchEnd);
      window.addEventListener('touchcancel', this.onTouchCancel);
      this.isListening = true;
      return true;
    }
    return false;
  }

  public detach(): boolean {
    if (
      this.isListening === true
      && isHTMLElement(this.target) === true
    ) {
      const target = this.target as HTMLElement;
      target.removeEventListener('touchstart', this.onTouchStart);
      window.removeEventListener('touchmove', this.onTouchMove);
      window.removeEventListener('touchend', this.onTouchEnd);
      window.removeEventListener('touchcancel', this.onTouchCancel);
      this.target = null;
      this.isListening = false;
      return true;
    }
    return false;
  }

  private onTouchStart = (event: TouchEvent) => {
    this.dispatch('start', event);
  }

  private onTouchMove = (event: TouchEvent) => {
    this.dispatch('drag', event);
  }

  private onTouchEnd = (event: TouchEvent) => {
    this.dispatch('stop', event);
  }

  private onTouchCancel = (event: TouchEvent) => {
    this.dispatch('cancel', event);
  }

  private dispatch(type: MonoDragEventType, event: TouchEvent) {
    [...event.changedTouches].forEach(touch => {
      const monoDragEvent = new MonoDragEvent(this.monoDrag, type, event, true, touch);
      this.monoDrag.sensorHub.receive(monoDragEvent);
    });
  }
}