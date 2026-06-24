import assert from "node:assert/strict";
import test from "node:test";
import { authStatus, loadConfig } from "./config.js";

test("loadConfig uses public defaults without secrets", () => {
  const config = loadConfig({});
  assert.equal(config.apiBaseUrl, "https://api.peeptrend.com");
  assert.equal(config.websiteBaseUrl, "https://peeptrend.com");
  assert.equal(config.apiKey, undefined);
  assert.equal(authStatus(config), "anonymous");
});

test("loadConfig normalizes URLs and detects API key", () => {
  const config = loadConfig({
    PEEPTREND_API_BASE_URL: "https://api.example.com/",
    PEEPTREND_WEBSITE_BASE_URL: "https://example.com/",
    PEEPTREND_API_KEY: "pt_key_test"
  });

  assert.equal(config.apiBaseUrl, "https://api.example.com");
  assert.equal(config.websiteBaseUrl, "https://example.com");
  assert.equal(authStatus(config), "authenticated");
});
