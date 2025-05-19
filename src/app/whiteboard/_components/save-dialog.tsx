"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  getSnapshot,
  TldrawUiButtonLabel,
  TldrawUiDialogBody,
  TldrawUiDialogFooter,
  TldrawUiDialogHeader,
  TldrawUiDialogTitle,
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
import { api } from "~/trpc/react";

const formSchema = z.object({
  documentName: z.string().min(2).max(50),
});

interface SaveDialogProps {
  onClose: () => void;
}

export const SaveDialog: React.FC<SaveDialogProps> = ({ onClose }) => {
  const editor = useEditor();
  const { addToast } = useToasts();
  const { mutateAsync: createDocument, isPending } =
    api.document.create.useMutation();

  const onSubmit = async ({ documentName }: { documentName: string }) => {
    const { document } = getSnapshot(editor.store);
    try {
      await createDocument({
        name: documentName,
        content: JSON.stringify(document),
      });

      onClose();
      addToast({
        title: "Document saved",
        description: `Document ${documentName} saved successfully`,
        severity: "success",
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes("already exists")) {
        form.setError("documentName", {
          type: "manual",
          message: error.message,
        });
      } else {
        addToast({
          title: "Error",
          description: "Failed to save document",
          severity: "error",
        });
      }
    }
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
        <TldrawUiDialogTitle className="text-lg! font-bold! text-center">
          Save your document to the database
        </TldrawUiDialogTitle>
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
                    <Input
                      placeholder="Meeting Notes"
                      {...field}
                      disabled={isPending}
                    />
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
            <Button type="submit" disabled={isPending}>
              <TldrawUiButtonLabel>
                {isPending ? "Saving..." : "Save"}
              </TldrawUiButtonLabel>
            </Button>
          </TldrawUiDialogFooter>
        </form>
      </Form>
    </>
  );
};
