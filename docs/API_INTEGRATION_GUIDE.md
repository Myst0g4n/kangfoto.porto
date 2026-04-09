# 🔌 API Integration Guide - KangFoto Frontend + Laravel Backend

## ✅ Integrasi Berhasil!

Frontend KangFoto sekarang sudah terintegrasi dengan Laravel Backend API sesuai dengan `API_DOCUMENTATION.md`.

---

## 🚀 Quick Start

### **1. Setup Environment**

Buat file `.env.local` di folder **frontend**:

```env
NEXT_PUBLIC_LARAVEL_API_URL=http://localhost:8000/api
```

**Untuk Production:**
```env
NEXT_PUBLIC_LARAVEL_API_URL=https://api.yourdomain.com/api
```

---

### **2. Start Backend (Laravel)**

```bash
cd backend
php artisan serve
```

Backend akan running di: `http://localhost:8000`

---

### **3. Start Frontend (Next.js)**

```bash
cd frontend
npm install
npm run dev
```

Frontend akan running di: `http://localhost:3000`

---

### **4. Test Login**

1. Buka: `http://localhost:3000/admin/login`
2. Login dengan kredensial default:
   - **Username:** `admin`
   - **Password:** `admin123`
3. Jika berhasil, Anda akan diarahkan ke Dashboard

---

## 📋 API Endpoints yang Digunakan

Frontend menggunakan endpoints berikut dari backend:

| Endpoint | Method | Auth | Used By |
|----------|--------|------|---------|
| `/api/auth/login` | POST | ❌ | Login Page |
| `/api/auth/logout` | POST | ✅ | Dashboard Logout |
| `/api/auth/me` | GET | ✅ | Dashboard Auth Check |
| `/api/galleries` | GET | ❌ | Gallery Pages |
| `/api/teams` | GET | ❌ | Team Section |
| `/api/packages` | GET | ❌ | Pricing Section |
| `/api/social` | GET | ❌ | Footer Social Links |
| `/api/upload` | POST | ✅ | Admin Image Upload |

---

## 🔐 Authentication Flow

### **Login Process:**

```typescript
// 1. User enters credentials
const response = await apiClient.login('admin', 'admin123');

// 2. If successful, token is saved to localStorage
if (response.success) {
  localStorage.setItem('auth_token', response.data.token);
}

// 3. Token is automatically added to all protected requests
// Header: Authorization: Bearer <token>
```

### **Protected Routes:**

```typescript
// Example: Upload image (requires auth)
const response = await apiClient.upload('/upload', formData);

// Example: Logout
await apiClient.logout();
```

---

## 📁 File Structure

```
frontend/
├── lib/
│   ├── api-client.ts          # API Client untuk Laravel
│   └── hooks/
│       ├── useSocialMedia.ts  # Fetch from /api/social
│       ├── useProjectGallery.ts # Fetch from /api/galleries
│       ├── useTeamMembers.ts  # Fetch from /api/teams
│       └── usePricePackages.ts # Fetch from /api/packages
└── .env.local                 # Environment variables
```

---

## 🎯 API Client Methods

### **Authentication:**
```typescript
apiClient.login(username, password)
apiClient.logout()
apiClient.getMe()
apiClient.isAuthenticated()
```

### **Data Fetching:**
```typescript
apiClient.get(endpoint)
apiClient.post(endpoint, body)
apiClient.put(endpoint, body)
apiClient.delete(endpoint)
```

### **File Upload:**
```typescript
const formData = new FormData();
formData.append('file', file);
formData.append('type', 'gallery');

await apiClient.upload('/upload', formData);
```

---

## 🔧 Customization

### **Change API Base URL:**

Edit `.env.local`:
```env
NEXT_PUBLIC_LARAVEL_API_URL=https://your-api-url.com/api
```

### **Add Custom Headers:**

Edit `lib/api-client.ts`:
```typescript
const defaultHeaders: Record<string, string> = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'X-Custom-Header': 'value', // Add here
};
```

---

## 🐛 Troubleshooting

### **Error: "Failed to fetch"**

**Penyebab:**
- Backend tidak running
- URL salah di `.env.local`
- CORS tidak dikonfigurasi

**Solusi:**
```bash
# 1. Pastikan backend running
cd backend
php artisan serve

# 2. Check .env.local
cat .env.local
# Harus ada: NEXT_PUBLIC_LARAVEL_API_URL=http://localhost:8000/api

# 3. Setup CORS di backend (config/cors.php)
return [
    'paths' => ['api/*'],
    'allowed_origins' => ['http://localhost:3000'],
    'allowed_methods' => ['*'],
    'allowed_headers' => ['*'],
];
```

---

### **Error: "401 Unauthorized"**

**Penyebab:**
- Token tidak valid
- Token expired
- Belum login

**Solusi:**
1. Logout dan login ulang
2. Check token di localStorage:
   ```javascript
   localStorage.getItem('auth_token')
   ```

---

### **Error: "CORS error"**

**Solusi di Backend:**

Edit `config/cors.php`:
```php
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000'], // Frontend URL
    'allowed_headers' => ['*'],
    'supports_credentials' => true,
];
```

Clear config cache:
```bash
php artisan config:clear
```

---

### **Images Not Uploading**

**Penyebab:**
- File terlalu besar (max 10MB)
- Folder storage tidak writable

**Solusi:**
```bash
# Set permissions
chmod -R 775 storage
chown -R www-data:www-data storage

# Create symlink
php artisan storage:link
```

---

## 📊 Data Flow

```
User Action
    ↓
React Component
    ↓
Custom Hook (useSocialMedia, etc.)
    ↓
API Client (api-client.ts)
    ↓
Laravel Backend API
    ↓
Database (SQLite/MySQL)
    ↓
Response JSON
    ↓
Update State
    ↓
Re-render UI
```

---

## ✅ Testing Checklist

### **Public Endpoints:**
- [ ] Homepage loads (fetches galleries, teams, packages, social)
- [ ] Gallery page displays images
- [ ] Team section shows members
- [ ] Pricing shows packages
- [ ] Footer shows social links

### **Protected Endpoints:**
- [ ] Admin login works
- [ ] Dashboard loads (auth check)
- [ ] Image upload works
- [ ] Logout works
- [ ] Token saved in localStorage

---

## 🚀 Deployment

### **Frontend (Next.js):**
```bash
npm run build
npm run start
```

### **Backend (Laravel):**
```bash
# Production mode
php artisan config:cache
php artisan route:cache
php artisan serve --host=0.0.0.0 --port=8000
```

### **Environment Variables Production:**

**Frontend `.env`:**
```env
NEXT_PUBLIC_LARAVEL_API_URL=https://api.yourdomain.com/api
```

**Backend `.env`:**
```env
APP_ENV=production
APP_DEBUG=false
DB_CONNECTION=mysql
DB_HOST=your-db-host
DB_DATABASE=your-db-name
DB_USERNAME=your-username
DB_PASSWORD=your-password
```

---

## 📖 API Documentation

Dokumentasi lengkap backend API ada di:
- `backend/v1-api/API_DOCUMENTATION.md`

---

## 🎯 Next Steps

1. ✅ Setup `.env.local` dengan API URL
2. ✅ Start Laravel backend
3. ✅ Start Next.js frontend
4. ✅ Test login dengan `admin` / `admin123`
5. ✅ Test semua fitur (galleries, teams, packages, upload)
6. ✅ Deploy ke production

---

**Happy Integrasi! 🚀**
