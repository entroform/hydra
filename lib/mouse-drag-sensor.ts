import { isHMLElement } from '@nekobird/doko';
import Sensor from './sensor';

export class MouseDragSensor extends Sensor {
  public mouseIsDown: boolean = false;

  constructor(target: HTMLElement) {
    super(target);
  }

  public attach(): boolean {
    if (!this.isListening && isHMLElement(this.target)) {
      this.target = this.target as HTMLElement;
      this.target.addEventListener('mousedown', this.handleMouseDown);
      window.addEventListener('mousemove', this.handleMouseMove);
      window.addEventListener('mouseup', this.handleMouseUp);
      this.isListening = true;
      return true;
    }
    return false;
  }

  public detach(): boolean {
    if (this.isListening) {
      this.target = this.target as HTMLElement;
      this.target.removeEventListener('mousedown', this.handleMouseDown);
      window.removeEventListener('mousemove', this.handleMouseMove);
      window.removeEventListener('mouseup', this.handleMouseUp);
      this.isListening = false;
      return true;
    }
    return false;
  }

  private handleMouseDown = (event: MouseEvent) => {
    this.mouseIsDown = true;
  }

  private handleMouseMove = (event: MouseEvent) => {

  }

  private handleMouseUp =(event: MouseEvent) => {
    this.mouseIsDown = false;
  }
}