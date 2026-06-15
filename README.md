[![Deploy to mcp-use](https://cdn.mcp-use.com/deploy.svg)](https://mcp-use.com/deploy/start?repository-url=https%3A%2F%2Fgithub.com%2Fmanufacts%2Fmanufact-for-xmcp&branch=main&project-name=manufact-for-xmcp&port=3001&build-command=npm+run+build&start-command=npm+start&runtime=node&base-image=node%3A20)

<div align="center">

# xmcp MCP Apps example

**Reference server for the [xmcp deploy guide](https://mcp-use.com/blog/mcp-app-with-xmcp)** — same `echo` + `greet_widget` example used in our [seven-framework comparison](https://mcp-use.com/blog/deploying-seven-mcp-frameworks).

Built with [`xmcp`](https://github.com/basementstudio/xmcp) — file-based tools where each `.tsx` in `src/tools/` is both a tool definition and a React handler.

**Live demo:** [`wild-forge-xqrd6.run.mcp-use.com/mcp`](https://wild-forge-xqrd6.run.mcp-use.com/mcp)

</div>

---

## Deploy to Manufact Cloud

Click the badge above, or open the [one-click deploy flow](https://mcp-use.com/deploy/start?repository-url=https%3A%2F%2Fgithub.com%2Fmanufacts%2Fmanufact-for-xmcp&branch=main&project-name=manufact-for-xmcp&port=3001&build-command=npm+run+build&start-command=npm+start&runtime=node&base-image=node%3A20). Sign in, connect GitHub, and Manufact clones this repo into your account and deploys it.

If you deploy manually from the dashboard instead:

| Setting | Value |
| --- | --- |
| **Port** | `3001` |
| **Build command** | `npm run build` |
| **Start command** | `npm start` |

Manufact detects `xmcp` and labels the repo accordingly.

> **Port 3001:** xmcp bakes its HTTP port at build time (Zod default `3001`). Set the platform port to **3001** to match, or change `http.port` in `xmcp.config.ts` and rebuild for a different target.

---

## What's in this repo

- An `echo` tool (`src/tools/echo.ts`)
- A `greet_widget` tool + React handler (`src/tools/greet_widget.tsx`)
- Streamable HTTP at `/mcp` via xmcp's Rspack build

---

## Getting started

```bash
npm install
npm run dev
```

For a production-style local run:

```bash
npm run build
npm start
```

Open `http://localhost:3001/mcp`.

---

## Project layout

```
src/tools/
  echo.ts           # Plain tool
  greet_widget.tsx  # Tool metadata + React component
xmcp.config.ts      # xmcp project config
```

See the [deploy guide](https://mcp-use.com/blog/mcp-app-with-xmcp) for the full reference server walkthrough.
