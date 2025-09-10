// next.config.mjs
import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {}, // puedes pasar remark/rehype aquí si los necesitas
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],

  // Solo deja esto si REALMENTE usas `next-mdx-remote`. Si no, elimínalo.
  // transpilePackages: ["next-mdx-remote"],

  experimental: {
    // mejora bundle con imports “finos” (opcional)
    optimizePackageImports: ["react-icons", "@once-ui-system/core"],
  },

  images: {
    remotePatterns: [
      // reemplaza con los dominios que sí uses
      // { protocol: "https", hostname: "images.unsplash.com" },
      // { protocol: "https", hostname: "your-cdn.example.com" },
    ],
  },

  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default withMDX(nextConfig);

