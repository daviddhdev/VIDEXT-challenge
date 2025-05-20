import Link from "next/link";
import { Suspense } from "react";
import { Button } from "~/components/ui/button";
import { HydrateClient } from "~/trpc/server";
import { Documents } from "./_components/documents";
import { DocumentsSkeleton } from "./_components/documents-skeleton";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to your whiteboard
          </h1>
          <p className="text-muted-foreground">
            Create and manage your whiteboard documents
          </p>
        </div>
        <Button asChild variant="default" size="lg">
          <Link href="/whiteboard">Open new whiteboard</Link>
        </Button>
        <Suspense fallback={<DocumentsSkeleton />}>
          <Documents />
        </Suspense>
      </main>
    </HydrateClient>
  );
}
