# PeepTrend MCP Setup

PeepTrend can be installed as a Codex plugin, Claude Code plugin, OpenClaw skill, npm package, or generic MCP server.

## What Works First

Free research checks can run with public limits:

- YouTube channel name checks
- YouTube title checks
- Shelf saturation checks
- Gaming niche checks
- Steam update opportunity checks
- Small YouTuber game-fit checks
- Steam game to YouTube channel fit checks

## What Needs An API Key

Create a PeepTrend API key when you want:

- Account-aware limits
- Ranked opportunity feeds
- Full opportunity reports
- Generated creator ideas
- Saved plans and workflow status
- Feedback and alerts
- Subscription features

Create, rotate, or revoke keys in PeepTrend Profile:

https://peeptrend.com/profile

Store the key as:

```text
PEEPTREND_API_KEY=pt_key_from_profile
```

Do not commit API keys to source control.

## Codex

Install the plugin:

```bash
codex plugin marketplace add PeepTrend/PeepTrend.MCP
codex plugin add peeptrend-youtube-gaming-trend-finder@peeptrend
```

Connect your PeepTrend account:

```bash
codex mcp add peeptrend --env PEEPTREND_API_KEY=pt_key_from_profile -- npx -y peeptrend-mcp
```

Restart Codex or start a new thread, then ask:

```text
Use PeepTrend to check my connection status, then find YouTube gaming opportunities for my channel.
```

## Claude Code

Install the plugin:

```bash
claude plugin marketplace add PeepTrend/PeepTrend.MCP
claude plugin install peeptrend-youtube-gaming-trend-finder@peeptrend
```

Connect your PeepTrend account:

```bash
claude mcp add peeptrend -e PEEPTREND_API_KEY=pt_key_from_profile -- npx -y peeptrend-mcp
```

Run `/reload-plugins` in an open Claude Code session, then ask:

```text
Use PeepTrend to check my connection status, then validate this gaming video title.
```

## Claude Desktop

Add this to `claude_desktop_config.json`:

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

Restart Claude Desktop.

## OpenClaw

Install the OpenClaw skill from ClawHub:

```bash
clawhub install peeptrend-youtube-gaming-trend-finder
```

Add the MCP server to your OpenClaw MCP configuration:

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

If OpenClaw offers a secrets UI, store `PEEPTREND_API_KEY` there and reference it from your MCP config.

## Generic MCP Clients

Use this config:

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

## Check Status

Run:

```bash
npx -y peeptrend-mcp --doctor
```

Inside an AI client, ask:

```text
Use PeepTrend to check connection status.
```

If the key is missing, PeepTrend will still allow public free checks where available and will explain how to connect your account before using full reports or subscription tools.

