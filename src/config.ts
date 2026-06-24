export type PeepTrendMcpConfig = {
  apiBaseUrl: string;
  apiKey?: string;
  userAgent: string;
  websiteBaseUrl: string;
};

function normalizeBaseUrl(value: string) {
  return value.replace(/\/+$/, "");
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): PeepTrendMcpConfig {
  const apiBaseUrl = normalizeBaseUrl(env.PEEPTREND_API_BASE_URL ?? "https://api.peeptrend.com");
  const websiteBaseUrl = normalizeBaseUrl(env.PEEPTREND_WEBSITE_BASE_URL ?? "https://peeptrend.com");

  return {
    apiBaseUrl,
    apiKey: env.PEEPTREND_API_KEY,
    userAgent: env.PEEPTREND_USER_AGENT ?? "peeptrend-mcp",
    websiteBaseUrl
  };
}

export function authStatus(config: PeepTrendMcpConfig) {
  return config.apiKey ? "authenticated" : "anonymous";
}
