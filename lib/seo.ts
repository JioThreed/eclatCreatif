export const seo = {
  siteName:
    process.env.NEXT_PUBLIC_APP_NAME ??
    "Mon Site",

  description:
    process.env
      .NEXT_PUBLIC_APP_DESCRIPTION ??
    "",

  url:
    process.env
      .NEXT_PUBLIC_APP_URL ??
    "http://localhost:3000",

  image: "/og-image.jpg",
};