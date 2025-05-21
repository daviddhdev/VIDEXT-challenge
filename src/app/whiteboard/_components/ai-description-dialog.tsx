import { TldrawUiDialogHeader, TldrawUiDialogTitle } from "tldraw";

import { TldrawUiDialogBody } from "tldraw";

import { TldrawUiButtonLabel } from "tldraw";

import { TldrawUiDialogFooter } from "tldraw";
import { Button } from "~/components/ui/button";

interface AIDescriptionDialogProps {
  description: string;
  onClose: () => void;
}
export const AIDescriptionDialog: React.FC<AIDescriptionDialogProps> = ({
  description,
  onClose,
}) => {
  return (
    <>
      <TldrawUiDialogHeader className="p-3">
        <TldrawUiDialogTitle className="text-lg! font-bold! text-center">
          AI Description
        </TldrawUiDialogTitle>
      </TldrawUiDialogHeader>
      <TldrawUiDialogBody className="min-w-[350px]">
        <p>{description}</p>
      </TldrawUiDialogBody>
      <TldrawUiDialogFooter className="tlui-dialog__footer__actions gap-2 p-3">
        <Button type="button" variant="outline" onClick={onClose}>
          <TldrawUiButtonLabel>Close</TldrawUiButtonLabel>
        </Button>
      </TldrawUiDialogFooter>
    </>
  );
};
