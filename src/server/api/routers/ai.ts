import { z } from "zod";
import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const aiRouter = createTRPCRouter({
  describeImage: publicProcedure
    .input(
      z.object({
        image: z.string(), // base64 encoded image
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Convert base64 to byte array
        const base64Data = input.image.startsWith("data:")
          ? input.image.split(",")[1] ?? ""
          : input.image;
        if (!base64Data) {
          throw new Error("Invalid image data");
        }
        const imageBytes = Buffer.from(base64Data, "base64");
        const imageArray = Array.from(imageBytes);

        const response = await fetch(
          `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/llava-hf/llava-1.5-7b-hf`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              image: imageArray,
              prompt:
                "Please describe this whiteboard drawing in detail. Focus on the main elements, their relationships, and any text or annotations present.",
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          console.error("Cloudflare AI error:", errorData);
          throw new Error(
            errorData?.errors?.[0]?.message ||
              "Failed to get description from Cloudflare AI"
          );
        }

        const data = await response.json();
        const description = data.result?.description;

        if (!description) {
          throw new Error("No description generated");
        }

        return { description };
      } catch (error) {
        console.error("Error processing image:", error);
        throw error;
      }
    }),
});
