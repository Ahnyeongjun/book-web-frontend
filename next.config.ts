import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";

const withSerwist = withSerwistInit({
  swSrc: "sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  publicRuntimeConfig: {
    VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-alpha-sig.figma.com",
      },
      {
        protocol: "https",
        hostname: "image.aladin.co.kr",
        pathname: "/product/**",
      },
      {
        protocol: "http",
        hostname: "image.aladin.co.kr",
        pathname: "/product/**",
      },
      {
        protocol: "https",
        hostname: "search1.kakaocdn.net",
        pathname: "/thumb/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "www.instagram.com",
      },
      {
        protocol: "https",
        hostname: "scontent-ssn1-1.cdninstagram.com",
      },
    ], // 책사진 도메인 허용
    domains: [
      "i.ytimg.com",
      "i0.wp.com",
      "image.yes24.com",
      "minumsa.minumsa.com",
    ],
  },
  webpack: (config) => {
    // SVG 파일에 대한 규칙 추가
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
};

export default withSerwist(nextConfig);
