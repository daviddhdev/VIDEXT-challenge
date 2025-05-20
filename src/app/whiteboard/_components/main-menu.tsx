import { DefaultMainMenu, DefaultMainMenuContent } from "tldraw";
import { SaveNewButton } from "./save-button";
import { SaveExistingButton } from "./save-existing-button";

export const MainMenu = () => {
  return (
    <DefaultMainMenu>
      <SaveNewButton />
      <SaveExistingButton />
      <DefaultMainMenuContent />
    </DefaultMainMenu>
  );
};
