import {
  DefaultMainMenu,
  DefaultMainMenuContent,
  getSnapshot,
  TldrawUiMenuGroup,
  TldrawUiMenuItem,
  useEditor,
} from "tldraw";

export const SaveButton = () => {
  const editor = useEditor();
  const handleSave = async () => {
    const { document, session } = getSnapshot(editor.store);
    console.log(document, session);
    // await saveDocumentState(documentId, document);
  };
  return (
    <DefaultMainMenu>
      <div>
        <TldrawUiMenuGroup id="save-button">
          <TldrawUiMenuItem
            id="save"
            label="Save"
            readonlyOk
            onSelect={handleSave}
          />
        </TldrawUiMenuGroup>
      </div>
      <DefaultMainMenuContent />
    </DefaultMainMenu>
  );
};
