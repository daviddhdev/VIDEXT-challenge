import { useEffect, useState } from "react";
import { useEditor } from "tldraw";

export const useDirtyState = () => {
  const editor = useEditor();
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const unlisten = editor.store.listen(
      () => {
        setIsDirty(true);
      },
      { scope: "document", source: "user" }
    );
    return () => {
      unlisten();
    };
  }, [editor.store]);

  return isDirty;
};
