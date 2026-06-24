# PeepTrend MCP

Use this for any MCP-compatible client.

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

Good starter prompts:

- "Find gaming opportunities for US English creators and explain the top 3."
- "Check whether this YouTube title is crowded: Minecraft update explained."
- "Check if this Steam game is worth covering for my channel."

Create and revoke API keys at https://peeptrend.com/profile.
