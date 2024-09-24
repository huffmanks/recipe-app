/** @type {import('next').NextConfig} */
import withSerwistInit from "@serwist/next";

import env from "@/env";

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  disable: env.NODE_ENV === "development" ? true : false,
});

const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
};

export default withSerwist(nextConfig);
