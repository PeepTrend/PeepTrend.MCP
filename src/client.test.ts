import assert from "node:assert/strict";
import test from "node:test";
import { PeepTrendClient } from "./client.js";

test("client uses public free-tool route without API key", async () => {
  const originalFetch = globalThis.fetch;
  const calls: string[] = [];
  globalThis.fetch = (async (url: string | URL | Request) => {
    calls.push(String(url));
    return new Response(JSON.stringify({ data: { query: "test", handleCandidate: "@test", verdict: "available", channels: [] } }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  }) as typeof fetch;

  try {
    const client = new PeepTrendClient({ apiBaseUrl: "https://api.example.com", websiteBaseUrl: "https://example.com", userAgent: "test" });
    await client.checkYoutubeChannelName("test");
    assert.equal(calls[0], "https://api.example.com/api/free-tools/youtube-channel-name-checker");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("client uses MCP route when API key is configured", async () => {
  const originalFetch = globalThis.fetch;
  const calls: string[] = [];
  globalThis.fetch = (async (url: string | URL | Request) => {
    calls.push(String(url));
    return new Response(JSON.stringify({ data: { query: "test", handleCandidate: "@test", verdict: "available", channels: [] } }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  }) as typeof fetch;

  try {
    const client = new PeepTrendClient({
      apiBaseUrl: "https://api.example.com",
      websiteBaseUrl: "https://example.com",
      userAgent: "test",
      apiKey: "pt_key_secret"
    });
    await client.checkYoutubeChannelName("test");
    assert.equal(calls[0], "https://api.example.com/api/mcp/free-tools/youtube-channel-name-checker");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
