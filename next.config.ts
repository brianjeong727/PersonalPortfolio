import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Lets <ViewTransition> morph a project's screenshot into its case-study header.
    viewTransition: true,
  },
};

export default nextConfig;
