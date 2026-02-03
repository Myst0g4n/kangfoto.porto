# Gallery System - Architecture Summary

## 📁 File Structure

```
app/
├── components/
│   ├── project.tsx                    # Home gallery preview (5 images)
│   ├── ProjectGalleryCard.tsx          # Gallery card dengan hover effect
│   └── LightboxGallery.tsx             # Fullscreen modal untuk image
├── gallery/
│   └── page.tsx                        # Halaman gallery lengkap
└── globals.css                         # Animations (fadeIn, scaleIn)

lib/
└── hooks/
    └── useProjectGallery.ts            # Gallery data & methods
```

## 🎯 How It Works

### 1. HOME PAGE (project.tsx)
```
┌─────────────────────────────────┐
│    Our Works (Section)          │
├─────────────────────────────────┤
│  [Img1] [Img2] [Img3] [Img4] [Img5]  │ ← 5 Preview Images
├─────────────────────────────────┤
│  [Lihat Galeri Lengkap Button]  │
└─────────────────────────────────┘
```

### 2. CLICK IMAGE → LIGHTBOX
```
┌────────────────────────────────────────┐
│  ✕                                  │
├────────────────────────────────────────┤
│                                        │
│       [HIGH RESOLUTION IMAGE]          │
│                                        │
├────────────────────────────────────────┤
│   Title | Description | Category       │
└────────────────────────────────────────┘
```

### 3. GALLERY PAGE (/gallery)
```
┌─────────────────────────────────┐
│  Galeri Lengkap                │
│  (All images grid)              │
├─────────────────────────────────┤
│  [Img1] [Img2] [Img3] ... [Img10] │
│  [Img11] [Img12] ...            │
├─────────────────────────────────┤
│  10+ Foto | 2 Kategori | 4K+    │
└─────────────────────────────────┘
```

## 🎨 Features

### ProjectGalleryCard
- **Display**: Thumbnail image (compressed)
- **Hover Effect**: 
  - Image zoom (1.1x scale)
  - Dark overlay fade
  - Info text appear (title, desc, category)
  - Eye icon indicator
- **Click**: Opens lightbox with full resolution

### LightboxGallery
- **Display**: Full resolution image centered
- **Backdrop**: Black with blur effect
- **Info**: Bottom overlay with gradient
- **Close**: 
  - Click outside
  - ESC key
  - Close button (✕)
- **Animations**: Smooth fadeIn & scaleIn

### useProjectGallery Hook
- `getPreviewImages()` → 5 images for home
- `getAllGalleryImages()` → All images for gallery page
- Data structure with thumbnail & fullImage paths

## 📊 Data Flow

```
useProjectGallery Hook
├── projects[] array
│   └── images[] array
│       ├── thumbnail (for home)
│       └── fullImage (for lightbox)
│
├── getPreviewImages() 
│   └── First 5 images → Home
│
└── getAllGalleryImages()
    └── All images → Gallery Page
```

## 🚀 Responsive Grid

```
Mobile (1 column)
[Img]
[Img]
[Img]

Tablet (2-3 columns)
[Img] [Img]
[Img] [Img]

Desktop (5 columns)
[Img] [Img] [Img] [Img] [Img]
```

## ✨ Animations

| Animation | Duration | Effect |
|-----------|----------|--------|
| Image Zoom (hover) | 500ms | scale: 1 → 1.1 |
| Info Fade (hover) | 300ms | opacity: 0 → 1 |
| Lightbox Enter | 300ms | fadeIn + scaleIn |
| Overlay Fade | 300ms | smooth transition |

## 🔄 User Flow

```
User visits home
    ↓
See 5 preview images
    ↓
Click image → Lightbox opens
    ↓
See full resolution + info
    ↓
Close lightbox (ESC or click)
    ↓
Click "See More" → Gallery page
    ↓
Browse all images
    ↓
Click any image → Lightbox
```

## 📝 Next Steps

1. **Add real images**:
   - Replace `/img/gallery/...` paths
   - Compress thumbnails (max 500px width)
   - Keep full images at 4K+ resolution

2. **Update data** in `useProjectGallery.ts`:
   - Add more projects
   - Update image paths
   - Customize titles, descriptions, categories

3. **Optional enhancements**:
   - Add image navigation (prev/next) in lightbox
   - Add filter by category
   - Add lightbox captions
   - Add download button

## 🎯 Performance Tips

- ✅ Use compressed thumbnails (~50KB each)
- ✅ Use Next.js Image for optimization
- ✅ Lazy load full resolution images
- ✅ Use WebP format for newer browsers
- ✅ Cache images with proper headers
