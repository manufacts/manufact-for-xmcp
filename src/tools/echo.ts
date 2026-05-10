import { z } from "zod";
import { type InferSchema, type ToolMetadata } from "xmcp";

export const schema = {
  text: z.string().describe("Text to echo"),
};

export const metadata: ToolMetadata = {
  name: "echo",
  description: "Echo the input back as text.",
};

export default async function echo({ text }: InferSchema<typeof schema>) {
  return text;
}
