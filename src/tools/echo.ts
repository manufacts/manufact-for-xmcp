import { z } from "zod";
import { type InferSchema } from "xmcp";

export const schema = {
  text: z.string().describe("Text to echo back"),
};

export const metadata = {
  name: "echo",
  description: "Echo a string back (xmcp framework smoke test).",
};

export default async function echo({ text }: InferSchema<typeof schema>) {
  return text;
}
