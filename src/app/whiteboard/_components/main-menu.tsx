import { DefaultMainMenu, DefaultMainMenuContent } from "tldraw";
import { AIDescriptionButton } from "./ai-description-button";
import { SaveNewButton } from "./save-button";
import { SaveExistingButton } from "./save-existing-button";

export const MainMenu = () => {
  return (
    <DefaultMainMenu>
      <SaveNewButton />
      <SaveExistingButton />
      <AIDescriptionButton />
      <DefaultMainMenuContent />
    </DefaultMainMenu>
  );
};
