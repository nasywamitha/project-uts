import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async rewrites() {
    return [
      { source: '/dashboard', destination: '/src/dashboard' },
      { source: '/kategori', destination: '/src/kategori' },
      { source: '/pengguna', destination: '/src/pengguna' },
      { source: '/fitur', destination: '/src/fitur' },
      { source: '/pengaturan', destination: '/src/pengaturan' },
    ];
  },
};

export default nextConfig;