/** @type {import('next').NextConfig} */
import withSerwistInit from "@serwist/next";
import createJiti from "jiti";
import { fileURLToPath } from "node:url";

const jiti = createJiti(fileURLToPath(import.meta.url));

const { env } = jiti("./src/env/index.ts");

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  disable: env.NODE_ENV === "development" ? true : false,
});

const nextConfig = {};

export default withSerwist(nextConfig);
