// next.config.js - Konfigurasi sederhana untuk aplikasi
/** @type {import('next').NextConfig} */

const nextConfig = {
  // Konfigurasi dasar
  output: 'export', // Static export
  trailingSlash: true,
  images: {
    unoptimized: true, // Karena kita menggunakan static export
  },
};

module.exports = nextConfig;