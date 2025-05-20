"use server";

import { revalidatePath } from "next/cache";
import { api } from "~/trpc/server";

export async function deleteDocument(id: number) {
  await api.document.delete({ id });
  revalidatePath("/");
}
