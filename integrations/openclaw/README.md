# PeepTrend for OpenClaw

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

"Use PeepTrend to check whether this Steam update is worth covering on YouTube and suggest a safe angle."

The portable OpenClaw skill prompt is in `skills/openclaw/youtube-gaming-trend-finder/SKILL.md`.
