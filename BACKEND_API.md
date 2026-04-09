# 📘 KangFoto API Documentation

> **Version**: 2.0.0  
> **Base URL**: `http://localhost:8080/api`  
> **Last Updated**: 2026-04-09

---

## 📋 Table of Contents

- [Overview](#overview)
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
- [Rate Limiting](#rate-limiting)
- [Examples](#examples)

---

## 🔍 Overview

KangFoto API adalah RESTful API untuk mengelola portfolio fotografi. API ini mendukung dua jenis autentikasi:

| Type | Token Prefix | Access | Use Case |
|------|--------------|--------|----------|
| **Admin Token** | Random hex | Full access | Admin dashboard |
| **Public API Token** | `public_` | GET only | Frontend website |
| **Private API Token** | `private_` | Full access | Third-party apps |

---

## 🔐 Authentication

Semua endpoint yang memerlukan autentikasi menggunakan header `Authorization`:

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

#### **2. Create API Token**
Login ke admin dashboard → **API Tokens** → **Create Token**

Pilih type:
- **Public**: Read-only (GET endpoints)
- **Private**: Full access (semua HTTP methods)

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

### Validation Error (422)
```json
{
  "success": false,
  "error": "Validation failed",
  "message": "Name is required, Slug already exists"
}
```

---

## 🌐 API Endpoints

### 1. Authentication

#### Login
```http
POST /api/auth/login
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

---

### 2. Galleries

#### List All Galleries
```http
GET /api/galleries
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `search` | string | No | Search by name/description |

**Example:**
```bash
curl -X GET "http://localhost:8080/api/galleries?search=wedding"
```

#### Get Single Gallery
```http
GET /api/galleries/{id}
```

#### Create Gallery
```http
POST /api/galleries
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
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

#### Update Gallery
```http
PUT /api/galleries/{id}
Authorization: Bearer <token>
Content-Type: application/json
```

#### Delete Gallery
```http
DELETE /api/galleries/{id}
Authorization: Bearer <token>
```

---

### 3. Teams

#### List All Team Members
```http
GET /api/teams
```

#### Get Single Team Member
```http
GET /api/teams/{id}
```

#### Create Team Member
```http
POST /api/teams
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "experience": "10 years experience",
  "quote": "Capturing moments",
  "photo": "/uploads/team/john.jpg"
}
```

#### Update Team Member
```http
PUT /api/teams/{id}
Authorization: Bearer <token>
Content-Type: application/json
```

#### Delete Team Member
```http
DELETE /api/teams/{id}
Authorization: Bearer <token>
```

---

### 4. Packages

#### List All Packages
```http
GET /api/packages
```

#### Get Single Package
```http
GET /api/packages/{id}
```

#### Create Package
```http
POST /api/packages
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
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

#### Update Package
```http
PUT /api/packages/{id}
Authorization: Bearer <token>
Content-Type: application/json
```

#### Delete Package
```http
DELETE /api/packages/{id}
Authorization: Bearer <token>
```

---

### 5. Social Media

#### Get Social Links
```http
GET /api/social
```

#### Update Social Links
```http
PUT /api/social
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
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

#### Upload Image
```http
POST /api/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | file | Yes | Image file (jpg, jpeg, png, gif, webp) |
| `type` | string | Yes | `gallery`, `team`, atau `thumbnail` |

**Example:**
```bash
curl -X POST http://localhost:8080/api/upload \
  -H "Authorization: Bearer <token>" \
  -F "file=@/path/to/image.jpg" \
  -F "type=gallery"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "originalPath": "/uploads/gallery/gallery_1234567890_abc123.jpg",
    "thumbnailPath": "/uploads/gallery/thumb_gallery_1234567890_abc123.jpg",
    "fileName": "gallery_1234567890_abc123.jpg",
    "fileSize": 245678,
    "fileType": "image/jpeg"
  },
  "message": "File uploaded successfully"
}
```

#### Delete Image
```http
DELETE /api/upload?path=/uploads/gallery/image.jpg
Authorization: Bearer <token>
```

---

### 7. Admin Config

#### Get Admin Profile
```http
GET /api/admin/config
Authorization: Bearer <token>
```

#### Update Admin Profile
```http
PUT /api/admin/config
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "newadmin",
  "email": "newadmin@kangfoto.com",
  "password": "newpassword123"
}
```

---

### 8. API Tokens

> **Note**: Semua endpoint ini memerlukan **Admin Authentication**

#### List All Tokens
```http
GET /api/tokens
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "client_name": "Mobile App",
      "token": "public_abc123...",
      "token_type": "public",
      "permissions": ["/api/galleries", "/api/teams"],
      "is_active": 1,
      "expires_at": "2027-01-01 00:00:00",
      "last_used_at": "2026-04-09 10:30:00",
      "created_at": "2026-04-09 09:00:00",
      "updated_at": "2026-04-09 09:00:00"
    }
  ],
  "message": "API tokens retrieved successfully"
}
```

#### Get Single Token
```http
GET /api/tokens/{id}
Authorization: Bearer <admin-token>
```

#### Create API Token
```http
POST /api/tokens
Authorization: Bearer <admin-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "client_name": "Frontend Website",
  "token_type": "public",
  "permissions": ["/api/galleries", "/api/teams", "/api/packages"],
  "is_active": true,
  "expires_at": "2027-12-31 23:59:59"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "client_name": "Frontend Website",
    "token": "public_def456789...",
    "token_type": "public",
    "permissions": ["/api/galleries", "/api/teams", "/api/packages"],
    "is_active": 1,
    "expires_at": "2027-12-31 23:59:59",
    "last_used_at": null,
    "created_at": "2026-04-09 10:00:00",
    "updated_at": "2026-04-09 10:00:00"
  },
  "message": "API token created successfully"
}
```

#### Update Token
```http
PUT /api/tokens/{id}
Authorization: Bearer <admin-token>
Content-Type: application/json
```

#### Delete Token
```http
DELETE /api/tokens/{id}
Authorization: Bearer <admin-token>
```

#### Regenerate Token
```http
POST /api/tokens/{id}/regenerate
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "public_newtoken123..."
  },
  "message": "Token regenerated successfully"
}
```

#### Toggle Token Status
```http
POST /api/tokens/{id}/toggle
Authorization: Bearer <admin-token>
```

---

## ❌ Error Handling

### HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Success |
| 201 | Created | Resource created |
| 400 | Bad Request | Invalid request |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 422 | Unprocessable | Validation error |
| 500 | Server Error | Internal error |

### Error Response Examples

#### Unauthorized (401)
```json
{
  "success": false,
  "error": "Unauthorized: No token provided"
}
```

#### Forbidden (403)
```json
{
  "success": false,
  "error": "Forbidden: Insufficient permissions"
}
```

#### Validation Error (422)
```json
{
  "success": false,
  "error": "Validation failed",
  "message": "Name is required, Slug already exists"
}
```

---

## 🎯 Examples

### Frontend Integration (JavaScript)

```javascript
// Get galleries with public token
const API_BASE = 'http://localhost:8080/api';
const API_TOKEN = 'public_abc123...';

async function getGalleries() {
  const res = await fetch(`${API_BASE}/galleries`, {
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`
    }
  });
  const data = await res.json();
  return data.data;
}

// Create gallery with private token
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

// Upload image
async function uploadImage(file, type) {
  const PRIVATE_TOKEN = 'private_xyz789...';
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);
  
  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PRIVATE_TOKEN}`
    },
    body: formData
  });
  return await res.json();
}
```

### Frontend Integration (Next.js)

```javascript
// app/api/galleries/route.js
export async function GET() {
  const res = await fetch('http://localhost:8080/api/galleries', {
    headers: {
      'Authorization': `Bearer ${process.env.API_TOKEN}`
    },
    cache: 'no-store'
  });
  
  const data = await res.json();
  return Response.json(data);
}
```

### cURL Examples

```bash
# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Get galleries
curl -X GET http://localhost:8080/api/galleries \
  -H "Authorization: Bearer YOUR_TOKEN"

# Create gallery
curl -X POST http://localhost:8080/api/galleries \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Gallery",
    "slug": "test-gallery",
    "thumbnail": "/uploads/gallery/thumb.jpg",
    "full_image": "/uploads/gallery/full.jpg",
    "is_show": true,
    "date_added": "2026-04-09"
  }'

# Upload file
curl -X POST http://localhost:8080/api/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@photo.jpg" \
  -F "type=gallery"
```

---

## 🔒 Security Best Practices

### Token Management

1. **Jangan expose token di client-side code**
   ```javascript
   // ❌ JANGAN - Token terlihat di browser
   const TOKEN = 'private_abc123...';
   
   // ✅ BENAR - Gunakan backend proxy
   const res = await fetch('/api/proxy/galleries');
   ```

2. **Gunakan permission yang spesifik**
   ```json
   // ❌ Terlalu luas
   {
     "permissions": ["*"]
   }
   
   // ✅ Spesifik
   {
     "permissions": [
       "GET:/api/galleries",
       "GET:/api/teams"
     ]
   }
   ```

3. **Set expiration date**
   ```json
   {
     "expires_at": "2027-12-31 23:59:59"
   }
   ```

4. **Regenerate token secara berkala**
   ```bash
   curl -X POST http://localhost:8080/api/tokens/{id}/regenerate \
     -H "Authorization: Bearer <admin-token>"
   ```

### CORS Configuration

API sudah mendukung CORS. Untuk production, update di `app/Filters/Cors.php`:

```php
$response->setHeader('Access-Control-Allow-Origin', 'https://yourdomain.com');
```

---

## 📊 Rate Limiting

Saat ini API belum menerapkan rate limiting. Untuk production, pertimbangkan:

```php
// Di filter
$maxRequests = 100;
$window = 3600; // 1 jam

// Implementasi dengan cache
$cache = \Config\Services::cache();
$key = 'api_rate_' . $token;
$count = $cache->get($key) ?: 0;

if ($count > $maxRequests) {
    return response()->setJSON([
        'success' => false,
        'error' => 'Rate limit exceeded'
    ])->setStatusCode(429);
}

$cache->save($key, $count + 1, $window);
```

---

## 🧪 Testing

### Postman Collection

Import collection ini untuk testing:

```json
{
  "info": {
    "name": "KangFoto API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [{"key": "Content-Type", "value": "application/json"}],
            "body": {
              "mode": "raw",
              "raw": "{\"username\":\"admin\",\"password\":\"admin123\"}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/auth/login",
              "host": ["{{baseUrl}}"],
              "path": ["api", "auth", "login"]
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {"key": "baseUrl", "value": "http://localhost:8080"}
  ]
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
**API Version**: 2.0.0  
**Status**: ✅ Production Ready
