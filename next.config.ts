import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // ページ本体はキャッシュさせない。新しく出したものがすぐ反映されるように。
        // /_next/static/ の中身はファイル名にハッシュが付くので、ここでは触らない。
        source: "/:path((?!_next/static|_next/image|favicon.ico).*)",
        headers: [
          { key: "Cache-Control", value: "no-store, must-revalidate" },
          { key: "Pragma", value: "no-cache" },
        ],
      },
    ];
  },
};

export default nextConfig;
