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

import {
  Sensor
} from './sensor';

export class MouseSensor extends Sensor {
  public mouseButtonIsDown: boolean = false;

  constructor(target: HTMLElement) {
    super();
  }

  public attach(): boolean {
    if (
      this.isListening === false
      && isHTMLElement(this.target) === true
    ) {
      this.target = target as HTMLElement;

      this.target.addEventListener('mousedown', this.onMouseDown);
      this.target.addEventListener('contextmenu', this.onContextMenu);

      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseup', this.onMouseUp);

      // document.documentElement.addEventListener('mouseleave', this.onMouseLeave);

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

      target.removeEventListener('mousedown', this.onMouseDown);
      target.removeEventListener('contextmenu', this.onContextMenu);

      window.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('mouseup', this.onMouseUp);

      // document.documentElement.removeEventListener('mouseleave', this.onMouseLeave);

      this.target = null;

      this.isListening = false;

      return true;
    }

    return false;
  }

  private onMouseDown = (event: MouseEvent) => {
    if (this.mouseButtonIsDown === false) {
      this.dispatch('start', event);
      this.mouseButtonIsDown = true;
    }
  }

  private onMouseMove = (event: MouseEvent) => {
    if (this.mouseButtonIsDown === true) {
      this.dispatch('drag', event);
    }
  }

  private onMouseUp = (event: MouseEvent) => {
    if (this.mouseButtonIsDown === true) {
      this.mouseButtonIsDown = false;
      this.dispatch('stop', event);
    }
  }

  private onMouseLeave = (event: MouseEvent) => {
    if (this.mouseButtonIsDown === true) {
      this.mouseButtonIsDown = false;
      this.dispatch('cancel', event);
    }
  }

  private onContextMenu = (event: MouseEvent) => {
    const { disableContextMenu } = this.monoDrag.config;

    if (disableContextMenu === true) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  private dispatch(type: MonoDragEventType, event: MouseEvent) {
    const monoDragEvent = new MonoDragEvent(this.monoDrag, type, event);
    this.monoDrag.sensorHub.receive(monoDragEvent);
  }
}