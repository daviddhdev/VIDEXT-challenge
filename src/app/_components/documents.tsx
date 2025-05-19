"use client";

import { Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
const DocumentsSkeleton = () => {
  return (
    <div className="w-full max-w-md rounded-lg border bg-card p-6 shadow-sm">
      <div className="mb-4 h-6 w-32 animate-pulse rounded bg-muted" />
      <div className="flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-10 w-full animate-pulse rounded-md bg-muted"
          />
        ))}
      </div>
    </div>
  );
};

export const Documents = () => {
  const { data: documents, isLoading } = api.document.getAll.useQuery();

  if (isLoading) return <DocumentsSkeleton />;

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
              <div className="flex w-full items-center justify-between gap-2 p-2">
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {document.name}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="z-10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground hover:cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 py-8 text-center">
          <p className="text-muted-foreground">You have no documents yet.</p>
          <Button asChild variant="default">
            <Link href="/whiteboard">Create your first document</Link>
          </Button>
        </div>
      )}
    </div>
  );
};
