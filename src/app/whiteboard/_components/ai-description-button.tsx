"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import {
  TldrawUiMenuGroup,
  TldrawUiMenuItem,
  useDialogs,
  useEditor,
} from "tldraw";
import { api } from "~/trpc/react";
import { AIDescriptionDialog } from "./ai-description-dialog";

export const AIDescriptionButton = () => {
  const editor = useEditor();
  const { addDialog } = useDialogs();
  const describeImage = api.ai.describeImage.useMutation({
    onSuccess: (data) => {
      addDialog({
        component: ({ onClose }) => (
          <AIDescriptionDialog
            description={data.description}
            onClose={onClose}
          />
        ),
        id: "ai-description-dialog",
      });
    },
    onError: (error) => {
      console.error("Error getting description:", error);
      toast.error(`Failed to get description: ${error.message}`);
    },
  });

  const getDescription = useCallback(async () => {
    if (!editor) return;

    try {
      const shapeIds = editor.getCurrentPageShapeIds();
      if (shapeIds.size === 0) {
        toast.error("Please draw something on the canvas first");
        return;
      }

      const bounds = editor.getCurrentPageBounds();
      if (!bounds) {
        toast.error("Could not get canvas bounds");
        return;
      }

      const { blob } = await editor.toImage([...shapeIds], {
        format: "png",
        background: true,
        padding: 20,
        scale: 1,
        quality: 1,
      });

      const reader = new FileReader();
      reader.readAsDataURL(blob);

      reader.onloadend = async () => {
        const base64data = reader.result;
        if (typeof base64data !== "string") {
          throw new Error("Failed to convert image to base64");
        }
        const base64Image = base64data.split(",")[1];
        if (!base64Image) {
          throw new Error("Failed to extract base64 data");
        }

        await describeImage.mutateAsync({ image: base64Image });
      };

      reader.onerror = () => {
        throw new Error("Failed to convert image to base64");
      };
    } catch (error) {
      console.error("Error getting description:", error);
      toast.error("Failed to get description. Please try again.");
    }
  }, [editor, describeImage]);

  return (
    <TldrawUiMenuGroup id="ai-description-button">
      <TldrawUiMenuItem
        id="ai-description"
        label={
          describeImage.isPending
            ? "Getting description..."
            : "Get AI Description"
        }
        onSelect={getDescription}
        disabled={describeImage.isPending}
        spinner={describeImage.isPending}
        noClose
      />
    </TldrawUiMenuGroup>
  );
};
