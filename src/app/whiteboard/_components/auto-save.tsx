import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { getSnapshot, useEditor } from "tldraw";
import { api } from "~/trpc/react";

const DEBOUNCE_DELAY = 1000;

export const AutoSave = () => {
  const editor = useEditor();
  const params = useParams();
  const id = params?.id;
  const { mutateAsync: updateDocument } = api.document.update.useMutation();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!id) return;

    const unlisten = editor.store.listen(
      () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(async () => {
          try {
            const { document } = getSnapshot(editor.store);
            await updateDocument({
              id: Number(id),
              content: JSON.stringify(document),
            });
          } catch (error) {
            toast.error("Failed to auto-save changes");
          }
        }, DEBOUNCE_DELAY);
      },
      { scope: "document", source: "user" }
    );

    return () => {
      unlisten();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [editor.store, id, updateDocument]);

  return null;
};
