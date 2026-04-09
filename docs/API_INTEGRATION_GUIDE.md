# 🔌 API Integration Guide - KangFoto Frontend

## ✅ Integrasi Berhasil!

Frontend KangFoto sekarang terhubung langsung ke backend API sesuai dokumentasi `API_DOCUMENTATION.md` v2.2.0.

---

## 🚀 Quick Start

### **1. Setup Environment**

Pastikan file `.env.local` sudah ada dengan konfigurasi yang benar:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

**Untuk Production:**
```env
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com
```

---

### **2. Start Backend (Laravel/CodeIgniter)**

```bash
# Sesuaikan dengan backend Anda
cd backend
php spark serve --port 8080
# atau
php artisan serve --port=8080
```

Backend akan running di: `http://localhost:8080`

---

### **3. Start Frontend (Next.js)**

```bash
cd frontend
npm install
npm run dev
```

Frontend akan running di: `http://localhost:3000`

---

### **4. Test Connection**

Buka: `http://localhost:3000`

Frontend akan otomatis fetch data dari backend API Anda!

---

## 📋 API Endpoints yang Digunakan

Frontend menggunakan endpoints berikut dari backend:

| Endpoint | Method | Access | Used By |
|----------|--------|--------|---------|
| `/api/galleries` | GET | 🟢 Public | Gallery Pages |
| `/api/teams` | GET | 🟢 Public | Team Section |
| `/api/packages` | GET | 🟢 Public | Pricing Section |
| `/api/social` | GET | 🟢 Public | Footer Social Links |
| `/api/auth/login` | POST | 🟢 Public | Admin Login |
| `/api/upload` | POST | 🔒 Protected | Admin Image Upload |

---

## 🔐 Authentication Flow

### **Public Access (GET Endpoints):**
```javascript
// Tidak perlu token untuk GET request
const response = await apiClient.get('/galleries');
```

### **Protected Access (POST/PUT/DELETE):**
```javascript
// 1. Login untuk mendapatkan token
const loginResponse = await apiClient.login('admin', 'password123');

// 2. Token otomatis disimpan di localStorage
// 3. Semua request selanjutnya akan menggunakan token ini
```

---

## 🖼️ Image URL Resolution

Sesuai dokumentasi API v2.2.0:

**Path dari Backend:**
```json
{
  "thumbnail": "/uploads/gallery/thumb_123.jpg",
  "full_image": "/uploads/gallery/full_123.jpg"
}
```

**Resolusi di Frontend:**
```javascript
const BASE_URL = 'http://localhost:8080'; // Dari .env.local
const thumbnailPath = "/uploads/gallery/thumb_123.jpg";

// Hasil:
const fullUrl = BASE_URL + thumbnailPath;
// "http://localhost:8080/uploads/gallery/thumb_123.jpg"
```

**Implementasi di Hooks:**
```typescript
// useProjectGallery.ts
const fixImagePath = (path: string): string => {
  if (path.startsWith('http')) return path;
  return `${baseUrl}${path}`; // BASE_URL + /uploads/...
};
```

---

## 📁 File Structure

```
frontend/
├── lib/
│   ├── api-client.ts          # API Client untuk backend
│   ├── cache.ts               # LocalStorage caching
│   └── hooks/
│       ├── useSocialMedia.ts  # Fetch from /api/social
│       ├── useProjectGallery.ts # Fetch from /api/galleries
│       ├── useTeamMembers.ts  # Fetch from /api/teams
│       └── usePricePackages.ts # Fetch from /api/packages
├── .env.local                 # Environment variables
└── docs/
    └── API_DOCUMENTATION.md   # Backend API documentation
```

---

## 🎯 API Client Methods

### **Authentication:**
```typescript
apiClient.login(username, password)    // POST /api/auth/login
apiClient.logout()                      // POST /api/auth/logout
apiClient.getMe()                       // GET /api/auth/me
apiClient.isAuthenticated()             // Check if logged in
```

### **Data Fetching:**
```typescript
apiClient.get(endpoint)                 // GET request
apiClient.post(endpoint, body)          // POST request
apiClient.put(endpoint, body)           // PUT request
apiClient.delete(endpoint)              // DELETE request
```

### **File Upload:**
```typescript
const formData = new FormData();
formData.append('file', file);
formData.append('type', 'gallery');

await apiClient.upload('/upload', formData);
```

---

## 🐛 Troubleshooting

### **Error: "Failed to fetch"**

**Penyebab:**
- Backend tidak running
- URL salah di `.env.local`
- CORS tidak dikonfigurasi di backend

**Solusi:**
```bash
# 1. Pastikan backend running di port 8080
cd backend
php spark serve --port 8080

# 2. Check .env.local
cat .env.local
# Harus ada: NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

### **Images Not Loading**

**Penyebab:**
- Path gambar tidak sesuai format `/uploads/...`
- Folder uploads tidak accessible

**Solusi:**
1. Pastikan backend mengembalikan path seperti `/uploads/gallery/image.jpg`
2. Cek di browser: `http://localhost:8080/uploads/gallery/image.jpg`
3. Pastikan folder uploads memiliki permission yang benar

### **CORS Error**

**Solusi di Backend:**
Tambahkan header CORS di response backend:
```php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
```

---

## ✅ Testing Checklist

### **Public Endpoints:**
- [ ] Homepage loads (fetches galleries, teams, packages, social)
- [ ] Gallery page displays images correctly
- [ ] Team section shows member photos
- [ ] Pricing shows packages
- [ ] Footer shows social links

### **Protected Endpoints (Admin):**
- [ ] Admin login works
- [ ] Dashboard loads (auth check)
- [ ] Image upload works
- [ ] Logout works

---

## 🚀 Deployment

### **Environment Variables Production:**

**Frontend `.env`:**
```env
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com
```

### **Build:**
```bash
npm run build
npm run start
```

---

**Happy Integrating! 🚀**
