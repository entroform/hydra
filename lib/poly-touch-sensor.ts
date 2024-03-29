import { isHMLElement } from '@nekobird/doko';
import Sensor from './sensor';

function getIdentifiersFromEvent(event: TouchEvent) {
  return (currentIdentifiers: number[] = []): number[] => (
    [...new Set(currentIdentifiers.concat([...event.changedTouches].map(event => event.identifier)))]
  );
}

export class PolyTouchSensor extends Sensor {
  public isActive: boolean = false;
  public activeTouchIdentifiers: number[];

  constructor(target: HTMLElement | Window) {
    super(target);
    this.activeTouchIdentifiers = [];
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
    if (event.changedTouches) {
      this.isActive = true;
      this.activeTouchIdentifiers = getIdentifiersFromEvent(event)(this.activeTouchIdentifiers);
      this.capture('touch:start', event);
    }
  }

  private handleTouchMove = (event: TouchEvent) => {
    this.capture('touch:move', event);
  }

  private handleTouchEnd = (event: TouchEvent) => {
    this.capture('touch:end', event);
  }

  private handleTouchCancel = (event: TouchEvent) => {
    this.capture('touch:cancel', event);
  }

  private capture(type: string, event: TouchEvent) {
    [...event.changedTouches].forEach(touch => {
      // const monoDragEvent = new MonoDragEvent(this.monoDrag, type, event, true, touch);
      // this.monoDrag.sensorHub.receive(monoDragEvent);
    });
  }
}
