import { PeepTrendApiError, type ApiEnvelope, type ApiErrorPayload, type ChannelSize, type GameCheckerResult, type OpportunityDetail, type OpportunityListResult, type OpportunityMode, type PeriodId, type YoutubeChannelResult, type YoutubeResearchResult, type YoutubeTitleResult } from "./types.js";
import type { PeepTrendMcpConfig } from "./config.js";

type RequestOptions = {
  path: string;
  method?: "GET" | "POST";
  body?: unknown;
  authRequired?: boolean;
};

function upgradeUrl(path = "/pricing") {
  return `https://peeptrend.com${path}`;
}

export class PeepTrendClient {
  constructor(private readonly config: PeepTrendMcpConfig) {}

  private resolvePath(path: string, authRequired: boolean) {
    if (!this.config.apiKey) {
      return path;
    }

    if (authRequired || path.startsWith("/api/free-tools/")) {
      return path.replace(/^\/api\//, "/api/mcp/");
    }

    return path;
  }

  private async request<T>(options: RequestOptions): Promise<T> {
    if (options.authRequired && !this.config.apiKey) {
      throw new PeepTrendApiError("PeepTrend is installed, but this account-aware tool needs PEEPTREND_API_KEY. Create a key in PeepTrend Profile > AI integrations, add it to your AI client config, then run get_peeptrend_connection_status. Free research checks still work with public limits.", {
        status: 401,
        code: "ApiKeyRequired",
        upgradeUrl: upgradeUrl("/profile")
      });
    }

    const headers = new Headers({
      "Content-Type": "application/json",
      "User-Agent": this.config.userAgent,
      "X-PeepTrend-MCP": "true"
    });

    if (this.config.apiKey) {
      headers.set("Authorization", `Bearer ${this.config.apiKey}`);
    }

    const response = await fetch(`${this.config.apiBaseUrl}${this.resolvePath(options.path, Boolean(options.authRequired))}`, {
      method: options.method ?? (options.body === undefined ? "GET" : "POST"),
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body)
    });

    const payload = (await response.json().catch(() => null)) as ApiEnvelope<T> | ApiErrorPayload | null;

    if (!response.ok) {
      const errorPayload = payload as ApiErrorPayload | null;
      const code = errorPayload?.error;
      const rawMessage = errorPayload?.message ?? `PeepTrend API request failed with ${response.status}`;
      const message =
        response.status === 402
          ? "This PeepTrend action is locked after the free preview. Start the trial to unlock full opportunities, idea generation, workflow actions, and higher MCP limits."
          : response.status === 429
            ? "This PeepTrend tool is temporarily rate limited. Try a smaller check, wait for the reset, or upgrade for more room."
            : rawMessage;

      throw new PeepTrendApiError(message, {
        status: response.status,
        code,
        upgradeUrl: response.status === 402 || response.status === 429 ? upgradeUrl("/pricing") : undefined
      });
    }

    return (payload as ApiEnvelope<T>).data;
  }

  checkYoutubeChannelName(query: string) {
    return this.request<YoutubeChannelResult>({
      path: "/api/free-tools/youtube-channel-name-checker",
      body: { query }
    });
  }

  checkYoutubeTitle(query: string, period: PeriodId) {
    return this.request<YoutubeTitleResult>({
      path: "/api/free-tools/youtube-title-checker",
      body: { query, period }
    });
  }

  checkYoutubeResearchTool(path: string, query: string, period: PeriodId, extra?: Record<string, unknown>) {
    return this.request<YoutubeResearchResult>({
      path,
      body: { query, period, ...extra }
    });
  }

  checkGameForYoutube(input: { steamUrl: string; youtubeChannelUrl: string; region: string; language: string }) {
    return this.request<GameCheckerResult>({
      path: "/api/free-tools/game-checker",
      body: input
    });
  }

  findOpportunities(input: { region: string; language: string; mode: OpportunityMode }) {
    const params = new URLSearchParams({ region: input.region, language: input.language, mode: input.mode });
    return this.request<OpportunityListResult>({
      path: `/api/opportunities?${params.toString()}`,
      authRequired: true
    });
  }

  getOpportunityDetail(input: { slug: string; region: string; language: string }) {
    const params = new URLSearchParams({ region: input.region, language: input.language });
    return this.request<OpportunityDetail>({
      path: `/api/opportunities/${encodeURIComponent(input.slug)}?${params.toString()}`,
      authRequired: true
    });
  }

  generateCreatorIdeas(input: { slug: string; region: string; language: string; regenerate?: boolean }) {
    const params = new URLSearchParams({ region: input.region, language: input.language });
    return this.request<unknown>({
      path: `/api/creator-ideas/${encodeURIComponent(input.slug)}/generate?${params.toString()}`,
      body: { regenerate: Boolean(input.regenerate), region: input.region, language: input.language },
      authRequired: true
    });
  }

  setWorkflow(input: { gameId: string; status: "none" | "saved" | "dismissed" | "planned" | "published"; note?: string }) {
    return this.request<unknown>({
      path: "/api/opportunities/workflow",
      body: input,
      authRequired: true
    });
  }

  sendFeedback(input: { gameId: string; type: "useful" | "not_useful" | "wrong_match" | "too_saturated" | "not_my_niche" | "made_video"; message?: string }) {
    return this.request<unknown>({
      path: "/api/opportunities/feedback",
      body: input,
      authRequired: true
    });
  }
}

export const youtubeResearchPaths = {
  shelf: "/api/free-tools/youtube-shelf-saturation-checker",
  niche: "/api/free-tools/gaming-niche-checker",
  steamUpdate: "/api/free-tools/steam-update-opportunity-checker",
  smallYoutuberFit: "/api/free-tools/small-youtuber-game-fit-checker"
} as const;

export type { ChannelSize, PeriodId };
