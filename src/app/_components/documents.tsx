import Link from "next/link";
import { api } from "~/trpc/server";
import { DocumentActions } from "./document-actions";

export const Documents: React.FC = async () => {
  const documents = await api.document.getAll();

  return (
    <div className="w-full max-w-md rounded-lg border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Your Documents</h2>
      {documents && documents.length > 0 ? (
        <div className="flex flex-col gap-2">
          {documents.map((document) => (
            <Link
              href={`/whiteboard/${document.id}`}
              key={document.id}
              className="group block transition-colors hover:bg-muted/50 rounded-md"
            >
              <DocumentActions
                documentId={document.id}
                documentName={document.name}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 py-8 text-center">
          <p className="text-muted-foreground">You have no documents yet.</p>
        </div>
      )}
    </div>
  );
};
