"use client";
import { Tldraw, type TLComponents, type TLEditorSnapshot } from "tldraw";
import { SaveButton } from "./save-button";
interface WhiteboardProps {
  snapshot?: TLEditorSnapshot;
}

const components: TLComponents = {
  MainMenu: SaveButton,
};
export const Whiteboard = ({ snapshot }: WhiteboardProps) => {
  return (
    <div className="fixed inset-0">
      <Tldraw snapshot={snapshot} components={components} />
    </div>
  );
};
