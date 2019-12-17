## Draft

Hydra is a multi-sensor events composer.
You attach sensors to Hydra constructor:
Hydra will then listen and compose events from the sensor into a story.

A story is a narrative of events from start to end, for example: you click then drag your mouse from an element to another element, then lift your finger. The story will capture the events from when and where you first click to each drag position until you lift your finger.

You can then hook into these sensors that will pass these stories for your app's narrative.

## Hooks

## Sensors

MouseDownUpSensor
MouseDragSensor
TouchSensor

## EventTypes