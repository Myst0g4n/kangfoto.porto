// next.config.js - Konfigurasi untuk build-time data fetching
const fs = require('fs');
const path = require('path');

// Fungsi untuk membaca data saat build time
function loadData() {
  const dataDir = path.join(__dirname, 'private_data');
  
  const data = {};
  
  // Baca semua file JSON dari direktori private_data
  const files = fs.readdirSync(dataDir);
  
  for (const file of files) {
    if (file.endsWith('.json')) {
      const filePath = path.join(dataDir, file);
      const fileName = file.replace('.json', '');
      data[fileName] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  }
  
  return data;
}

// Ambil data saat build time
const buildTimeData = loadData();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Embed data ke dalam aplikasi saat build
  webpack: (config, { isServer }) => {
    // Tambahkan plugin untuk menggabungkan data ke dalam bundle
    config.plugins.push({
      apply: (compiler) => {
        compiler.hooks.emit.tapAsync('EmbedDataPlugin', (compilation, callback) => {
          // Buat file data.js yang berisi data yang diembed
          const dataContent = `
            // Data yang diembed saat build time
            export const embeddedData = ${JSON.stringify(buildTimeData, null, 2)};
          `;
          
          compilation.assets['embeddedData.js'] = {
            source: () => dataContent,
            size: () => dataContent.length
          };
          
          callback();
        });
      }
    });
    
    return config;
  },
  
  // Konfigurasi lainnya
  output: 'export', // Static export
  trailingSlash: true,
  images: {
    unoptimized: true, // Karena kita menggunakan static export
  },
};

module.exports = nextConfig;