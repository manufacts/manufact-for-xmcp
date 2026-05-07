import type { XmcpConfig } from "xmcp";

const config: XmcpConfig = {
  http: {
    port: 3000,
    host: "0.0.0.0",
    endpoint: "/mcp",
  },
};

export default config;
