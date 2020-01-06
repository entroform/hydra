import { isHTMLElement } from '@nekobird/doko';

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

  public targetIsReady(): boolean {
    return isHTMLElement(this.target) || this.target === window;
  }

  public abstract attach(): boolean;
  public abstract detach(): boolean;
}