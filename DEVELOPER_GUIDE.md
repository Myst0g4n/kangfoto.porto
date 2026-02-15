# KangFoto Portfolio - Developer Guide

## Overview
Aplikasi portofolio fotografi berbasis Next.js 16 dengan data statis JSON.

## Setup Development

### Prerequisites
- Node.js 18+ 
- npm, yarn, atau bun

### Installation
```bash
npm install
```

### Running Development Server
```bash
npm run dev
```
Buka http://localhost:3000 di browser

## Arsitektur Aplikasi

### Stack Teknologi
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Google Fonts (Geist, Audiowide, Italianno)

### Struktur Data
Aplikasi menggunakan data statis JSON yang disimpan di:
- `public/data/social.json` - Informasi social media
- `public/data/galleries.json` - Koleksi foto galeri
- `public/data/teams.json` - Informasi anggota tim
- `public/data/packages.json` - Detail paket harga

## Komponen Utama

### Komponen UI (`app/components/`)
- `navbar.tsx` - Navigasi utama
- `hero.tsx` - Hero section dengan animasi teks
- `about.tsx` - Section tentang studio
- `project.tsx` - Preview galeri dengan lightbox
- `team.tsx` - Informasi tim fotografer
- `pricelist.tsx` - Daftar paket harga
- `footer.tsx` - Footer dengan social media links

### Hooks (`lib/hooks/`)
- `useSocialMedia.ts` - Manajemen data social media
- `useProjectGallery.ts` - Manajemen koleksi galeri
- `useProjects.ts` - Manajemen proyek
- `useTeamMembers.ts` - Manajemen data tim
- `usePricePackages.ts` - Manajemen paket harga
- `useScrollAnimation.ts` - Animasi saat scroll
- `useCardAnimation.ts` - Animasi kartu

## Animasi & Interaksi

### Scroll Animation
Komponen menggunakan `useScrollAnimation` untuk efek fade-in saat di-scroll ke viewport.

### Lightbox Gallery
Fitur fullscreen untuk melihat foto resolusi tinggi dengan navigasi dan info detail.

### Hover Effects
Efek zoom dan overlay pada kartu galeri untuk pengalaman interaktif.

## Styling

### Warna Tema
- Background: Gradient dari slate-900 ke purple-900
- Accent: Warna ungu/purple untuk highlight
- Text: Putih/abu-abu untuk kontras

### Typography
- Font utama: Geist Sans
- Font monospace: Geist Mono
- Font khusus: Audiowide, Italianno untuk elemen dekoratif

## Data Management

### Menambahkan Konten Baru
Untuk menambahkan galeri foto baru:
1. Tambahkan entry baru ke `public/data/galleries.json`
2. Pastikan path gambar valid di `public/img/gallery/`

Untuk menambahkan anggota tim baru:
1. Tambahkan entry baru ke `public/data/teams.json`
2. Pastikan foto tersedia di `public/img/team/`

### Struktur Data

#### Gallery Item
```json
{
  "id": number,
  "name": string,
  "slug": string,
  "description": string,
  "thumbnail": string,
  "fullImage": string,
  "is_show": boolean
}
```

#### Team Member
```json
{
  "id": number,
  "name": string,
  "experience": string,
  "quote": string,
  "photo": string
}
```

#### Price Package
```json
{
  "id": number,
  "title": string,
  "description": string,
  "price": string,
  "features": string[],
  "note": string
}
```

## Deployment

### Build untuk Production
```bash
npm run build
```

### Menjalankan Production Server
```bash
npm run start
```

## Best Practices

### TypeScript
- Gunakan interface untuk definisi tipe data
- Hindari penggunaan `any` sebisa mungkin
- Gunakan strict mode di tsconfig.json

### React Patterns
- Gunakan custom hooks untuk logika yang bisa digunakan ulang
- Pisahkan concerns antara tampilan dan logika
- Gunakan memoization untuk komponen yang kompleks

### Performance
- Optimalkan gambar sebelum upload
- Gunakan lazy loading untuk konten yang tidak terlihat
- Minimalkan jumlah re-render dengan useCallback dan useMemo

## Troubleshooting

### Gambar Tidak Muncul
- Pastikan path gambar benar di file JSON
- Pastikan file gambar ada di direktori `public/`
- Cek kapitalisasi nama file

### Data Tidak Tampil
- Pastikan struktur JSON valid
- Cek konsistensi tipe data
- Verifikasi nama field sesuai dengan yang digunakan di hooks

## Kontribusi

1. Buat branch fitur baru
2. Lakukan perubahan
3. Test perubahan
4. Commit dengan pesan deskriptif
5. Submit pull request