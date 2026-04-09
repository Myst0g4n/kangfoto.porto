# 📘 KangFoto API Documentation

> **Version**: 2.1.0  
> **Base URL**: `http://localhost:8080/api`  
> **Last Updated**: 2026-04-09

---

## 📋 Table of Contents

- [Overview](#overview)
- [API Access Control (New)](#api-access-control)
- [Authentication](#authentication)
- [Response Format](#response-format)
- [API Endpoints](#api-endpoints)
  - [Authentication](#1-authentication)
  - [Galleries](#2-galleries)
  - [Teams](#3-teams)
  - [Packages](#4-packages)
  - [Social Media](#5-social-media)
  - [Upload](#6-upload)
  - [Admin Config](#7-admin-config)
  - [API Tokens](#8-api-tokens)
- [Error Handling](#error-handling)
- [Security & Rate Limiting](#security--rate-limiting)
- [Examples](#examples)

---

## 🔍 Overview

KangFoto API adalah RESTful API untuk mengelola portfolio fotografi. Sistem ini menggunakan **Database-driven Access Control** yang fleksibel, memungkinkan Anda mengatur endpoint mana yang bersifat Publik (tanpa token) dan mana yang Privat (wajib token) langsung dari Dashboard Admin.

### Jenis Token

| Type | Token Prefix | Default Access | Use Case |
|------|--------------|----------------|----------|
| **Admin Token** | Random hex | Full access | Admin dashboard & internal tools |
| **Public API Token** | `public_` | Read-only | Frontend website (Next.js, React) |
| **Private API Token** | `private_` | Full access | Third-party apps & mobile apps |

---

## 🛡️ API Access Control

Sistem ini memungkinkan Anda mengubah akses endpoint tanpa menyentuh file konfigurasi.

### Cara Mengatur Akses:
1. Login ke **Admin Dashboard**.
2. Masuk ke menu **Settings** → **API Access**.
3. Anda akan melihat daftar semua endpoint.
   - **Centang (Public):** Endpoint bisa diakses siapa saja (tanpa token).
   - **Lepas Centang (Protected):** Endpoint **WAJIB** menggunakan Bearer Token.
4. Klik **Save Access Rules**. Perubahan langsung berlaku.

### Status Default (Saat Instalasi)

| Endpoint | Method | Default Status | Keterangan |
|----------|--------|----------------|------------|
| `/api/galleries` | GET | 🟢 **Public** | Portfolio website |
| `/api/teams` | GET | 🟢 **Public** | Halaman "Our Team" |
| `/api/packages` | GET | 🟢 **Public** | Halaman Harga |
| `/api/social` | GET | 🟢 **Public** | Footer website |
| `/api/auth/login` | POST | 🟢 **Public** | Login admin |
| **Semua Lainnya** | POST/PUT/DELETE | 🔒 **Protected** | Hanya admin/token |

---

## 🔐 Authentication

Untuk endpoint yang berstatus **🔒 Protected**, sertakan header `Authorization`:

```http
Authorization: Bearer <your-token>
```

### Mendapatkan Token

#### **1. Admin Login**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "admin",
    "email": "admin@kangfoto.com",
    "token": "1096b59b829c835e17af948c..."
  },
  "message": "Login successful"
}
```

#### **2. Create API Token (Untuk Frontend/Apps)**
Login ke admin dashboard → **API Tokens** → **Create Token**.

- Pilih **Public** jika hanya untuk membaca data (GET).
- Pilih **Private** jika butuh akses penuh (Create/Update/Delete).

---

## 📦 Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "message": "Detailed error (optional)"
}
```

---

## 🌐 API Endpoints

### 1. Authentication

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/login` | 🟢 Public | Login admin |
| POST | `/api/auth/logout` | 🔒 Protected | Logout admin |
| GET | `/api/auth/me` | 🔒 Protected | Info profil admin |

**Login Request:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

---

### 2. Galleries

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/galleries` | 🟢 Public | List semua galeri |
| GET | `/api/galleries/{id}` | 🟢 Public | Detail satu galeri |
| POST | `/api/galleries` | 🔒 Protected | Buat galeri baru |
| PUT | `/api/galleries/{id}` | 🔒 Protected | Update galeri |
| DELETE | `/api/galleries/{id}` | 🔒 Protected | Hapus galeri |

**Query Parameters (GET):**
- `search`: Cari berdasarkan nama/deskripsi.

**Create/Update Body:**
```json
{
  "name": "Wedding Photography",
  "slug": "wedding-photography",
  "description": "Beautiful wedding moments",
  "thumbnail": "/uploads/gallery/thumb.jpg",
  "full_image": "/uploads/gallery/full.jpg",
  "is_show": true,
  "date_added": "2026-04-09"
}
```

---

### 3. Teams

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/teams` | 🟢 Public | List anggota tim |
| GET | `/api/teams/{id}` | 🟢 Public | Detail anggota tim |
| POST | `/api/teams` | 🔒 Protected | Tambah anggota |
| PUT | `/api/teams/{id}` | 🔒 Protected | Update anggota |
| DELETE | `/api/teams/{id}` | 🔒 Protected | Hapus anggota |

**Create/Update Body:**
```json
{
  "name": "John Doe",
  "experience": "10 years experience",
  "quote": "Capturing moments",
  "photo": "/uploads/team/john.jpg"
}
```

---

### 4. Packages

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/packages` | 🟢 Public | List paket layanan |
| GET | `/api/packages/{id}` | 🟢 Public | Detail paket |
| POST | `/api/packages` | 🔒 Protected | Buat paket baru |
| PUT | `/api/packages/{id}` | 🔒 Protected | Update paket |
| DELETE | `/api/packages/{id}` | 🔒 Protected | Hapus paket |

**Create/Update Body:**
```json
{
  "title": "Premium Package",
  "description": "Full day coverage",
  "price": "Rp 3.000.000",
  "features": [
    "Full day shooting",
    "200+ edited photos",
    "Premium album"
  ],
  "note": "Best value for weddings"
}
```

---

### 5. Social Media

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/social` | 🟢 Public | Info sosial media |
| PUT | `/api/social` | 🔒 Protected | Update link sosmed |

**Update Body:**
```json
{
  "facebook": "https://facebook.com/kangfoto",
  "instagram": "https://instagram.com/kangfoto",
  "tiktok": "https://tiktok.com/@kangfoto",
  "twitter": "https://twitter.com/kangfoto"
}
```

---

### 6. Upload

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/upload` | 🔒 Protected | Upload gambar |
| DELETE | `/api/upload` | 🔒 Protected | Hapus gambar |

**Upload Form Data:**
- `file`: (Required) File gambar.
- `type`: (Required) `gallery`, `team`, atau `thumbnail`.

---

### 7. Admin Config

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/admin/config` | 🔒 Protected | Info profil admin |
| PUT | `/api/admin/config` | 🔒 Protected | Update profil/password |

---

### 8. API Tokens (Manajemen Token)

> **Note**: Endpoint ini **SELALU** 🔒 **Protected** (Hanya Admin).

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tokens` | List semua token klien |
| POST | `/api/tokens` | Buat token baru |
| PUT | `/api/tokens/{id}` | Update token |
| DELETE | `/api/tokens/{id}` | Hapus token |
| POST | `/api/tokens/{id}/regenerate` | Regenerate token |
| POST | `/api/tokens/{id}/toggle` | Aktif/Nonaktifkan token |

---

## ❌ Error Handling

### HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Sukses |
| 201 | Created | Data berhasil dibuat |
| 400 | Bad Request | Request tidak valid |
| 401 | Unauthorized | Token tidak ada atau invalid |
| 403 | Forbidden | Token tidak punya izin untuk endpoint ini |
| 404 | Not Found | Data tidak ditemukan |
| 500 | Server Error | Kesalahan server |

### Contoh Error: Unauthorized (401)
```json
{
  "success": false,
  "error": "Unauthorized: No token provided"
}
```

---

## 🔒 Security & Rate Limiting

### Keamanan
1. **Password Hashing**: Bcrypt untuk semua password.
2. **CSRF Protection**: Aktif untuk form di dashboard.
3. **Input Validation**: Validasi ketat di setiap endpoint.

### Token Management
- Gunakan token **Public** untuk website frontend agar aman.
- Jangan expose token **Private** di sisi klien (browser).
- Gunakan fitur **Regenerate** di dashboard jika token bocor.

---

## 🎯 Examples

### JavaScript (Fetch Data Publik)
```javascript
const API_BASE = 'http://localhost:8080/api';

// Mengambil Galleries (Biasanya Public)
async function getGalleries() {
  const res = await fetch(`${API_BASE}/galleries`);
  const data = await res.json();
  return data.data;
}
```

### JavaScript (Create Data - Butuh Token)
```javascript
async function createGallery(galleryData) {
  const PRIVATE_TOKEN = 'private_xyz789...';
  
  const res = await fetch(`${API_BASE}/galleries`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PRIVATE_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(galleryData)
  });
  return await res.json();
}
```

---

## 📞 Support

**Dokumentasi Tambahan:**
- [API_README.md](API_README.md) - Original API documentation
- [ADMIN_DASHBOARD_README.md](ADMIN_DASHBOARD_README.md) - Admin dashboard guide
- [QUICK_START.md](QUICK_START.md) - Quick start guide

**Issues & Bugs:**
- Report di repository issues
- Email: support@kangfoto.com

---

**Last Updated**: 2026-04-09  
**API Version**: 2.1.0  
**Status**: ✅ Production Ready
