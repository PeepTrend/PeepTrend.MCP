# PeepTrend for Claude

## Claude Code Plugin

```bash
claude plugin marketplace add PeepTrend/PeepTrend.MCP
claude plugin install peeptrend-youtube-gaming-trend-finder@peeptrend
```

Run `/reload-plugins` in an open Claude Code session after installation.

Then connect your PeepTrend account:

```bash
claude mcp add peeptrend -e PEEPTREND_API_KEY=pt_key_from_profile -- npx -y peeptrend-mcp
```

Create or revoke keys at https://peeptrend.com/profile.

Without a key, free checks can still run with public limits. Full feeds, reports, generated ideas, saved plans, alerts, account-aware limits, and subscription features need `PEEPTREND_API_KEY`.

## Claude Desktop MCP

Add PeepTrend to Claude Desktop as an MCP server:

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

Suggested first prompt:

"Use PeepTrend to check connection status, then find a gaming topic I can record this week. Prefer lower saturation and explain the evidence."

The portable Claude skill prompt is in `skills/claude/peeptrend-youtube-gaming-trend-finder/SKILL.md`.

Full setup guide:

https://github.com/PeepTrend/PeepTrend.MCP/blob/main/SETUP.md
