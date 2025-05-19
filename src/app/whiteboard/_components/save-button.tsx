import {
  DefaultMainMenu,
  DefaultMainMenuContent,
  TldrawUiMenuGroup,
  TldrawUiMenuItem,
  useDialogs,
} from "tldraw";
import { SaveDialog } from "./save-dialog";

export const SaveButton = () => {
  const { addDialog } = useDialogs();
  const handleSelect = () => {
    addDialog({
      component: SaveDialog,
      id: "save-dialog",
    });
  };
  return (
    <DefaultMainMenu>
      <div>
        <TldrawUiMenuGroup id="save-button">
          <TldrawUiMenuItem
            id="save"
            label="Save"
            readonlyOk
            onSelect={handleSelect}
          />
        </TldrawUiMenuGroup>
      </div>
      <DefaultMainMenuContent />
    </DefaultMainMenu>
  );
};
