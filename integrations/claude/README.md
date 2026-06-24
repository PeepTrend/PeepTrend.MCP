# PeepTrend for Claude

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

"Use PeepTrend to find a gaming topic I can record this week. Prefer lower saturation and explain the evidence."

The portable Claude skill prompt is in `skills/claude/peeptrend-youtube-gaming-trend-finder/SKILL.md`.
