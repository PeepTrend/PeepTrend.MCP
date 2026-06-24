import { authStatus, type PeepTrendMcpConfig } from "./config.js";

export const serverVersion = "0.1.2";

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
    "What works without setup:",
    "  Free research checks can run with public limits.",
    "",
    "What needs a PeepTrend API key:",
    "  Full opportunity feeds, reports, generated ideas, saved plans, feedback, alerts, account limits, and subscription features.",
    "",
    "Get your key:",
    `  1. Open ${config.websiteBaseUrl}/profile`,
    "  2. Create an API key under AI integrations",
    "  3. Add it to your AI client as PEEPTREND_API_KEY",
    "",
    "Codex:",
    "  codex plugin marketplace add PeepTrend/PeepTrend.MCP",
    "  codex plugin add peeptrend-youtube-gaming-trend-finder@peeptrend",
    "  codex mcp add peeptrend --env PEEPTREND_API_KEY=pt_key_from_profile -- npx -y peeptrend-mcp",
    "",
    "Claude Code:",
    "  claude plugin marketplace add PeepTrend/PeepTrend.MCP",
    "  claude plugin install peeptrend-youtube-gaming-trend-finder@peeptrend",
    "  claude mcp add peeptrend -e PEEPTREND_API_KEY=pt_key_from_profile -- npx -y peeptrend-mcp",
    "",
    "Generic MCP config:",
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
    `Profile / API keys: ${config.websiteBaseUrl}/profile`,
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
      ? "Ready: ask your AI client to use PeepTrend for YouTube gaming trend research. Account-aware tools can use your PeepTrend limits and subscription access."
      : "Installed, but not connected to a PeepTrend account yet. Free checks can still run with public limits; full reports, feeds, generated ideas, saved plans, alerts, and higher limits need PEEPTREND_API_KEY.",
    "",
    connected
      ? "To rotate or revoke the key, open PeepTrend Profile > AI integrations."
      : `Create a key at ${config.websiteBaseUrl}/profile, then set PEEPTREND_API_KEY in Codex, Claude, OpenClaw, or your MCP client config.`,
    "",
    `Setup guide: ${config.websiteBaseUrl}/integrations/mcp`
  ].join("\n");
}
