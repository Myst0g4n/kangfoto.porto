# 📸 KangFoto Portfolio - Frontend

Website portfolio fotografi modern berbasis **Next.js 16** dengan integrasi API backend.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
# Copy file environment
cp .env.example .env.local

# Edit .env.local sesuai konfigurasi Anda
# NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

### 3. Run Development Server
```bash
npm run dev
```

Website akan berjalan di: **http://localhost:3000**

---

## 📁 Struktur Folder

```
frontend/
├── app/                    # Next.js App Router
│   ├── components/         # UI Components
│   ├── gallery/            # Gallery page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── lib/                    # Utilities & Hooks
│   ├── api-client.ts       # API client untuk backend
│   ├── cache.ts            # LocalStorage caching
│   └── hooks/              # Custom React hooks
├── public/                 # Static assets
├── docs/                   # Dokumentasi
│   ├── API_DOCUMENTATION.md
│   └── API_INTEGRATION_GUIDE.md
├── .env.local              # Environment variables (tidak di-commit)
├── .env.example            # Template environment
├── next.config.js          # Next.js configuration (proxy API)
└── package.json
```

---

## 🔧 Tech Stack

- **Framework**: Next.js 16.1.4 (Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks + LocalStorage Cache
- **API Integration**: REST API dengan Proxy (Rewrites)

---

## 🌐 API Integration

Frontend ini terhubung ke backend Laravel API. Lihat dokumentasi lengkap di:

- **API Documentation**: `docs/API_DOCUMENTATION.md`
- **Integration Guide**: `docs/API_INTEGRATION_GUIDE.md`

---

## 📦 Build untuk Production

```bash
npm run build
npm run start
```

---

## 🔑 Default Admin Login

- **URL**: `/admin/login`
- **Username**: `admin`
- **Password**: `admin123`

⚠️ **Ganti password setelah login pertama!**

---

## 📖 Dokumentasi Lainnya

Lihat folder `docs/` untuk panduan lengkap.

---

**Version**: 2.0  
**Last Updated**: 2026-04-09  
**Status**: ✅ Production Ready
