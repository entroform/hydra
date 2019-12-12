export abstract class Sensor {
  public isListening: boolean = false;
  public target: HTMLElement | null = undefined;

  constructor() {

  }

  abstract attach(): boolean;
}