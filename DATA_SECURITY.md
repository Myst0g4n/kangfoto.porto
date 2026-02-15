# Sistem Keamanan Data - KangFoto Portfolio

## Pendekatan Baru: Build-Time Data Embedding

Kami telah mengganti pendekatan sebelumnya yang menyimpan file JSON di folder `public/` dengan sistem yang lebih aman dan efisien. Pendekatan baru ini menggabungkan data ke dalam aplikasi saat proses build time.

## Perubahan Utama

### 1. Lokasi Data
- **Sebelum**: Data disimpan di `public/data/` (dapat diakses secara langsung)
- **Sesudah**: Data disimpan di `private_data/` (tidak dapat diakses secara langsung)

### 2. Akses Data
- **Sebelum**: Data diambil melalui HTTP request ke file JSON publik
- **Sesudah**: Data diembed langsung ke dalam bundle aplikasi saat build time

### 3. Struktur Data
- Data tetap dalam format JSON
- Data diakses melalui sistem manajemen data terpusat di `lib/utils/dataManager.ts`

## Arsitektur Keamanan

### Private Data Directory
- File-file JSON disimpan di `private_data/` bukan di `public/`
- Tidak dapat diakses secara langsung melalui URL
- Hanya dapat diakses melalui sistem build

### Embedded Data System
- Data diambil saat proses build (build-time)
- Data diembed ke dalam bundle aplikasi
- Tidak ada request HTTP ke file JSON saat runtime
- Data terintegrasi langsung ke dalam komponen

### Centralized Data Manager
- Semua akses data melalui `lib/utils/dataManager.ts`
- Fungsi-fungsi untuk mengakses dan memfilter data
- Antarmuka tipe yang konsisten

## Keuntungan Pendekatan Baru

### 1. Keamanan
- Data tidak dapat diakses secara langsung oleh pengguna
- Tidak ada endpoint publik untuk file JSON
- Data terlindungi dari akses tidak sah

### 2. Performa
- Tidak ada request HTTP tambahan untuk mengambil data
- Data tersedia segera saat aplikasi dimuat
- Pengurangan latency

### 3. Keterandalan
- Tidak bergantung pada ketersediaan file eksternal
- Aplikasi tetap berfungsi meskipun ada masalah jaringan
- Lebih stabil dalam lingkungan produksi

## Implementasi

### Struktur File
```
frontend/
├── private_data/           # Data JSON pribadi (tidak publik)
│   ├── social.json         # Data social media
│   ├── galleries.json      # Data galeri
│   ├── teams.json          # Data tim
│   └── packages.json       # Data paket harga
├── lib/
│   └── utils/
│       └── dataManager.ts  # Sistem manajemen data terpusat
└── next.config.js          # Konfigurasi build-time data embedding
```

### Konfigurasi Build
File `next.config.js` mengandung logika untuk membaca data dari `private_data/` saat proses build dan menggabungkannya ke dalam aplikasi.

## Cara Menambahkan Data Baru

1. Tambahkan entri ke file JSON yang sesuai di `private_data/`
2. Pastikan struktur data sesuai dengan interface yang didefinisikan
3. Jalankan proses build ulang untuk menggabungkan data baru

## Catatan Penting

- Data hanya akan diperbarui saat proses build dijalankan
- Untuk perubahan data, aplikasi perlu di-build ulang
- Cocok untuk data yang tidak berubah secara real-time
- Sangat aman untuk data statis seperti profil, galeri, paket layanan

## Perbandingan Keamanan

| Aspek | Pendekatan Lama | Pendekatan Baru |
|-------|----------------|----------------|
| Akses File | Publik (langsung via URL) | Privat (hanya saat build) |
| Request HTTP | Ya (ke file JSON) | Tidak (data embedded) |
| Keamanan | Rendah | Tinggi |
| Performa | Sedang | Tinggi |
| Keterandalan | Tergantung jaringan | Mandiri |