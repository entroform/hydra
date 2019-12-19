import { isHMLElement } from '@nekobird/doko';
import Sensor from './sensor';

export class MouseDragSensor extends Sensor {
  public mouseIsDown: boolean = false;

  constructor(target: HTMLElement) {
    super(target);
  }

  public attach(): boolean {
    if (!this.isListening && isHMLElement(this.target)) {
      (this.target as HTMLElement).addEventListener('mousedown', this.handleMouseDown);
      window.addEventListener('mousemove', this.handleMouseMove);
      window.addEventListener('mouseup', this.handleMouseUp);
      this.isListening = true;
      return true;
    }
    return false;
  }

  public detach(): boolean {
    if (this.isListening) {
      (this.target as HTMLElement).removeEventListener('mousedown', this.handleMouseDown);
      window.removeEventListener('mousemove', this.handleMouseMove);
      window.removeEventListener('mouseup', this.handleMouseUp);
      this.isListening = false;
      return true;
    }
    return false;
  }

  private handleMouseDown = (event: MouseEvent) => {
    this.mouseIsDown = true;
    this.capture('sensor:mouse:drag-start', event);
  }

  private handleMouseMove = (event: MouseEvent) => {
    if (this.mouseIsDown) {
      this.capture('sensor:mouse:drag', event);
    }
  }

  private handleMouseUp = (event: MouseEvent) => {
    this.mouseIsDown = false;
    this.capture('sensor:mouse:drag-end', event);
  }

  private capture(type, event) {

  }
}