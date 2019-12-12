export abstract class Sensor {
  public isListening: boolean = false;
  public target: HTMLElement | null = null;

  constructor(target: HTMLElement) {

  }

  abstract attach(): boolean;
}

// What would be an elegant solution to this?
class Parent {
  public child: Child;

  constructor() {
    this.child = new Child(this);
  }
}

class Child {
  public parent: Parent;

  constructor(parent: Parent) {
    this.parent = parent;
  }
}