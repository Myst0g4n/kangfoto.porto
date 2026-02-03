# Gallery API Integration - Update Summary

## Changes Made

### 1. Updated `useProjectGallery` Hook
**File**: `lib/hooks/useProjectGallery.ts`

**Changes**:
- ✅ Fetch data dari API endpoint `/galleries`
- ✅ Filter data berdasarkan `is_show === true`
- ✅ Transform API response ke ProjectImage format
- ✅ Handle loading dan error states
- ✅ Return: `images`, `loading`, `error`, `getPreviewImages()`, `getAllGalleryImages()`

**API Data Structure**:
```typescript
{
  data: [
    {
      id: number;
      name: string;           // Display title
      slug: string;           // Category/tag
      description: string;    // Image description
      photo: string;         // Image URL
      is_show: boolean;      // Visibility flag
    }
  ]
}
```

**ProjectImage Format** (setelah transform):
```typescript
{
  id: number;
  name: string;             // dari API.name
  slug: string;             // dari API.slug (digunakan untuk kategori)
  description: string;      // dari API.description
  thumbnail: string;        // sama dengan photo (bisa dioptimasi)
  fullImage: string;        // sama dengan photo
  is_show: boolean;         // dari API.is_show
}
```

---

### 2. Updated Components

#### `project.tsx` (Home Preview)
**Changes**:
- ✅ Handle `loading` state dengan pesan "Loading gallery..."
- ✅ Handle `error` state dengan tampil pesan error
- ✅ Handle empty state jika tidak ada images
- ✅ Hanya tampil 5 preview images
- ✅ Lightbox tetap berfungsi

#### `gallery/page.tsx` (Full Gallery)
**Changes**:
- ✅ Handle `loading` state
- ✅ Handle `error` state
- ✅ Handle empty state
- ✅ Tampil semua images dari API
- ✅ Stats menggunakan `slug` untuk count kategori (bukan category)

#### `ProjectGalleryCard.tsx`
**Changes**:
- ✅ Menampilkan `image.name` (bukan `title`)
- ✅ Menampilkan `image.slug` sebagai badge (bukan `category`)

#### `LightboxGallery.tsx`
**Changes**:
- ✅ Menampilkan `image.name` di info overlay
- ✅ Menampilkan `image.slug` sebagai badge

---

## How It Works

```
Flow:
┌──────────────────────┐
│   API Endpoint       │
│   /galleries         │
└──────────┬───────────┘
           ↓
┌──────────────────────────────────┐
│   useProjectGallery Hook         │
│   ├─ Fetch data                  │
│   ├─ Filter is_show === true     │
│   └─ Transform format            │
└──────────┬───────────────────────┘
           ↓
┌──────────────────────────────────┐
│   Home & Gallery Pages           │
│   ├─ project.tsx (5 preview)     │
│   └─ gallery/page.tsx (all)      │
└──────────────────────────────────┘
```

---

## States Handled

### Loading
```
"Loading gallery..."
```

### Error
```
Shows error message from API or catch block
```

### Empty Data
```
"No gallery items to display"
```

### Success
```
Display gallery with images (filtered by is_show)
```

---

## API Response Example

```json
{
  "data": [
    {
      "id": 1,
      "name": "Wedding at Grand Hotel",
      "slug": "wedding",
      "description": "Beautiful wedding ceremony captured",
      "photo": "https://api.example.com/images/wedding-1.jpg",
      "is_show": true
    },
    {
      "id": 2,
      "name": "Corporate Conference",
      "slug": "corporate",
      "description": "Tech summit event photography",
      "photo": "https://api.example.com/images/corp-1.jpg",
      "is_show": true
    },
    {
      "id": 3,
      "name": "Draft Image",
      "slug": "other",
      "description": "Not published yet",
      "photo": "https://api.example.com/images/draft.jpg",
      "is_show": false  // ← TIDAK AKAN DITAMPILKAN
    }
  ]
}
```

---

## Optional Optimizations

1. **Image Optimization**
   - Gunakan thumbnail URL yang berbeda untuk home preview
   - Keep full resolution untuk lightbox
   - Compress images di server untuk performance

2. **Category/Slug Usage**
   - Saat ini menggunakan `slug` untuk badge
   - Bisa ditambah field `category` jika ingin kategori terpisah
   - Count kategori menggunakan unique slugs

3. **Caching**
   - Add `revalidate` time untuk cache API response
   - Atau implement infinite scroll untuk load lebih banyak

4. **Navigation**
   - Bisa tambah prev/next buttons di lightbox
   - Filter by slug/category option

---

## Testing

Pastikan:
1. API endpoint `/galleries` return data dengan struktur benar
2. Field `is_show` bernilai `true` atau `false`
3. Field `photo` contains valid image URL
4. Loading state berfungsi dengan baik
5. Error handling working when API fails

---

## Notes

- ✅ Semua components sudah terupdate
- ✅ Filter `is_show` berjalan otomatis di hook
- ✅ Loading/error states handled di semua pages
- ✅ Preview tetap 5 images, gallery tampil semua
- ✅ Lightbox tetap fully functional dengan API data
