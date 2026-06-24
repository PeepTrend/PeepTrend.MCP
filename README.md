# PeepTrend: YouTube Gaming Trend Finder

Find rising Steam games and YouTube content opportunities before the niche gets crowded.

This repository contains the PeepTrend MCP server plus setup files for Codex, Claude, OpenClaw, and generic MCP clients.

## What It Does

PeepTrend gives AI agents focused tools for gaming creator research:

- Check YouTube channel name and handle conflicts.
- Check YouTube video titles against recent videos, demand, competition, and velocity.
- Check YouTube shelf saturation for gaming topics.
- Check gaming niches and small-channel fit.
- Check Steam update opportunities before the shelf fills.
- Check whether a Steam game fits a YouTube channel.
- Pull PeepTrend opportunity feeds and full reports when connected to a PeepTrend account.
- Generate creator ideas, save workflow status, and send feedback when the account has subscription access.

PeepTrend accounts can create API keys for MCP clients. Some tools are available to try with a free account; full reports, generated ideas, workflow actions, alerts, and higher usage are available from PeepTrend plans.

## Install

Codex:

```bash
codex plugin marketplace add PeepTrend/PeepTrend.MCP
codex plugin add peeptrend-youtube-gaming-trend-finder@peeptrend
```

Claude Code:

```bash
claude plugin marketplace add PeepTrend/PeepTrend.MCP
claude plugin install peeptrend-youtube-gaming-trend-finder@peeptrend
```

Generic MCP clients:

```bash
npm install -g peeptrend-mcp
```

Or run it directly:

```bash
npx -y peeptrend-mcp
```

Running the command manually prints setup instructions. In normal use, your AI client starts this package as an MCP server and communicates with it over stdio.

## Configure

Create an API key in PeepTrend:

1. Create or log in to your PeepTrend account.
2. Open Profile.
3. Create an API key under AI integrations.
4. Add it to your MCP client as `PEEPTREND_API_KEY`.

Example MCP config:

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

An API key is recommended. It connects MCP requests to your PeepTrend account and enables account features when available.

## Check Status

```bash
npx -y peeptrend-mcp --doctor
```

Use `--stdio` only when a tool or MCP client explicitly asks for the raw MCP server process.

## Available Tools

- `get_peeptrend_connection_status`
- `check_youtube_channel_name`
- `check_youtube_title`
- `check_youtube_shelf_saturation`
- `check_gaming_niche`
- `check_steam_update_opportunity`
- `check_small_youtuber_game_fit`
- `check_game_for_youtube`
- `find_youtube_gaming_opportunities`
- `get_opportunity_detail`
- `generate_creator_ideas`
- `save_opportunity_workflow`
- `send_opportunity_feedback`

## Client Guides

- [Generic MCP](./integrations/mcp/README.md)
- [Codex](./integrations/codex/README.md)
- [Claude](./integrations/claude/README.md)
- [OpenClaw](./integrations/openclaw/README.md)

## Safety And Limits

PeepTrend API keys are account scoped and can be revoked from Profile. Store keys only in your MCP client's environment configuration and do not commit API keys to source control.

## License

MIT
