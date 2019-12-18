export type Point = [number, number];

export interface HydraConfig {
  target: HTMLElement | Window;

  // Hooks
  onPointerDown: Function;
  onPointerUp: Function;

  onPointerDragStart: Function;
  onPointerDragMove: Function;
  onPointerDragCancel: Function;

  onEachPointerDragStart: Function;
  onEachPointerDragMove: Function;
}

export interface HydraStory {
  originalEvent: MouseEvent | TouchEvent | DragEvent;
  history: [];
}

export default class Hydra {
  constructor() {
  }
}