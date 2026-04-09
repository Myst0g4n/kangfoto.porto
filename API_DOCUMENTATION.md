# 📘 KangFoto Portfolio API Documentation

> **Version**: 2.2.0  
> **Base URL**: `http://localhost:8080/api`  
> **Last Updated**: 2026-04-10

---

## 📋 Table of Contents

- [Overview](#overview)
- [Authentication Rules](#authentication-rules)
- [Image & Media Guidelines](#image--media-guidelines)
- [API Endpoints](#api-endpoints)
  - [Authentication](#1-authentication)
  - [Galleries](#2-galleries)
  - [Teams](#3-teams)
  - [Packages](#4-packages)
  - [Social Media](#5-social-media)
  - [Upload](#6-upload)
  - [Admin Config](#7-admin-config)
- [Error Handling](#error-handling)
- [Examples (Frontend Integration)](#examples-frontend-integration)

---

## 🔍 Overview

KangFoto API adalah RESTful API untuk mengelola portfolio fotografi. Sistem ini dirancang agar **frontend website** Anda bisa mengambil data dengan mudah, sementara **data management** sepenuhnya dilakukan melalui Admin Dashboard.

**Fitur Utama:**
- ✅ **Public Access**: Endpoint `GET` bersifat publik (tidak butuh token).
- ✅ **Protected Access**: Endpoint `POST`, `PUT`, `DELETE` memerlukan Admin Token.
- ✅ **Image Handling**: Sistem upload gambar terintegrasi dengan path yang konsisten.

---

## 🔐 Authentication Rules

Sistem ini menggunakan aturan akses sederhana:

| Method | Status | Keterangan |
|--------|--------|------------|
| **GET** | 🟢 **Public** | Bisa diakses siapa saja (untuk menampilkan data di website). |
| **POST / PUT / DELETE** | 🔒 **Protected** | Wajib menggunakan Token Admin (hanya untuk Dashboard/CMS). |

### Cara Menggunakan Token (Untuk Aksi Edit/Hapus)
Jika Anda menguji API via Postman atau sistem lain untuk mengubah data, sertakan header ini:
```http
Authorization: Bearer YOUR_ADMIN_TOKEN
```
*Token bisa didapatkan setelah login melalui endpoint `/api/auth/login`.*

---

## 🖼️ Image & Media Guidelines

Panduan ini penting agar gambar yang ditampilkan di frontend website Anda muncul dengan benar.

### 1. Aturan Path Gambar
Semua path gambar disimpan sebagai **relative path** dimulai dari root website.

- **Contoh Path di Database:** `/uploads/gallery/nama_file.jpg`
- **Cara Pakai di Frontend:** Gabungkan dengan Base URL Anda.

```javascript
// Jika Base URL API Anda adalah:
const BASE_URL = 'http://localhost:8080';

// Dan data dari API memberikan path:
const thumbnailPath = data.thumbnail; // Hasil: "/uploads/gallery/wedding.jpg"

// Maka URL lengkap untuk tag <img> adalah:
const fullUrl = BASE_URL + thumbnailPath; 
// Hasil: "http://localhost:8080/uploads/gallery/wedding.jpg"
```

### 2. Tipe File yang Diizinkan
Sistem hanya menerima file gambar berikut:
- ✅ JPG / JPEG
- ✅ PNG
- ✅ GIF
- ✅ WEBP

### 3. Cara Upload Gambar (Untuk Admin)
Jangan mengupload gambar langsung saat membuat Gallery atau Team. Gunakan alur berikut:

1. **Upload File terlebih dahulu** via endpoint `POST /api/upload`.
2. **Ambil path hasil upload** dari response (`data.originalPath`).
3. **Gunakan path tersebut** saat membuat/mengupdate Gallery atau Team.

---

## 🌐 API Endpoints

### 1. Authentication
Digunakan oleh Admin Dashboard untuk mendapatkan token.

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/login` | 🟢 Public | Login admin |
| POST | `/api/auth/logout` | 🔒 Protected | Logout admin |
| GET | `/api/auth/me` | 🔒 Protected | Info profil admin |

**Request Body (Login):**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

---

### 2. Galleries
Endpoint untuk mengelola portfolio foto.

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/galleries` | 🟢 Public | List semua galeri |
| GET | `/api/galleries/{id}` | 🟢 Public | Detail satu galeri |
| POST | `/api/galleries` | 🔒 Protected | Buat galeri baru |
| PUT | `/api/galleries/{id}` | 🔒 Protected | Update galeri |
| DELETE | `/api/galleries/{id}` | 🔒 Protected | Hapus galeri |

**Query Parameters (GET):**
- `search`: Mencari galeri berdasarkan nama atau deskripsi.

**Request Body (POST/PUT):**
```json
{
  "name": "Wedding Photography",
  "slug": "wedding-photography",
  "description": "Momen indah pernikahan...",
  "thumbnail": "/uploads/gallery/thumb_123.jpg", 
  "full_image": "/uploads/gallery/full_123.jpg",
  "is_show": true,
  "date_added": "2026-04-09"
}
```

---

### 3. Teams
Endpoint untuk mengelola data anggota tim fotografi.

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/teams` | 🟢 Public | List anggota tim |
| GET | `/api/teams/{id}` | 🟢 Public | Detail anggota tim |
| POST | `/api/teams` | 🔒 Protected | Tambah anggota |
| PUT | `/api/teams/{id}` | 🔒 Protected | Update anggota |
| DELETE | `/api/teams/{id}` | 🔒 Protected | Hapus anggota |

**Request Body (POST/PUT):**
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
Endpoint untuk mengelola daftar harga paket layanan.

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/packages` | 🟢 Public | List paket layanan |
| GET | `/api/packages/{id}` | 🟢 Public | Detail paket |
| POST | `/api/packages` | 🔒 Protected | Buat paket baru |
| PUT | `/api/packages/{id}` | 🔒 Protected | Update paket |
| DELETE | `/api/packages/{id}` | 🔒 Protected | Hapus paket |

**Request Body (POST/PUT):**
```json
{
  "title": "Premium Package",
  "description": "Full day coverage",
  "price": "Rp 3.000.000",
  "features": [
    "Full day shooting",
    "200+ edited photos"
  ],
  "note": "Best value for weddings"
}
```

---

### 5. Social Media
Endpoint untuk informasi link sosial media.

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/social` | 🟢 Public | Info sosial media |
| PUT | `/api/social` | 🔒 Protected | Update link sosmed |

**Request Body (PUT):**
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
Endpoint untuk mengupload gambar ke server.

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/upload` | 🔒 Protected | Upload gambar |
| DELETE | `/api/upload` | 🔒 Protected | Hapus gambar |

**Form Data (POST):**
- `file`: (Required) File gambar.
- `type`: (Required) Folder tujuan (`gallery`, `team`, atau `thumbnail`).

**Response Upload:**
```json
{
  "success": true,
  "data": {
    "originalPath": "/uploads/gallery/gallery_12345.jpg",
    "thumbnailPath": "/uploads/gallery/thumb_gallery_12345.jpg",
    "fileName": "gallery_12345.jpg",
    "fileSize": 245678,
    "fileType": "image/jpeg"
  },
  "message": "File uploaded successfully"
}
```

---

### 7. Admin Config
Endpoint untuk pengelolaan profil admin.

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/admin/config` | 🔒 Protected | Info profil admin |
| PUT | `/api/admin/config` | 🔒 Protected | Update profil/password |

---

## ❌ Error Handling

### HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Sukses |
| 201 | Created | Data berhasil dibuat |
| 400 | Bad Request | Request tidak valid |
| 401 | Unauthorized | Token tidak ada atau invalid |
| 403 | Forbidden | Token tidak punya izin |
| 404 | Not Found | Data tidak ditemukan |
| 500 | Server Error | Kesalahan server |

---

## 🎯 Examples (Frontend Integration)

Contoh implementasi pada website (Next.js / React / Vanilla JS).

### 1. Fetching Galleries & Menampilkan Gambar
```javascript
const BASE_URL = 'http://localhost:8080';

async function loadGalleries() {
  try {
    // 1. Fetch Data (Public - No Token Needed)
    const res = await fetch(`${BASE_URL}/api/galleries`);
    const json = await res.json();
    
    if (json.success) {
      // 2. Render Data
      json.data.forEach(item => {
        // Gabungkan Base URL dengan path gambar dari database
        const fullImageSrc = BASE_URL + item.full_image;
        
        console.log(`Menampilkan: ${item.name}`);
        // <img src="${fullImageSrc}" alt="${item.name}" />
      });
    }
  } catch (error) {
    console.error("Gagal memuat galeri:", error);
  }
}
```

### 2. Fetching Packages
```javascript
async function getPackages() {
  const res = await fetch('http://localhost:8080/api/packages');
  const data = await res.json();
  return data.data; // Array of packages
}
```

---

## 📞 Support

**Dokumentasi Tambahan:**
- [README.md](README.md) - Project overview
- [QUICK_START.md](QUICK_START.md) - Quick start guide

**Issues & Bugs:**
- Report di repository issues
- Email: support@kangfoto.com

---

**Last Updated**: 2026-04-10  
**API Version**: 2.2.0  
**Status**: ✅ Production Ready