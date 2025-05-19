import { HydrateClient } from "~/trpc/server";
import { Whiteboard } from "./_components/whiteboard";
export default function WhiteboardPage() {
  return (
    <HydrateClient>
      <Whiteboard />
    </HydrateClient>
  );
}
