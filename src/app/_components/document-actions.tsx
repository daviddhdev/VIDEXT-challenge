"use client";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { deleteDocument } from "~/app/_actions/documents";
import { Button } from "~/components/ui/button";

interface DocumentActionsProps {
  documentId: number;
  documentName: string;
}

export const DocumentActions: React.FC<DocumentActionsProps> = ({
  documentId,
  documentName,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setIsDeleting(true);
      await deleteDocument(documentId);
      setIsDeleting(false);
      toast.success("Document deleted successfully");
    } catch (error) {
      toast.error("Failed to delete document");
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-between gap-2 p-2">
      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
        {documentName}
      </span>
      <Button
        variant="destructive"
        size="icon"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
