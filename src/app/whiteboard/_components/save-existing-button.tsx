import { useParams } from "next/navigation";
import { toast } from "sonner";
import {
  getSnapshot,
  TldrawUiMenuGroup,
  TldrawUiMenuItem,
  useEditor,
} from "tldraw";
import { api } from "~/trpc/react";

export const SaveExistingButton = () => {
  const params = useParams();
  const id = params?.id;
  const editor = useEditor();
  const { mutateAsync: updateDocument } = api.document.update.useMutation();

  const handleSelect = async () => {
    const { document } = getSnapshot(editor.store);
    try {
      await updateDocument({
        id: Number(id),
        content: JSON.stringify(document),
      });

      toast.success(`Document saved successfully`);
    } catch (error) {
      toast.error("Failed to save document");
    }
  };

  return (
    <div>
      <TldrawUiMenuGroup id="save-existing-button">
        <TldrawUiMenuItem
          id="save-existing"
          label="Save"
          readonlyOk
          onSelect={handleSelect}
          disabled={!id}
        />
      </TldrawUiMenuGroup>
    </div>
  );
};
