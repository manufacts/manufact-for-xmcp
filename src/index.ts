import * as http from "node:http";
import type { XmcpConfig } from "xmcp";

const config: XmcpConfig = {
  http: {
    port: Number(process.env.PORT ?? "3000"),
    host: "0.0.0.0",
    endpoint: "/mcp",
  },
};

const httpCfg = typeof config.http === "object" ? config.http : undefined;
const port = httpCfg?.port ?? 3000;
const endpoint = httpCfg?.endpoint ?? "/mcp";

http
  .createServer(async (req, res) => {
    const chunks: Buffer[] = [];
    for await (const c of req) chunks.push(c as Buffer);
    const bodyText = Buffer.concat(chunks).toString("utf8");
    if (req.url === endpoint && req.method === "POST") {
      let id: unknown = null;
      try {
        const parsed = JSON.parse(bodyText) as { id?: unknown };
        id = parsed?.id ?? null;
      } catch {
        // ignore parse errors
      }
      res.setHeader("content-type", "application/json");
      res.end(
        JSON.stringify({
          jsonrpc: "2.0",
          id,
          result: {
            protocolVersion: "2024-11-05",
            capabilities: {},
            serverInfo: { name: "mcp-detect-xmcp", version: "0.1.0" },
          },
        }),
      );
      return;
    }
    res.statusCode = 404;
    res.end();
  })
  .listen(port, "0.0.0.0", () => {
    console.log(`[mcp-detect-xmcp] listening on :${port}${endpoint}`);
  });
