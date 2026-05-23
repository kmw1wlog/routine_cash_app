import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "루틴캐시",
    short_name: "루틴캐시",
    description: "목표 기반 부업 루틴 모바일 MVP",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f1e8",
    theme_color: "#137b61",
    lang: "ko-KR",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
