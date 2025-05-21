import { notFound } from "next/navigation";
import { HydrateClient, api } from "~/trpc/server";
import { Whiteboard } from "../_components/whiteboard";

export default async function WhiteboardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const document = await api.document.getById({
    id: parseInt(id),
  });

  if (!document) {
    notFound();
  }

  const parsedDocument = document.content
    ? JSON.parse(document.content)
    : undefined;

  return (
    <HydrateClient>
      <Whiteboard snapshot={parsedDocument} />
    </HydrateClient>
  );
}
