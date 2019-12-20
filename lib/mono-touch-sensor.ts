import { isHMLElement } from '@nekobird/doko';
import Sensor from './sensor';

// Helper functions.
function getTouchFromEvent(event: TouchEvent): Touch {
  return [...event.changedTouches].filter(touch => touch.identifier === this.identifier)[0];
}

export class TouchSensor extends Sensor {
  private isActive: boolean = false;
  private identifier: number | null = null;

  constructor(target: HTMLElement | Window) {
    super(target);
  }

  public attach(): boolean {
    if (
      !this.isListening
      && (isHMLElement(this.target) || this.target === window)
    ) {
      (this.target as HTMLElement).addEventListener('touchstart', this.handleTouchStart);
      window.addEventListener('touchmove',   this.handleTouchMove);
      window.addEventListener('touchend',    this.handleTouchEnd);
      window.addEventListener('touchcancel', this.handleTouchCancel);
      this.isListening = true;
      return true;
    }
    return false;
  }

  public detach(): boolean {
    if (this.isListening) {
      (this.target as HTMLElement).removeEventListener('touchstart', this.handleTouchStart);
      window.removeEventListener('touchmove',   this.handleTouchMove);
      window.removeEventListener('touchend',    this.handleTouchEnd);
      window.removeEventListener('touchcancel', this.handleTouchCancel);
      this.isListening = false;
      return true;
    }
    return false;
  }

  private handleTouchStart = (event: TouchEvent) => {
    if (!this.isActive) {
      const touch = event.changedTouches[0];
      this.identifier = touch.identifier;
      this.capture('touch:mono:start', event, touch);
    }
  }

  private handleTouchMove = (event: TouchEvent) => {
    if (this.isActive && this.identifier) {
      const touch = getTouchFromEvent(event);
      if (touch) {
        this.capture('touch:mono:move', event, touch);
      }
    }
  }

  private handleTouchEnd = (event: TouchEvent) => {
    if (this.isActive && this.identifier) {
      const touch = getTouchFromEvent(event);
      if (touch) {
        this.capture('touch:mono:end', event, touch);
        this.isActive = false;
        this.identifier = null;
      }
    }
  }

  private handleTouchCancel = (event: TouchEvent) => {
    if (this.isActive && this.identifier) {
      const touch = getTouchFromEvent(event);
      this.capture('touch:mono:cancel', event, touch);
      this.isActive = false;
      this.identifier = null;  
    }
  }

  private capture(type: string, event: TouchEvent, touch: Touch) {
    [...event.changedTouches].forEach(touch => {
      // const monoDragEvent = new MonoDragEvent(this.monoDrag, type, event, true, touch);
      // this.monoDrag.sensorHub.receive(monoDragEvent);
    });
  }
}
