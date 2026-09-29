export const publicConfig = {
  appName:
    process.env.NEXT_PUBLIC_APP_NAME ?? "Mon Site",

  appDescription:
    process.env.NEXT_PUBLIC_APP_DESCRIPTION,

  turnstileSiteKey:
    process.env
      .NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
};