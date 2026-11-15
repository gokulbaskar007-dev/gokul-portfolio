import { siteUrl } from "@/data/profile";

// Allow Google + AI crawlers (GPTBot, ClaudeBot, PerplexityBot etc.) — good for GEO
export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
