import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { type PeepTrendMcpConfig, authStatus } from "./config.js";
import { PeepTrendClient, youtubeResearchPaths } from "./client.js";
import { PeepTrendApiError } from "./types.js";
import {
  formatChannelNameResult,
  formatConnectionStatus,
  formatGameCheckerResult,
  formatOpportunities,
  formatOpportunityDetail,
  formatTitleResult,
  formatYoutubeResearchResult
} from "./format.js";

const periodSchema = z.enum(["7d", "30d", "90d", "180d", "365d"]).default("30d");
const marketRegionSchema = z.string().min(2).max(12).default("US");
const marketLanguageSchema = z.string().min(2).max(12).default("en");

function ok(text: string, data?: unknown): CallToolResult {
  return {
    content: [{ type: "text", text }],
    structuredContent: data === undefined ? undefined : { data }
  };
}

function fail(error: unknown): CallToolResult {
  if (error instanceof PeepTrendApiError) {
    const hint = error.upgradeUrl ? `\n\nContinue in PeepTrend: ${error.upgradeUrl}` : "";
    return {
      isError: true,
      content: [{ type: "text", text: `${error.message}${hint}` }],
      structuredContent: {
        error: {
          status: error.status,
          code: error.code ?? error.name,
          upgradeUrl: error.upgradeUrl ?? null
        }
      }
    };
  }

  return {
    isError: true,
    content: [{ type: "text", text: error instanceof Error ? error.message : "PeepTrend MCP tool failed." }]
  };
}

async function safeRun(fn: () => Promise<CallToolResult>) {
  try {
    return await fn();
  } catch (error) {
    return fail(error);
  }
}

export function registerPeepTrendTools(server: McpServer, config: PeepTrendMcpConfig) {
  const client = new PeepTrendClient(config);

  server.registerTool(
    "get_peeptrend_connection_status",
    {
      title: "PeepTrend connection status",
      description: "Show whether this MCP server is connected anonymously or with a PeepTrend API key."
    },
    async () =>
      ok(
        formatConnectionStatus({
          authenticated: authStatus(config) === "authenticated",
          apiBaseUrl: config.apiBaseUrl,
          websiteBaseUrl: config.websiteBaseUrl
        }),
        {
          authenticated: authStatus(config) === "authenticated",
          apiBaseUrl: config.apiBaseUrl,
          websiteBaseUrl: config.websiteBaseUrl
        }
      )
  );

  server.registerTool(
    "check_youtube_channel_name",
    {
      title: "Check YouTube channel name",
      description: "Check whether a channel name or handle collides with returned YouTube channel results.",
      inputSchema: {
        query: z.string().trim().min(1).max(60).describe("Channel name or handle idea, for example 'CozyPixel'.")
      }
    },
    async ({ query }) =>
      safeRun(async () => {
        const result = await client.checkYoutubeChannelName(query);
        return ok(formatChannelNameResult(result), result);
      })
  );

  server.registerTool(
    "check_youtube_title",
    {
      title: "Check YouTube video title",
      description: "Compare a gaming video title or keyword against recent YouTube videos, demand, competition, and title overlap.",
      inputSchema: {
        query: z.string().trim().min(1).max(100).describe("Video title or keyword idea."),
        period: periodSchema.describe("Recent search window.")
      }
    },
    async ({ query, period }) =>
      safeRun(async () => {
        const result = await client.checkYoutubeTitle(query, period);
        return ok(formatTitleResult(result), result);
      })
  );

  server.registerTool(
    "check_youtube_shelf_saturation",
    {
      title: "Check YouTube shelf saturation",
      description: "Check whether a gaming topic shelf is already crowded or still has room for a sharper angle.",
      inputSchema: {
        query: z.string().trim().min(1).max(180),
        period: periodSchema
      }
    },
    async ({ query, period }) =>
      safeRun(async () => {
        const result = await client.checkYoutubeResearchTool(youtubeResearchPaths.shelf, query, period);
        return ok(formatYoutubeResearchResult(result), result);
      })
  );

  server.registerTool(
    "check_gaming_niche",
    {
      title: "Check gaming niche",
      description: "Evaluate a gaming niche for demand, creator pressure, opportunity, and small-channel fit.",
      inputSchema: {
        query: z.string().trim().min(1).max(180),
        period: periodSchema
      }
    },
    async ({ query, period }) =>
      safeRun(async () => {
        const result = await client.checkYoutubeResearchTool(youtubeResearchPaths.niche, query, period);
        return ok(formatYoutubeResearchResult(result), result);
      })
  );

  server.registerTool(
    "check_steam_update_opportunity",
    {
      title: "Check Steam update opportunity",
      description: "Check whether a Steam update, patch, DLC, comeback, or event may be worth covering on YouTube.",
      inputSchema: {
        query: z.string().trim().min(1).max(180),
        period: periodSchema
      }
    },
    async ({ query, period }) =>
      safeRun(async () => {
        const result = await client.checkYoutubeResearchTool(youtubeResearchPaths.steamUpdate, query, period);
        return ok(formatYoutubeResearchResult(result), result);
      })
  );

  server.registerTool(
    "check_small_youtuber_game_fit",
    {
      title: "Check small YouTuber game fit",
      description: "Check whether a game or gaming topic looks realistic for a smaller YouTube channel.",
      inputSchema: {
        query: z.string().trim().min(1).max(180),
        period: periodSchema,
        channelSize: z.enum(["under_1k", "one_to_10k", "ten_to_50k", "over_50k"]).default("one_to_10k")
      }
    },
    async ({ query, period, channelSize }) =>
      safeRun(async () => {
        const result = await client.checkYoutubeResearchTool(youtubeResearchPaths.smallYoutuberFit, query, period, { channelSize });
        return ok(formatYoutubeResearchResult(result), result);
      })
  );

  server.registerTool(
    "check_game_for_youtube",
    {
      title: "Check Steam game for YouTube channel",
      description: "Check whether one Steam game is a good YouTube opportunity for one creator channel.",
      inputSchema: {
        steamUrl: z.string().trim().min(10).max(500).describe("Steam store app URL."),
        youtubeChannelUrl: z.string().trim().min(8).max(500).describe("YouTube channel URL."),
        region: marketRegionSchema,
        language: marketLanguageSchema
      }
    },
    async (input) =>
      safeRun(async () => {
        const result = await client.checkGameForYoutube(input);
        return ok(formatGameCheckerResult(result), result);
      })
  );

  server.registerTool(
    "find_youtube_gaming_opportunities",
    {
      title: "Find YouTube gaming opportunities",
      description: "Return PeepTrend's ranked Steam and YouTube opportunity feed for a market. Requires a PeepTrend API key.",
      inputSchema: {
        region: marketRegionSchema,
        language: marketLanguageSchema,
        mode: z.enum(["qualified", "steam-only", "watchlist"]).default("qualified")
      }
    },
    async (input) =>
      safeRun(async () => {
        const result = await client.findOpportunities(input);
        return ok(formatOpportunities(result), result);
      })
  );

  server.registerTool(
    "get_opportunity_detail",
    {
      title: "Get opportunity detail",
      description: "Open a full opportunity report with score breakdown, Steam/YouTube evidence, crowding estimate, and creator brief. Requires a PeepTrend API key.",
      inputSchema: {
        slug: z.string().trim().min(1).max(120),
        region: marketRegionSchema,
        language: marketLanguageSchema
      }
    },
    async (input) =>
      safeRun(async () => {
        const result = await client.getOpportunityDetail(input);
        return ok(formatOpportunityDetail(result), result);
      })
  );

  server.registerTool(
    "generate_creator_ideas",
    {
      title: "Generate creator ideas",
      description: "Generate PeepTrend content ideas for an opportunity. Requires an active PeepTrend subscription.",
      inputSchema: {
        slug: z.string().trim().min(1).max(120),
        region: marketRegionSchema,
        language: marketLanguageSchema,
        regenerate: z.boolean().default(false)
      }
    },
    async (input) =>
      safeRun(async () => {
        const result = await client.generateCreatorIdeas(input);
        return ok("Generated PeepTrend creator ideas. Use the structured data for titles, hooks, risks, and descriptions.", result);
      })
  );

  server.registerTool(
    "save_opportunity_workflow",
    {
      title: "Save opportunity workflow",
      description: "Save, plan, dismiss, publish, or clear a PeepTrend opportunity workflow status. Requires an active PeepTrend subscription.",
      inputSchema: {
        gameId: z.string().trim().min(1).max(80),
        status: z.enum(["none", "saved", "dismissed", "planned", "published"]),
        note: z.string().trim().max(1000).optional()
      }
    },
    async (input) =>
      safeRun(async () => {
        const result = await client.setWorkflow(input);
        return ok(`Workflow updated to "${input.status}".`, result);
      })
  );

  server.registerTool(
    "send_opportunity_feedback",
    {
      title: "Send opportunity feedback",
      description: "Tell PeepTrend whether an opportunity was useful, wrong, saturated, off-niche, or used for a video. Requires an active PeepTrend subscription.",
      inputSchema: {
        gameId: z.string().trim().min(1).max(80),
        type: z.enum(["useful", "not_useful", "wrong_match", "too_saturated", "not_my_niche", "made_video"]),
        message: z.string().trim().max(1000).optional()
      }
    },
    async (input) =>
      safeRun(async () => {
        const result = await client.sendFeedback(input);
        return ok(`Feedback recorded as "${input.type}".`, result);
      })
  );
}
