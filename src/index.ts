import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
// Imported only for detection — xmcp's `xmcp build`/`xmcp start` toolchain
// requires Rspack and a config-driven runtime that is out of scope for a
// smoke-test fixture.
import type { XmcpConfig } from "xmcp";

const _xmcpConfig: XmcpConfig = {
  http: { port: 3000, host: "0.0.0.0", endpoint: "/mcp" },
};

function getServer() {
  const server = new McpServer(
    { name: "mcp-detect-xmcp", version: "0.1.0" },
    { capabilities: { tools: {}, resources: {} } },
  );

  server.registerTool(
    "echo",
    {
      description: "Echo the input back as text.",
      inputSchema: { text: z.string().describe("Text to echo") },
    },
    async ({ text }) => ({ content: [{ type: "text", text }] }),
  );

  server.registerTool(
    "greet_widget",
    {
      description:
        "Greet someone and return an HTML widget rendered by the MCP client.",
      inputSchema: { name: z.string().describe("Name to greet") },
    },
    async ({ name }) => ({
      content: [
        { type: "text", text: `Hello, ${name}!` },
        {
          type: "resource",
          resource: {
            uri: `ui://greet/${encodeURIComponent(name)}`,
            mimeType: "text/html",
            text: `<!doctype html><html><body style="font:16px/1.4 system-ui;padding:24px"><h1 style="margin:0 0 8px">Hello, ${name}!</h1><p style="color:#555">Greeting widget served by mcp-detect-xmcp.</p></body></html>`,
          },
        },
      ],
    }),
  );

  return server;
}

const app = express();
app.use(express.json());

app.post("/mcp", async (req, res) => {
  try {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });
    const server = getServer();
    res.on("close", () => {
      transport.close();
      server.close();
    });
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        id: null,
        error: { code: -32603, message: String(err) },
      });
    }
  }
});

app.get("/mcp", (_req, res) => {
  res.status(405).json({
    jsonrpc: "2.0",
    id: null,
    error: { code: -32000, message: "Method not allowed." },
  });
});

const port = Number(process.env.PORT ?? "3000");
app.listen(port, "0.0.0.0", () => {
  console.log(`[mcp-detect-xmcp] listening on :${port}/mcp`);
});
