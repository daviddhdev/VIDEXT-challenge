"use client";
import { Tldraw, type TLComponents, type TLEditorSnapshot } from "tldraw";
import { HomePanel } from "./home-panel";
import { MainMenu } from "./main-menu";
interface WhiteboardProps {
  snapshot?: TLEditorSnapshot;
}

const components: TLComponents = {
  MainMenu: MainMenu,
  SharePanel: HomePanel,
};
export const Whiteboard = ({ snapshot }: WhiteboardProps) => {
  return (
    <div className="fixed inset-0">
      <Tldraw snapshot={snapshot} components={components} />
    </div>
  );
};
