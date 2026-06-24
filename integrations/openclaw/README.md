# PeepTrend for OpenClaw

Install the skill from ClawHub:

```bash
clawhub install peeptrend-youtube-gaming-trend-finder
```

Add the PeepTrend MCP server to OpenClaw's MCP configuration:

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

"Use PeepTrend to check connection status, then check whether this Steam update is worth covering on YouTube and suggest a safe angle."

The portable OpenClaw skill prompt is in `skills/openclaw/youtube-gaming-trend-finder/SKILL.md`.

Create or revoke API keys at https://peeptrend.com/profile.

Without a key, free checks can still run with public limits. Full feeds, reports, generated ideas, saved plans, alerts, account-aware limits, and subscription features need `PEEPTREND_API_KEY`.

Full setup guide:

https://github.com/PeepTrend/PeepTrend.MCP/blob/main/SETUP.md
