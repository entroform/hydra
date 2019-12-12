import { MonoDrag } from '../lib/mono-drag/mono-drag';
import { Vector2 } from '@nekobird/vector2';

const box = document.querySelector('.box') as HTMLElement;

if (box) {
  const mono = new MonoDrag({
    target: box,
    onDrag: (event, story) => {
      const position = Vector2.subtract(event.position, story.offset);
      box.style.transform = `translateX(${position.x}px) translateY(${position.y}px)`;
    },
  });
}
