"use client";
import { Trash2 } from "lucide-react";
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
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    await deleteDocument(documentId);
  };

  return (
    <div className="flex w-full items-center justify-between gap-2 p-2">
      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
        {documentName}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="z-10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground hover:cursor-pointer"
        onClick={handleDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
