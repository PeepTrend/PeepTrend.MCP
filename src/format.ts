import type {
  GameCheckerResult,
  OpportunityDetail,
  OpportunityListResult,
  YoutubeChannelResult,
  YoutubeResearchResult,
  YoutubeTitleResult
} from "./types.js";

function number(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }

  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

function percent(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }

  return `${Math.round(value)}%`;
}

function list(values: string[], limit = 5) {
  return values.slice(0, limit).map((value) => `- ${value}`).join("\n");
}

function upgradeCopy() {
  return [
    "",
    "Next step: use PeepTrend to turn this signal into a recording plan, alerts, and full opportunity details:",
    "https://peeptrend.com/pricing"
  ].join("\n");
}

export function formatConnectionStatus(input: {
  authenticated: boolean;
  apiBaseUrl: string;
  websiteBaseUrl: string;
}) {
  return [
    `PeepTrend MCP is connected to ${input.apiBaseUrl}.`,
    input.authenticated
      ? "API key is configured. Paid dashboard actions, workflow, and higher limits can be used when the PeepTrend account allows it."
      : "No API key is configured. Free tools still work with public limits; create a key in PeepTrend Profile to unlock account-aware tools.",
    `Create or revoke keys: ${input.websiteBaseUrl}/profile`,
    `Integration docs: ${input.websiteBaseUrl}/integrations/mcp`
  ].join("\n");
}

export function formatChannelNameResult(result: YoutubeChannelResult) {
  const topMatches = result.channels
    .slice(0, 10)
    .map((channel, index) => {
      const flags = [
        channel.exactHandleMatch ? "exact handle" : null,
        channel.exactTitleMatch ? "exact title" : null,
        channel.containsMatch ? "close" : null
      ].filter(Boolean);
      return `${index + 1}. ${channel.title} (${channel.handle || "no handle"}) - ${number(channel.subscribers)} subscribers${flags.length ? `, ${flags.join(", ")}` : ""}`;
    })
    .join("\n");

  return [
    `Channel name check for "${result.query}"`,
    `Candidate handle: ${result.handleCandidate}`,
    `Verdict: ${result.verdict}`,
    "",
    topMatches || "No similar channels were returned.",
    upgradeCopy()
  ].join("\n");
}

export function formatTitleResult(result: YoutubeTitleResult) {
  return [
    `YouTube title check for "${result.query}" (${result.period.label})`,
    `Opportunity: ${percent(result.summary.opportunityScore)} | Demand: ${percent(result.summary.demandScore)} | Competition: ${percent(result.summary.competitionScore)}`,
    `Videos analyzed: ${result.summary.videosAnalyzed}; avg views: ${number(result.summary.averageViews)}; top views: ${number(result.summary.topViews)}; avg views/day: ${number(result.summary.averageViewsPerDay)}; channels: ${result.summary.uniqueChannels}`,
    `Recommendation: ${result.summary.recommendation}`,
    result.summary.warnings.length ? `Warnings:\n${list(result.summary.warnings, 4)}` : "Warnings: none",
    "",
    "Top returned videos:",
    result.videos.slice(0, 10).map((video, index) => `${index + 1}. ${video.title} - ${number(video.viewCount)} views, ${number(video.viewsPerDay)}/day (${video.author})`).join("\n") || "No videos returned.",
    upgradeCopy()
  ].join("\n");
}

export function formatYoutubeResearchResult(result: YoutubeResearchResult) {
  return [
    `${result.summary.headline}`,
    `Query: "${result.query}" (${result.period.label})`,
    `Opportunity: ${percent(result.summary.opportunityScore)} | Demand: ${percent(result.summary.demandScore)} | Competition: ${percent(result.summary.competitionScore)} | Saturation: ${percent(result.summary.saturationScore)} | Small-channel fit: ${percent(result.summary.smallCreatorFitScore)}`,
    `Verdict: ${result.summary.verdictLabel}`,
    `Recommendation: ${result.summary.recommendation}`,
    `Next step: ${result.summary.nextStep}`,
    "",
    result.summary.insights.length ? `Insights:\n${list(result.summary.insights, 5)}` : "Insights: none",
    result.summary.angles.length
      ? `Angles:\n${result.summary.angles.slice(0, 4).map((angle) => `- ${angle.title}: ${angle.text}`).join("\n")}`
      : "Angles: none",
    "",
    "Returned videos:",
    result.videos.slice(0, 10).map((video, index) => `${index + 1}. ${video.title} - ${number(video.viewCount)} views (${video.author})`).join("\n") || "No videos returned.",
    upgradeCopy()
  ].join("\n");
}

export function formatGameCheckerResult(result: GameCheckerResult) {
  return [
    `Game fit check: ${result.game.name}`,
    `Verdict: ${result.score.verdictLabel}`,
    `Opportunity: ${percent(result.score.opportunityScore)} | Channel fit: ${percent(result.score.fitScore)}`,
    result.game.tracked
      ? `Steam: ${number(result.game.currentPlayers)} current players, ${number(result.game.peakPlayers24h)} 24h peak`
      : "This game is not fully tracked yet.",
    `YouTube: ${number(result.youtube.videosCount7d)} videos in 7d, ${number(result.youtube.views7d)} views, ${number(result.youtube.uniqueChannelsCount)} channels`,
    `Why: ${result.score.explanation}`,
    `Fit: ${result.score.fitReason}`,
    result.score.riskFlags.length ? `Risk flags:\n${list(result.score.riskFlags, 5)}` : "Risk flags: none",
    "",
    "Video angles:",
    result.ideas.slice(0, 5).map((idea) => `- ${idea.title}: ${idea.angle}`).join("\n") || "No angles returned.",
    upgradeCopy()
  ].join("\n");
}

export function formatOpportunities(result: OpportunityListResult) {
  const visible = result.data
    .slice(0, 12)
    .map((item, index) => {
      const window =
        item.crowdingWindowHours === null
          ? "unknown crowding window"
          : `${Math.max(1, Math.round(item.crowdingWindowHours / 24))}d estimated crowding window`;
      return `${index + 1}. ${item.gameName} - score ${item.finalScore}, gap ${item.opportunityGapScore}, saturation ${item.saturationScore}, ${window}. Angle: ${item.suggestedVideoAngle}`;
    })
    .join("\n");

  const locked =
    result.lockedOpportunities.length > 0
      ? `\nLocked preview games: ${result.lockedOpportunities.slice(0, 8).map((item) => item.gameName).join(", ")}`
      : "";

  return [
    "PeepTrend opportunity feed",
    result.preview
      ? "Free preview is active. Open a few full reports, then start the trial to unlock all details, generated ideas, alerts, and workflow."
      : "Full feed is available for this account.",
    "",
    visible || "No opportunities returned for this market yet.",
    locked,
    upgradeCopy()
  ].join("\n");
}

export function formatOpportunityDetail(result: OpportunityDetail) {
  const crowding =
    result.score.crowdingWindowHours === null
      ? "not enough movement for a reliable crowding window yet"
      : `about ${Math.max(1, Math.round(result.score.crowdingWindowHours / 24))} days`;

  return [
    `${result.game.name} - PeepTrend opportunity detail`,
    `Score: ${result.score.finalScore}; momentum ${result.score.gameMomentumScore}; saturation ${result.score.youtubeSaturationScore}; gap ${result.score.opportunityGapScore}; query precision ${result.score.queryPrecisionScore}; crowding velocity ${result.score.crowdingVelocityScore}`,
    `Estimated time before crowded: ${crowding}`,
    `Why: ${result.score.explanation}`,
    result.score.riskFlags.length ? `Risk flags:\n${list(result.score.riskFlags, 6)}` : "Risk flags: none",
    "",
    "Creator brief:",
    `- Format: ${result.creatorBrief.recommendedFormat}`,
    `- Suggested title: ${result.creatorBrief.suggestedTitle}`,
    `- Hook: ${result.creatorBrief.hook}`,
    `- Deadline: ${result.creatorBrief.deadline}`,
    "",
    "Saved ideas:",
    result.videoIdeas.slice(0, 6).map((idea) => `- ${idea.title}: ${idea.reason}`).join("\n") || "No saved ideas returned.",
    upgradeCopy()
  ].join("\n");
}
