import { stopEventPropagation, useValue } from "tldraw";

import { useEditor } from "tldraw";
import { Button } from "~/components/ui/button";

export const ShapeModifier = () => {
  const editor = useEditor();

  const info = useValue(
    "selection bounds",
    () => {
      const screenBounds = editor.getViewportScreenBounds();
      const rotation = editor.getSelectionRotation();
      const rotatedScreenBounds = editor.getSelectionRotatedScreenBounds();
      if (!rotatedScreenBounds) return;
      return {
        x: rotatedScreenBounds.x - screenBounds.x,
        y: rotatedScreenBounds.y - screenBounds.y,
        width: rotatedScreenBounds.width,
        height: rotatedScreenBounds.height,
        rotation: rotation,
      };
    },
    [editor]
  );

  const handleScale = (scale: number) => {
    const selectedShapes = editor.getSelectedShapes();
    const shapes = selectedShapes.map((shape) => {
      return {
        id: shape.id,
        type: shape.type,
        props: {
          //@ts-expect-error scale is not defined in the shape props for some reason
          scale: shape.props.scale * scale,
        },
      };
    });
    editor.animateShapes(shapes, {
      animation: {
        duration: 100,
        easing(t) {
          return t * t;
        },
      },
    });
  };
  if (!info) return;

  return (
    <div
      className="absolute top-0 left-0"
      style={{
        transformOrigin: "top left",
        transform: `translate(${info.x}px, ${info.y}px) rotate(${info.rotation}rad)`,
        pointerEvents: "all",
      }}
      onPointerDown={stopEventPropagation}
    >
      <Button
        variant="secondary"
        className="absolute"
        style={{
          pointerEvents: "all",
          transform: `translate(calc(${info.width / 2}px - 50%), ${-40}px)`,
        }}
        onPointerDown={stopEventPropagation}
        onClick={() => handleScale(1.2)}
      >
        Thicken
      </Button>
      <Button
        variant="secondary"
        style={{
          position: "absolute",
          pointerEvents: "all",
          transform: `translate(calc(${info.width / 2}px - 50%), ${
            info.height + 40
          }px)`,
        }}
        onPointerDown={stopEventPropagation}
        onClick={() => handleScale(0.8)}
      >
        Thin
      </Button>
    </div>
  );
};
