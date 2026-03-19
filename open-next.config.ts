import type { OpenNextConfig } from "@opennextjs/cloudflare";

const config = {
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      incrementalCache: "dummy",
      tagCache: "dummy",
      queue: "dummy",
    },
  },
} satisfies OpenNextConfig;

export default config;
