import { MetadataRoute } from "next";

export default function manifest():
  MetadataRoute.Manifest {
  return {
    name:
      process.env
        .NEXT_PUBLIC_APP_NAME ??
      "Mon Site",

    short_name:
      process.env
        .NEXT_PUBLIC_APP_NAME ??
      "Mon Site",

    start_url: "/",

    display: "standalone",

    background_color:
      "#ffffff",

    theme_color:
      "#000000",

    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}