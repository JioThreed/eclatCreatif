export const config = {
  appName:
    process.env.NEXT_PUBLIC_APP_NAME ?? "Mon Site",

  appDescription:
    process.env.NEXT_PUBLIC_APP_DESCRIPTION,

  appUrl:
    process.env.NEXTAUTH_URL!,

  nextAuthSecret:
    process.env.NEXTAUTH_SECRET!,

  databaseUrl:
    process.env.DATABASE_URL!,

  googleClientId:
    process.env.GOOGLE_CLIENT_ID!,

  googleClientSecret:
    process.env.GOOGLE_CLIENT_SECRET!,

  resendApiKey:
    process.env.RESEND_API_KEY!,

  turnstileSiteKey:
    process.env
      .NEXT_PUBLIC_TURNSTILE_SITE_KEY!,

  turnstileSecretKey:
    process.env
      .TURNSTILE_SECRET_KEY!,

  upstashUrl:
    process.env
      .UPSTASH_REDIS_REST_URL!,

  upstashToken:
    process.env
      .UPSTASH_REDIS_REST_TOKEN!,
};