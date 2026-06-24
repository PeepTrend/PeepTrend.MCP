# Marketplace Submissions

This file contains public submission copy for PeepTrend marketplace review flows.

## Product

Name:

PeepTrend: YouTube Gaming Trend Finder

Subtitle:

Find rising Steam games and YouTube content opportunities before the niche gets crowded.

Repository:

https://github.com/PeepTrend/PeepTrend.MCP

Website:

https://peeptrend.com/integrations/mcp

Privacy:

https://peeptrend.com/privacy

Terms:

https://peeptrend.com/terms

Support:

support@peeptrend.com

Install:

```bash
npx -y peeptrend-mcp --doctor
```

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

OpenClaw:

```bash
openclaw plugins install peeptrend-youtube-gaming-trend-finder --marketplace github:PeepTrend/PeepTrend.MCP
```

Generic MCP:

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

## Review Summary

PeepTrend helps gaming creators and AI agents research Steam-to-YouTube opportunities. It exposes account-aware MCP tools for checking YouTube title competition, channel name conflicts, shelf saturation, gaming niche fit, Steam update opportunities, small-channel fit, ranked opportunity feeds, full reports, creator ideas, workflow saving, and feedback.

The plugin is useful when a creator asks what game, update, title, or niche to record next. It does not promise views, rankings, revenue, or virality. It explains evidence, risk, saturation, and next steps in creator-friendly language.

## Safety

- API keys are scoped to PeepTrend accounts and can be revoked from Profile.
- The MCP server is launched by the user's AI client with explicit local configuration.
- Free and paid limits are enforced by PeepTrend account/rate-limit policy.
- The plugin uses official PeepTrend API routes and does not ask users to share third-party credentials.
- The plugin should not be used to make guaranteed performance claims.

## Claude Submission

Submit at:

https://claude.ai/settings/plugins/submit

Repository URL:

https://github.com/PeepTrend/PeepTrend.MCP

Plugin name:

peeptrend-youtube-gaming-trend-finder

Marketplace name:

peeptrend

Description:

Find rising Steam games and YouTube content opportunities before the niche gets crowded.

Suggested category:

Productivity / Developer tools / Research

Reviewer notes:

The repository includes a Claude Code marketplace at `.claude-plugin/marketplace.json` and a plugin manifest at `plugins/peeptrend-youtube-gaming-trend-finder/.claude-plugin/plugin.json`. Local validation passes with `claude plugin validate .` and `claude plugin validate plugins/peeptrend-youtube-gaming-trend-finder`. The plugin bundles one skill and one MCP server.

## OpenClaw ClawHub

Current safe path:

Publish the OpenClaw skill:

```bash
clawhub login
clawhub skill publish ./skills/openclaw/youtube-gaming-trend-finder \
  --slug peeptrend-youtube-gaming-trend-finder \
  --name "PeepTrend: YouTube Gaming Trend Finder" \
  --version 0.1.2 \
  --changelog "Initial PeepTrend OpenClaw skill for YouTube gaming trend research." \
  --tags latest,youtube,gaming,steam,mcp
```

Dry-run result:

```text
status: would-publish
slug: peeptrend-youtube-gaming-trend-finder
version: 0.1.2
fileCount: 1
```

Plugin package note:

`clawhub package publish --family bundle-plugin` currently requires `openclaw.plugin.json` in CLI preflight. The PeepTrend package is intentionally a Codex/Claude-compatible bundle with `.codex-plugin/plugin.json`, `.claude-plugin/plugin.json`, `.mcp.json`, and skill content. Do not add a native `openclaw.plugin.json` to the shared plugin folder unless we also implement and test native OpenClaw behavior, because OpenClaw detection gives native manifests precedence over bundle markers.

## Codex Curated Listing

Current public path:

Users install from the GitHub marketplace:

```bash
codex plugin marketplace add PeepTrend/PeepTrend.MCP
codex plugin add peeptrend-youtube-gaming-trend-finder@peeptrend
```

The OpenAI `openai/plugins` repository is a curated collection, not a self-serve public registry. If submitting there, use the same product summary above and point reviewers to:

- `.agents/plugins/marketplace.json`
- `plugins/peeptrend-youtube-gaming-trend-finder/.codex-plugin/plugin.json`
- `plugins/peeptrend-youtube-gaming-trend-finder/.mcp.json`
- `plugins/peeptrend-youtube-gaming-trend-finder/skills/youtube-gaming-trend-finder/SKILL.md`
