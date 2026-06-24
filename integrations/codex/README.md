# PeepTrend for Codex

PeepTrend can be used in Codex through the MCP server or the bundled Codex plugin scaffold in this repository.

## Plugin Install

```bash
codex plugin marketplace add PeepTrend/PeepTrend.MCP
codex plugin add peeptrend-youtube-gaming-trend-finder@peeptrend
```

Restart Codex or start a new thread after installation.

Then connect your PeepTrend account:

```bash
codex mcp add peeptrend --env PEEPTREND_API_KEY=pt_key_from_profile -- npx -y peeptrend-mcp
```

Create or revoke keys at https://peeptrend.com/profile.

Without a key, free checks can still run with public limits. Full feeds, reports, generated ideas, saved plans, alerts, account-aware limits, and subscription features need `PEEPTREND_API_KEY`.

Starter prompt:

```text
Use PeepTrend to check connection status, then find YouTube gaming opportunities for my channel.
```

## MCP Config

```json
{
  "mcpServers": {
    "peeptrend": {
      "command": "npx",
      "args": ["-y", "peeptrend-mcp"],
      "env": {
        "PEEPTREND_API_KEY": "pt_key_from_profile"
      }
    }
  }
}
```

## Plugin Scaffold

The Codex plugin manifest lives at:

`plugins/peeptrend-youtube-gaming-trend-finder/.codex-plugin/plugin.json`

It declares the same MCP server and a focused PeepTrend skill for YouTube gaming trend research.

Full setup guide:

https://github.com/PeepTrend/PeepTrend.MCP/blob/main/SETUP.md
