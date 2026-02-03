# Gallery System Documentation

## Overview
Sistem gallery yang menampilkan portofolio fotografi dengan preview dan fullscreen view.

## Struktur File

### Hooks (`lib/hooks/`)
- **useProjectGallery.ts**
  - Menyimpan data gallery dengan image thumbnail dan fullImage
  - `getPreviewImages()` - Menampilkan 5 gambar pertama
  - `getAllGalleryImages()` - Menampilkan semua gambar
  - Setiap gambar memiliki metadata: title, category, description

### Components (`app/components/`)

#### ProjectGalleryCard.tsx
- Menampilkan thumbnail image dengan terkompresi
- Hover effect: zoom image, overlay info, kategori
- Click untuk membuka lightbox fullscreen
- Responsive grid: 1 kolom mobile, 5 kolom desktop

#### LightboxGallery.tsx
- Modal fullscreen untuk melihat resolusi tinggi
- Info overlay (judul, deskripsi, kategori)
- Close button dan ESC key untuk menutup
- Backdrop blur effect
- Smooth animations (fadeIn, scaleIn)

### Pages (`app/`)

#### gallery/page.tsx
- Halaman lengkap untuk menampilkan semua gallery
- URL: `/gallery`
- Menampilkan semua images dari getAllGalleryImages()
- Stats section (jumlah foto, kategori, resolusi)
- Back to home link

#### project.tsx (home)
- Preview 5 gambar pertama
- "Lihat Galeri Lengkap" button ke `/gallery`

## Data Structure

```typescript
ProjectImage {
  id: number;
  title: string;
  category: string;
  thumbnail: string;      // Compressed image
  fullImage: string;      // High resolution image
  description: string;
}

ProjectGallery {
  id: number;
  projectName: string;
  images: ProjectImage[];
}
```

## Features

✅ **Responsive Design**
- Mobile: 1 kolom
- Tablet: 2-3 kolom
- Desktop: 5 kolom

✅ **Interactive**
- Hover effect dengan zoom & info
- Click untuk fullscreen
- ESC key untuk close
- Eye icon indicator

✅ **Performance**
- Thumbnail images terkompresi untuk home
- Full resolution hanya dimuat saat diklik

✅ **Animations**
- Smooth transitions (0.3s)
- Scale in/fade in effects
- Hover zoom (1.1x scale)

## Customization

### Menambah Data Gallery
Edit `lib/hooks/useProjectGallery.ts` dan tambahkan di array `projects`:

```typescript
{
  id: 3,
  projectName: "Your Project Name",
  images: [
    {
      id: 11,
      title: "Image Title",
      category: "Category",
      thumbnail: "/img/gallery/image-thumb.jpg",
      fullImage: "/img/gallery/image-full.jpg",
      description: "Description text"
    }
  ]
}
```

### Mengubah Grid Columns
Edit `ProjectGalleryCard.tsx` className:
```tsx
// Saat ini:
xl:grid-cols-5 // Desktop
lg:grid-cols-3 // Tablet
md:grid-cols-2 // Mobile landscape
// Ubah angka sesuai kebutuhan
```

### Styling Lightbox
Edit `LightboxGallery.tsx` untuk ubah:
- Background blur
- Animation speed
- Info overlay gradient
- Text styling

## Browser Support
- Modern browsers dengan CSS Grid support
- Firefox, Chrome, Safari, Edge

## Notes
- Replace `/img/gallery/...` dengan path actual images
- Pastikan image file tersedia di `public/img/gallery/`
- Compress images untuk performance optimal
