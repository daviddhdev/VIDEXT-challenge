import { TldrawUiMenuGroup, TldrawUiMenuItem, useDialogs } from "tldraw";
import { SaveDialog } from "./save-dialog";

export const SaveNewButton = () => {
  const { addDialog } = useDialogs();
  const handleSelect = () => {
    addDialog({
      component: SaveDialog,
      id: "save-dialog",
    });
  };
  return (
    <div>
      <TldrawUiMenuGroup id="save-new-button">
        <TldrawUiMenuItem
          id="save-new"
          label="Save as..."
          readonlyOk
          onSelect={handleSelect}
        />
      </TldrawUiMenuGroup>
    </div>
  );
};
