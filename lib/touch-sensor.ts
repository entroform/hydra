import { isHMLElement } from '@nekobird/doko';
import Sensor from './sensor';

export class TouchSensor extends Sensor {
  constructor(target: HTMLElement) {
    super(target);
  }

  public attach(): boolean {
    if (
      !this.isListening
      && isHMLElement(this.target)
    ) {
      this.target.addEventListener('touchstart',  this.handleTouchStart);
      this.target.addEventListener('touchmove',   this.handleTouchMove);
      this.target.addEventListener('touchend',    this.handleTouchEnd);
      this.target.addEventListener('touchcancel', this.handleTouchCancel);
      this.isListening = true;
      return true;
    }
    return false;
  }

  public detach(): boolean {
    if (this.isListening) {
      this.target.removeEventListener('touchstart',  this.handleTouchStart);
      this.target.removeEventListener('touchmove',   this.handleTouchMove);
      this.target.removeEventListener('touchend',    this.handleTouchEnd);
      this.target.removeEventListener('touchcancel', this.handleTouchCancel);
      this.isListening = false;
      return true;
    }
    return false;
  }

  private handleTouchStart = (event: MouseEvent) => {
  }

  private handleTouchMove = (event: MouseEvent) => {

  }

  private handleTouchEnd = (event: MouseEvent) => {
  }

  private handleTouchCancel = (event: MouseEvent) => {
  }
}