import { useRouter } from "next/navigation";
import {
  TldrawUiButtonLabel,
  TldrawUiDialogBody,
  TldrawUiDialogFooter,
  TldrawUiDialogHeader,
  TldrawUiDialogTitle,
} from "tldraw";
import { Button } from "~/components/ui/button";
interface UnsavedChangesDialogProps {
  onClose: () => void;
}

export const UnsavedChangesDialog: React.FC<UnsavedChangesDialogProps> = ({
  onClose,
}) => {
  const router = useRouter();
  const handleLeave = () => {
    router.push("/");
  };
  return (
    <>
      <TldrawUiDialogHeader className="p-3">
        <TldrawUiDialogTitle className="text-lg! font-bold! text-center">
          You have unsaved changes
        </TldrawUiDialogTitle>
      </TldrawUiDialogHeader>

      <TldrawUiDialogBody className="min-w-[350px]">
        <p>You have unsaved changes. Are you sure you want to leave?</p>
      </TldrawUiDialogBody>
      <TldrawUiDialogFooter className="tlui-dialog__footer__actions gap-2 p-3">
        <Button type="button" variant="outline" onClick={onClose}>
          <TldrawUiButtonLabel>Cancel</TldrawUiButtonLabel>
        </Button>
        <Button type="button" onClick={handleLeave}>
          <TldrawUiButtonLabel>Leave</TldrawUiButtonLabel>
        </Button>
      </TldrawUiDialogFooter>
    </>
  );
};
