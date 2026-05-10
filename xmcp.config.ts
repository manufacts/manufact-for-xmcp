import { type XmcpConfig } from "xmcp";

// Bind on all interfaces and let xmcp's runtime read the port from
// `process.env.PORT` (defaults to 3001 if unset). Don't hardcode a port here
// because xmcp serializes the config at build time; baking it would defeat
// the runtime override.
const config: XmcpConfig = {
  http: {
    host: "0.0.0.0",
  },
  paths: {
    tools: "./src/tools",
    prompts: false,
    resources: false,
  },
};

export default config;
