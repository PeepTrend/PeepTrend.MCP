import assert from "node:assert/strict";
import test from "node:test";
import { renderDoctor, renderHelp, resolveCliAction } from "./cli.js";
import type { PeepTrendMcpConfig } from "./config.js";

const config: PeepTrendMcpConfig = {
  apiBaseUrl: "https://api.example.com",
  websiteBaseUrl: "https://example.com",
  userAgent: "test-agent"
};

test("manual npx run shows human help only for TTY stdin", () => {
  assert.equal(resolveCliAction([], true), "manual");
  assert.equal(resolveCliAction([], false), "stdio");
});

test("cli supports help, doctor, version, and stdio flags", () => {
  assert.equal(resolveCliAction(["--help"], false), "help");
  assert.equal(resolveCliAction(["doctor"], false), "doctor");
  assert.equal(resolveCliAction(["--version"], false), "version");
  assert.equal(resolveCliAction(["--stdio"], true), "stdio");
  assert.equal(resolveCliAction(["--wat"], true), "unknown");
});

test("help explains client setup without starting an interactive shell", () => {
  const text = renderHelp(config);

  assert.match(text, /PeepTrend MCP is installed and ready/);
  assert.match(text, /peeptrend-mcp/);
  assert.match(text, /PEEPTREND_API_KEY/);
  assert.match(text, /https:\/\/example\.com\/integrations\/mcp/);
});

test("doctor reports whether an API key is configured", () => {
  const anonymousText = renderDoctor(config, "v22.0.0");
  const connectedText = renderDoctor({ ...config, apiKey: "pt_key_test" }, "v22.0.0");

  assert.match(anonymousText, /API key: not configured/);
  assert.match(connectedText, /API key: found/);
});
