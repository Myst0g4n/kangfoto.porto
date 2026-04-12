/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Mengaktifkan mode statis untuk shared hosting
  images: {
    unoptimized: true, // Diperlukan untuk static export
  },
  // Menghapus rewrites karena ini static site
};

module.exports = nextConfig;