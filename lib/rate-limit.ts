import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { config } from "@/lib/config";

const redis = new Redis({
  url: config.upstashUrl,
  token: config.upstashToken,
});

export const loginLimiter =
  new Ratelimit({
    redis,

    limiter:
      Ratelimit.slidingWindow(
        5,
        "15 m"
      ),

    analytics: true,
  });

export const loginIpLimiter =
  new Ratelimit({
    redis,

    limiter:
      Ratelimit.slidingWindow(
        20,
        "15 m"
      ),

    analytics: true,
  });

export const registerLimiter =
  new Ratelimit({
    redis,

    limiter:
      Ratelimit.slidingWindow(
        3,
        "1 h"
      ),

    analytics: true,
  });