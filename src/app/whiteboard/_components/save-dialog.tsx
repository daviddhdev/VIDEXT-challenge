"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  getSnapshot,
  TldrawUiButtonLabel,
  TldrawUiDialogBody,
  TldrawUiDialogFooter,
  TldrawUiDialogHeader,
  useEditor,
  useToasts,
} from "tldraw";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

const formSchema = z.object({
  documentName: z.string().min(2).max(50),
});
interface SaveDialogProps {
  onClose: () => void;
}

export const SaveDialog: React.FC<SaveDialogProps> = ({ onClose }) => {
  const editor = useEditor();
  const { addToast } = useToasts();

  const onSubmit = async ({ documentName }: { documentName: string }) => {
    const { document, session } = getSnapshot(editor.store);
    console.log(document, session);
    // await saveDocumentState(documentId, document);
    onClose();
    addToast({
      title: "Document saved",
      description: `Document ${documentName} saved successfully`,
      severity: "success",
    });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentName: "",
    },
  });
  return (
    <>
      <TldrawUiDialogHeader className="p-3">
        <span className="text-lg font-bold">
          Save your document to the database
        </span>
      </TldrawUiDialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="documentName"
            render={({ field }) => (
              <TldrawUiDialogBody className="min-w-[350px]">
                <FormItem>
                  <FormLabel>Document Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Meeting Notes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </TldrawUiDialogBody>
            )}
          />
          <TldrawUiDialogFooter className="tlui-dialog__footer__actions gap-2 p-3">
            <Button type="button" variant="outline" onClick={onClose}>
              <TldrawUiButtonLabel>Cancel</TldrawUiButtonLabel>
            </Button>
            <Button type="submit">
              <TldrawUiButtonLabel>Save</TldrawUiButtonLabel>
            </Button>
          </TldrawUiDialogFooter>
        </form>
      </Form>
    </>
  );
};
