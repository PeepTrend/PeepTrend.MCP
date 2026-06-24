import assert from "node:assert/strict";
import test from "node:test";
import { formatChannelNameResult, formatTitleResult } from "./format.js";

test("channel name formatter includes verdict and CTA", () => {
  const text = formatChannelNameResult({
    query: "CozyPixel",
    handleCandidate: "@CozyPixel",
    verdict: "available",
    channels: []
  });

  assert.match(text, /CozyPixel/);
  assert.match(text, /Verdict: available/);
  assert.match(text, /peeptrend\.com\/pricing/);
});

test("title formatter summarizes useful metrics", () => {
  const text = formatTitleResult({
    query: "Minecraft update explained",
    period: { id: "30d", label: "Last 30 days" },
    videos: [
      {
        title: "Minecraft update explained",
        author: "Creator",
        youtubeUrl: "https://youtube.com/watch?v=x",
        viewCount: 12000,
        viewsPerDay: 800,
        publishedText: "15 days ago",
        exactTitleMatch: true
      }
    ],
    summary: {
      videosAnalyzed: 1,
      averageViews: 12000,
      topViews: 12000,
      averageViewsPerDay: 800,
      uniqueChannels: 1,
      demandScore: 80,
      competitionScore: 45,
      opportunityScore: 72,
      recommendation: "Worth testing",
      warnings: []
    }
  });

  assert.match(text, /Opportunity: 72%/);
  assert.match(text, /Worth testing/);
  assert.match(text, /Top returned videos/);
});
