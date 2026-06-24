export type PeriodId = "7d" | "30d" | "90d" | "180d" | "365d";
export type ChannelSize = "under_1k" | "one_to_10k" | "ten_to_50k" | "over_50k";
export type OpportunityMode = "qualified" | "steam-only" | "watchlist";

export type ApiEnvelope<T> = {
  data: T;
};

export type ApiErrorPayload = {
  error?: string;
  message?: string;
};

export type ToolLimit = {
  limit: number | null;
  used: number | null;
  remaining: number | null;
  resetAt: string | null;
  scope: string;
  unlimited?: boolean;
};

export type YoutubeChannelResult = {
  query: string;
  handleCandidate: string;
  verdict: "taken" | "close" | "available";
  channels: Array<{
    title: string;
    handle: string;
    youtubeUrl: string;
    subscribers: number | null;
    exactHandleMatch: boolean;
    exactTitleMatch: boolean;
    containsMatch: boolean;
  }>;
};

export type YoutubeTitleResult = {
  query: string;
  period: { id: PeriodId; label: string };
  videos: Array<{
    title: string;
    author: string;
    youtubeUrl: string;
    viewCount: number;
    viewsPerDay: number;
    publishedText: string;
    exactTitleMatch: boolean;
  }>;
  summary: {
    videosAnalyzed: number;
    averageViews: number;
    topViews: number;
    averageViewsPerDay: number;
    uniqueChannels: number;
    demandScore: number;
    competitionScore: number;
    opportunityScore: number;
    recommendation: string;
    warnings: string[];
  };
};

export type YoutubeResearchResult = {
  tool: string;
  query: string;
  searchQuery: string;
  period: { id: PeriodId; label: string };
  videos: YoutubeTitleResult["videos"];
  summary: {
    verdictLabel: string;
    headline: string;
    recommendation: string;
    nextStep: string;
    scoreCards: Array<{ label: string; score: number | null; tone: string }>;
    metrics: Array<{ label: string; value: string; detail: string }>;
    insights: string[];
    angles: Array<{ title: string; text: string }>;
    warnings: string[];
    videosAnalyzed: number;
    demandScore: number;
    competitionScore: number;
    opportunityScore: number;
    saturationScore: number;
    smallCreatorFitScore: number;
  };
};

export type GameCheckerResult = {
  checkId: string;
  limit: ToolLimit;
  game: {
    tracked: boolean;
    name: string;
    steamUrl: string | null;
    imageUrl: string | null;
    currentPlayers: number | null;
    peakPlayers24h: number | null;
    genres: string[];
    tags: string[];
  };
  channel: {
    channelTitle: string;
    youtubeUrl: string;
    subscriberCount: number;
    averageViews: number;
    sizeSegment: string;
  };
  score: {
    opportunityScore: number | null;
    fitScore: number | null;
    verdict: string;
    verdictLabel: string;
    explanation: string;
    fitReason: string;
    riskFlags: string[];
  };
  youtube: {
    videosCount7d: number | null;
    views7d: number | null;
    uniqueChannelsCount: number | null;
    evidenceVideos: Array<{
      title: string;
      url: string;
      channelTitle: string | null;
      viewCount: number;
    }>;
  };
  ideas: Array<{
    title: string;
    angle: string;
    reason: string;
    difficulty: string;
    urgency: string;
  }>;
};

export type OpportunityListResult = {
  data: OpportunityPreview[];
  lockedOpportunities: Array<{ id: string; gameName: string; gameImageUrl: string | null }>;
  locked: boolean;
  preview: boolean;
  lockedCount?: number;
  subscription?: SubscriptionStatus;
};

export type SubscriptionStatus = {
  status: string;
  canAccess: boolean;
  requiresSubscription: boolean;
  previewAccess: boolean;
  previewAccessExpired: boolean;
  freeOpportunityUnlockLimit: number;
  freeOpportunityUnlocksUsed: number;
  freeOpportunityUnlocksRemaining: number;
};

export type OpportunityPreview = {
  gameId: string;
  slug: string;
  gameName: string;
  gameImageUrl: string | null;
  region: string;
  language: string;
  finalScore: number;
  momentumScore: number;
  saturationScore: number;
  opportunityGapScore: number;
  queryPrecisionScore: number;
  crowdingVelocityScore: number;
  crowdingWindowHours: number | null;
  confidenceScore: number;
  riskFlags: string[];
  explanation: string;
  suggestedVideoAngle: string;
  suggestedVideoReason: string;
  suggestedVideoUrgency: string;
  currentPlayers: number | null;
  videosCount7d: number | null;
  evidenceVideos: Array<{
    title: string;
    url: string;
    channelTitle: string | null;
    viewCount: number;
  }>;
};

export type OpportunityDetail = {
  game: {
    id: string;
    name: string;
    slug: string;
    steamUrl: string | null;
    imageUrl: string | null;
    genres: string[];
    tags: string[];
  };
  score: {
    finalScore: number;
    gameMomentumScore: number;
    youtubeSaturationScore: number;
    opportunityGapScore: number;
    timingScore: number;
    confidenceScore: number;
    queryPrecisionScore: number;
    crowdingVelocityScore: number;
    crowdingWindowHours: number | null;
    riskFlags: string[];
    explanation: string;
  };
  videoIdeas: Array<{
    title: string;
    angle: string;
    reason: string;
    difficulty: string;
    urgency: string;
  }>;
  evidenceVideos: Array<{
    title: string;
    url: string;
    channelTitle: string | null;
    viewCount: number;
  }>;
  creatorBrief: {
    action: string;
    recommendedFormat: string;
    suggestedTitle: string;
    hook: string;
    whatToCheck: string;
    deadline: string;
  };
};

export class PeepTrendApiError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly upgradeUrl?: string;

  constructor(message: string, options: { status: number; code?: string; upgradeUrl?: string }) {
    super(message);
    this.name = "PeepTrendApiError";
    this.status = options.status;
    this.code = options.code;
    this.upgradeUrl = options.upgradeUrl;
  }
}
