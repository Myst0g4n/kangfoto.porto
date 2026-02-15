# KangFoto Portfolio - JSON-Based Architecture

## Overview
Aplikasi portofolio fotografi yang menggunakan data statis berbasis JSON tanpa koneksi ke API eksternal.

## Struktur Direktori

```
frontend/
├── app/
│   ├── api/                 # (kosong - tidak ada API routes)
│   ├── components/          # Komponen UI reusable
│   │   ├── feature/         # Sub-komponen kecil
│   │   ├── footer.tsx      # Footer dengan social media links
│   │   ├── navbar.tsx      # Navigasi utama
│   │   ├── hero.tsx        # Hero section
│   │   ├── about.tsx       # Tentang kami
│   │   ├── project.tsx     # Preview galeri
│   │   ├── team.tsx        # Tim kami
│   │   ├── pricelist.tsx   # Daftar harga
│   │   └── ...             # Komponen lainnya
│   ├── gallery/
│   │   └── page.tsx        # Halaman galeri lengkap
│   ├── layout.tsx          # Layout utama
│   └── page.tsx            # Halaman beranda
├── lib/
│   └── hooks/               # Custom React hooks
│       ├── useSocialMedia.ts # Data social media dari JSON
│       ├── useProjectGallery.ts # Data galeri dari JSON
│       ├── useProjects.ts   # Data proyek dari JSON
│       ├── useTeamMembers.ts # Data tim dari JSON
│       ├── usePricePackages.ts # Data paket harga dari JSON
│       └── ...              # Hooks lainnya
├── public/
│   ├── data/                # File JSON data statis
│   │   ├── social.json      # Data social media
│   │   ├── galleries.json   # Data galeri foto
│   │   ├── teams.json       # Data anggota tim
│   │   └── packages.json    # Data paket harga
│   ├── img/                 # Gambar-gambar statis
│   └── ...                  # File statis lainnya
├── package.json             # Dependensi proyek
├── next.config.ts           # Konfigurasi Next.js
├── tsconfig.json            # Konfigurasi TypeScript
└── README.md                # Dokumentasi utama
```

## Arsitektur Clean Code

### 1. Separation of Concerns
- **Components**: Bertanggung jawab atas tampilan dan interaksi UI
- **Hooks**: Bertanggung jawab atas logika bisnis dan manajemen state
- **Data**: File JSON statis sebagai sumber data utama

### 2. Single Responsibility Principle
Setiap hook hanya bertanggung jawab atas satu jenis data:
- `useSocialMedia`: Mengelola data social media
- `useProjectGallery`: Mengelola data galeri proyek
- `useTeamMembers`: Mengelola data anggota tim
- `usePricePackages`: Mengelola data paket harga

### 3. Data Flow
```
JSON Files → Hooks → Components → UI
```

## Data Sources
Semua data diambil dari file JSON statis di `public/data/`:
- `/data/social.json` - Informasi social media
- `/data/galleries.json` - Koleksi foto galeri
- `/data/teams.json` - Informasi anggota tim
- `/data/packages.json` - Detail paket harga

## Keunggulan Arsitektur JSON-Only
- **Kecepatan**: Tidak ada delay dari API calls
- **Reliabilitas**: Tidak tergantung pada koneksi eksternal
- **Maintainability**: Mudah diedit tanpa perlu akses ke CMS
- **Offline Support**: Bekerja tanpa koneksi internet
- **Build Time**: Semua data diproses saat build time

## Cara Menambahkan Data Baru
1. Edit file JSON yang relevan di `public/data/`
2. Struktur data harus sesuai dengan interface yang didefinisikan di hooks
3. Restart development server jika perlu

## Environment Variables
Tidak ada koneksi API, sehingga tidak memerlukan environment variables untuk API.

## Deployment
- Dapat di-deploy sebagai static site
- Tidak memerlukan server backend
- Mendukung CDN untuk distribusi global