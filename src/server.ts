#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { renderDoctor, renderHelp, resolveCliAction, serverVersion } from "./cli.js";
import { loadConfig } from "./config.js";
import { registerPeepTrendTools } from "./tools.js";

const config = loadConfig();
const action = resolveCliAction(process.argv.slice(2), process.stdin.isTTY === true);

if (action === "help" || action === "manual") {
  console.log(renderHelp(config));
  process.exit(0);
}

if (action === "version") {
  console.log(serverVersion);
  process.exit(0);
}

if (action === "doctor") {
  console.log(renderDoctor(config));
  process.exit(0);
}

if (action === "unknown") {
  console.error(renderHelp(config));
  process.exit(1);
}

const server = new McpServer({
  name: "PeepTrend: YouTube Gaming Trend Finder",
  version: serverVersion
});

registerPeepTrendTools(server, config);

const transport = new StdioServerTransport();
await server.connect(transport);
