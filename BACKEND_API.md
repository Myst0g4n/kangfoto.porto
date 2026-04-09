# 📄 Backend Product Requirements Document (PRD)
**Project**: KangFoto Portfolio API  
**Version**: 1.0.0  
**Status**: Draft  
**Date**: 2024-02-26

---

## 1. Introduction
This document outlines the API requirements for the KangFoto Portfolio backend. The backend serves as the content management system (CMS) for the frontend Next.js application, handling authentication, data management, and media uploads.

---

## 2. Technology Stack Recommendations
- **Framework**: Laravel 11 (PHP 8.2+)
- **Database**: SQLite (Development) / MySQL or PostgreSQL (Production)
- **Authentication**: JWT (Tymon JWT package)
- **Image Handling**: Standard Storage / S3 Integration ready

---

## 3. Global Response Format
All API responses must follow this JSON structure:

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
  "error": "Error message description",
  "message": "Detailed error (optional)"
}
```

---

## 4. Authentication
Authentication is handled via Bearer Token in the `Authorization` header.

- **Header**: `Authorization: Bearer <token>`
- **Protected Routes**: `/auth/logout`, `/auth/me`, `POST/PUT/DELETE` on resources, `/admin/*`, `/upload`
- **Public Routes**: `/auth/login`, `GET` on resources, `/social`

---

## 5. API Endpoints & Data Models

### 5.1 Authentication Module
**Model**: `Admin`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | Integer | Yes | Primary key |
| `username` | String | Yes | Unique login username |
| `email` | String | Yes | Valid email address |
| `password` | String | Yes | Hashed password (Bcrypt) |
| `remember_token` | String | No | Session token |
| `created_at` | Timestamp | Yes | Record creation time |
| `updated_at` | Timestamp | Yes | Record update time |

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `POST` | `/api/auth/login` | Login | `{ "username": "string", "password": "string" }` | Token & User Object |
| `POST` | `/api/auth/logout` | Logout | None | Success Message |
| `GET` | `/api/auth/me` | Get Current User | None | User Object |

---

### 5.2 Galleries Module
**Model**: `Gallery`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | Integer | Yes | Primary key |
| `name` | String | Yes | Gallery title |
| `slug` | String | Yes | URL-friendly unique identifier |
| `description` | Text | No | Detailed description |
| `thumbnail` | String | Yes | Path to thumbnail image |
| `fullImage` | String | Yes | Path to full-size image |
| `is_show` | Boolean | No | Visibility flag (Default: true) |
| `date_added` | Date | Yes | Date of creation |
| `created_at` | Timestamp | Yes | Record creation time |
| `updated_at` | Timestamp | Yes | Record update time |

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/api/galleries` | List all galleries | Query: `?search=...` | List of Galleries (Sorted by `date_added` desc) |
| `POST` | `/api/galleries` | Create gallery | Gallery Object | Created Gallery Object |
| `PUT` | `/api/galleries/{id}` | Update gallery | Gallery Object | Updated Gallery Object |
| `DELETE` | `/api/galleries/{id}` | Delete gallery | None | Success Message |

---

### 5.3 Teams Module
**Model**: `Team`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | Integer | Yes | Primary key |
| `name` | String | Yes | Team member name |
| `experience` | Text | No | Description of experience |
| `quote` | Text | No | Personal quote/motto |
| `photo` | String | Yes | Path to member photo |
| `created_at` | Timestamp | Yes | Record creation time |
| `updated_at` | Timestamp | Yes | Record update time |

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/api/teams` | List all team members | None | List of Team Objects |
| `POST` | `/api/teams` | Create team member | Team Object | Created Team Object |
| `PUT` | `/api/teams/{id}` | Update team member | Team Object | Updated Team Object |
| `DELETE` | `/api/teams/{id}` | Delete team member | None | Success Message |

---

### 5.4 Packages Module
**Model**: `Package`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | Integer | Yes | Primary key |
| `title` | String | Yes | Package name/title |
| `description` | Text | No | Short description |
| `price` | String | Yes | Price display (e.g., "Rp 1.000.000") |
| `features` | JSON Array | No | List of feature strings |
| `note` | Text | No | Additional notes |
| `created_at` | Timestamp | Yes | Record creation time |
| `updated_at` | Timestamp | Yes | Record update time |

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/api/packages` | List all packages | None | List of Package Objects |
| `POST` | `/api/packages` | Create package | Package Object | Created Package Object |
| `PUT` | `/api/packages/{id}` | Update package | Package Object | Updated Package Object |
| `DELETE` | `/api/packages/{id}` | Delete package | None | Success Message |

---

### 5.5 Social Media Module
**Model**: `SocialMedia` (Single Row)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | Integer | Yes | Primary key |
| `facebook` | String (URL) | No | Facebook profile link |
| `instagram` | String (URL) | No | Instagram profile link |
| `tiktok` | String (URL) | No | TikTok profile link |
| `twitter` | String (URL) | No | Twitter/X profile link |
| `created_at` | Timestamp | Yes | Record creation time |
| `updated_at` | Timestamp | Yes | Record update time |

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/api/social` | Get social links | None | Social Object |
| `PUT` | `/api/social` | Update social links | Social Object | Updated Social Object |

---

### 5.6 Admin Configuration Module
**Model**: `Admin`

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/api/admin/config` | Get admin profile | None | Admin Object (No Password) |
| `PUT` | `/api/admin/config` | Update admin profile | `{ "username": "string", "email": "string", "password": "string" }` | Updated Admin Object |

---

### 5.7 Upload Module
**Model**: File System Storage

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `POST` | `/api/upload` | Upload image | Multipart: `{ "file": "image", "type": "gallery/team/thumbnail" }` | Object: `{ "originalPath": "...", "thumbnailPath": "...", "fileName": "...", "fileSize": 123, "fileType": "image/jpeg" }` |
| `DELETE` | `/api/upload` | Delete image | Query: `?path=/img/...` | Success Message |

---

## 6. Implementation Checklist
- [ ] Setup Laravel project and database connection
- [ ] Install `tymon/jwt-auth`
- [ ] Create Models and Migrations based on section 5
- [ ] Implement Controllers for each module
- [ ] Define Routes in `routes/api.php`
- [ ] Add CORS Middleware for `http://localhost:3000`
- [ ] Test endpoints with Postman/Thunder Client
- [ ] Deploy to server
