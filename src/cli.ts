import { authStatus, type PeepTrendMcpConfig } from "./config.js";

export const serverVersion = "0.1.1";

export type CliAction = "help" | "version" | "doctor" | "manual" | "stdio" | "unknown";

export function resolveCliAction(args: string[], stdinIsTty: boolean): CliAction {
  const firstArg = args[0];

  if (firstArg === "--stdio") {
    return "stdio";
  }

  if (firstArg === "--help" || firstArg === "-h" || firstArg === "help") {
    return "help";
  }

  if (firstArg === "--version" || firstArg === "-v" || firstArg === "version") {
    return "version";
  }

  if (firstArg === "--doctor" || firstArg === "doctor") {
    return "doctor";
  }

  if (args.length === 0 && stdinIsTty) {
    return "manual";
  }

  return args.length === 0 ? "stdio" : "unknown";
}

export function renderHelp(config: PeepTrendMcpConfig) {
  return [
    "PeepTrend MCP is installed and ready.",
    "",
    "This package is an MCP server for AI clients. Add it to Codex, Claude Desktop, OpenClaw, or any MCP-compatible client instead of using it as an interactive shell command.",
    "",
    "Quick config:",
    "{",
    '  "mcpServers": {',
    '    "peeptrend": {',
    '      "command": "npx",',
    '      "args": ["-y", "peeptrend-mcp"],',
    '      "env": {',
    '        "PEEPTREND_API_KEY": "pt_key_from_profile"',
    "      }",
    "    }",
    "  }",
    "}",
    "",
    "Useful commands:",
    "  npx -y peeptrend-mcp --doctor",
    "  npx -y peeptrend-mcp --help",
    "  npx -y peeptrend-mcp --stdio",
    "",
    `Profile/API keys: ${config.websiteBaseUrl}/profile`,
    `Setup guide: ${config.websiteBaseUrl}/integrations/mcp`
  ].join("\n");
}

export function renderDoctor(config: PeepTrendMcpConfig, nodeVersion = process.version) {
  const connected = authStatus(config) === "authenticated";

  return [
    "PeepTrend MCP status",
    "",
    `Node: ${nodeVersion}`,
    `API endpoint: ${config.apiBaseUrl}`,
    `Website: ${config.websiteBaseUrl}`,
    `API key: ${connected ? "found" : "not configured"}`,
    "",
    connected
      ? "Ready: add the MCP config to your AI client and ask it to use PeepTrend."
      : "Ready for setup: create an API key in PeepTrend Profile, then add it as PEEPTREND_API_KEY in your MCP client config.",
    "",
    `Setup guide: ${config.websiteBaseUrl}/integrations/mcp`
  ].join("\n");
}
