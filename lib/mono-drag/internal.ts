export type MonoDragEventIdentifier = 'mouse' | number;
export type MonoDragEventType = 'start' | 'drag' | 'stop' | 'cancel';

export declare class MonoDrag {
  config;
  sensorHub;
};

export declare class MonoDragEvent {
  type;
  identifier;
  time;
  originalEvent;
  position;
  velocity;
  acceleration;
};

export declare class MonoDragStory {
  
}