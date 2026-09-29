import { Redis } from "@upstash/redis";

export const redis =
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url:
          process.env
            .UPSTASH_REDIS_REST_URL,

        token:
          process.env
            .UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

let redisOk = false;

if (redis) {
  try {
    await redis.ping();
    redisOk = true;
  } catch {}
}