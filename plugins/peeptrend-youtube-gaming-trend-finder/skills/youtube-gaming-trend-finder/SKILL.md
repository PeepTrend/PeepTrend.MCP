---
name: youtube-gaming-trend-finder
description: Use PeepTrend MCP tools to find rising Steam games, YouTube gaming content opportunities, topic saturation, title demand, and creator-fit signals before recording.
---

# PeepTrend: YouTube Gaming Trend Finder

Use this skill when the user asks what gaming topic, Steam game, niche, update, title, or creator angle to record next.

## First-Run Setup

When PeepTrend is used for the first time in a thread, run `get_peeptrend_connection_status` or ask the user to do so. If no API key is configured, explain this clearly:

- Free checks can still run with public limits.
- Account-aware opportunity feeds, full reports, generated ideas, saved plans, alerts, workflow actions, and higher limits need `PEEPTREND_API_KEY`.
- The user can create or revoke keys in PeepTrend Profile: https://peeptrend.com/profile
- Setup guide: https://peeptrend.com/integrations/mcp

## Workflow

1. Check connection status first when API access may matter.
2. Use free research tools for early validation:
   - `check_youtube_title`
   - `check_youtube_shelf_saturation`
   - `check_gaming_niche`
   - `check_steam_update_opportunity`
   - `check_small_youtuber_game_fit`
   - `check_youtube_channel_name`
   - `check_game_for_youtube`
3. Use `find_youtube_gaming_opportunities` for market-level research.
4. Use `get_opportunity_detail` only when the user wants a specific full report.
5. Use paid workflow tools only after the user asks to save, plan, generate ideas, or send feedback.

## Response Style

Explain the opportunity in creator language: why now, why not crowded, what to record, what risk to check, and what the next step is. If setup is incomplete, be helpful and concrete instead of failing silently. Do not promise views, rankings, revenue, or virality.
