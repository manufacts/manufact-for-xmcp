import { z } from "zod";
import { type InferSchema, type ToolMetadata } from "xmcp";
import "../../globals.css";

export const schema = {
  name: z.string().describe("Name to greet"),
};

export const metadata: ToolMetadata = {
  name: "greet_widget",
  description: "Greet someone and render an MCP App view (xmcp widget).",
  _meta: {
    ui: {
      // No external connections required by this widget; the only "input" it
      // renders comes from the tool args injected by the host.
      csp: { connectDomains: [] },
      prefersBorder: true,
    },
  },
};

export default function GreetWidget({ name }: InferSchema<typeof schema>) {
  return (
    <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
      <div className="max-w-md w-full border border-white/10 bg-white/5 p-8">
        <div className="text-sm font-mono text-zinc-500 uppercase tracking-wider mb-2">
          Greet
        </div>
        <h1 className="text-4xl font-light tracking-tight mb-2">
          Hello, {name}!
        </h1>
        <p className="text-sm text-zinc-400">
          Greeting widget served by mcp-detect-xmcp.
        </p>
      </div>
    </div>
  );
}
