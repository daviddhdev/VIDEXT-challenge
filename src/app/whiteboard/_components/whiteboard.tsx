"use client";
import { Tldraw, type TLComponents, type TLEditorSnapshot } from "tldraw";
import { AutoSave } from "./auto-save";
import { HomePanel } from "./home-panel";
import { MainMenu } from "./main-menu";
import { ShapeModifier } from "./shape-modifier";
interface WhiteboardProps {
  snapshot?: TLEditorSnapshot;
}

const components: TLComponents = {
  MainMenu: MainMenu,
  SharePanel: HomePanel,
  InFrontOfTheCanvas: ShapeModifier,
};

export const Whiteboard = ({ snapshot }: WhiteboardProps) => {
  return (
    <div className="fixed inset-0">
      <Tldraw snapshot={snapshot} components={components}>
        <AutoSave />
      </Tldraw>
    </div>
  );
};
