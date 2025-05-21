import { useRouter } from "next/navigation";
import { useDialogs, useEditor } from "tldraw";
import { Button } from "~/components/ui/button";
import { useDirtyState } from "~/hooks/useDirtyState";
import { UnsavedChangesDialog } from "./unsaved-changes-dialog";

export const HomePanel = () => {
  const editor = useEditor();
  const { addDialog } = useDialogs();
  const router = useRouter();
  const isDirty = useDirtyState();

  const handleClick = () => {
    if (isDirty) {
      addDialog({
        component: UnsavedChangesDialog,
        id: "unsaved-changes-dialog",
      });
    } else {
      router.push("/");
    }
  };
  return (
    <Button
      asChild
      variant="default"
      className="m-2 w-[148px] cursor-pointer z-[300] pointer-events-auto"
      onClick={handleClick}
    >
      <span className="text-xs">Go back</span>
    </Button>
  );
};
