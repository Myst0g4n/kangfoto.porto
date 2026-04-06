# KangFoto Portfolio API Documentation

## Base URL
```
http://localhost:8000/api
```

## Authentication
All protected endpoints require a Bearer token in the `Authorization` header:
```
Authorization: Bearer <token>
```

### Default Admin Credentials (from seeder)
- **Username**: `admin`
- **Password**: `admin123`

---

## 🔐 Authentication Endpoints

### POST `/api/auth/login`
**Public** - Login to get access token.

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "1|...",
    "user": {
      "id": 1,
      "username": "admin",
      "email": "admin@kangfoto.com"
    }
  },
  "message": "Login successful"
}
```

### POST `/api/auth/logout`
**Protected** - Logout and invalidate current token.

### GET `/api/auth/me`
**Protected** - Get current authenticated user info.

---

## 🖼️ Galleries Endpoints

### GET `/api/galleries`
**Public** - List all galleries. Optional `?search=` query param.

### POST `/api/galleries`
**Protected** - Create new gallery.

**Request Body:**
```json
{
  "name": "Wedding Photography",
  "slug": "wedding-photography",
  "description": "Description here",
  "thumbnail": "/storage/path/thumb.jpg",
  "fullImage": "/storage/path/full.jpg",
  "is_show": true,
  "date_added": "2026-04-06"
}
```

### PUT `/api/galleries/{id}`
**Protected** - Update gallery.

### DELETE `/api/galleries/{id}`
**Protected** - Delete gallery.

---

## 👥 Teams Endpoints

### GET `/api/teams`
**Public** - List all team members.

### POST `/api/teams`
**Protected** - Create team member.

**Request Body:**
```json
{
  "name": "John Doe",
  "experience": "10 years experience",
  "quote": "My motto",
  "photo": "/storage/team/john.jpg"
}
```

### PUT `/api/teams/{id}`
**Protected** - Update team member.

### DELETE `/api/teams/{id}`
**Protected** - Delete team member.

---

## 📦 Packages Endpoints

### GET `/api/packages`
**Public** - List all packages.

### POST `/api/packages`
**Protected** - Create package.

**Request Body:**
```json
{
  "title": "Basic Package",
  "description": "Package description",
  "price": "Rp 1.000.000",
  "features": ["Feature 1", "Feature 2"],
  "note": "Additional notes"
}
```

### PUT `/api/packages/{id}`
**Protected** - Update package.

### DELETE `/api/packages/{id}`
**Protected** - Delete package.

---

## 🔗 Social Media Endpoints

### GET `/api/social`
**Public** - Get social media links.

### PUT `/api/social`
**Protected** - Update social media links.

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

## 📤 Upload Endpoints

### POST `/api/upload`
**Protected** - Upload image file.

**Request:** Multipart form data
- `file`: Image file (jpeg, png, jpg, gif, webp, max 10MB)
- `type`: One of `gallery`, `team`, `thumbnail`

**Response:**
```json
{
  "success": true,
  "data": {
    "originalPath": "/storage/gallery/image-123456.jpg",
    "thumbnailPath": "/storage/gallery/thumbnails/thumb-123456.jpg",
    "fileName": "image-123456.jpg",
    "fileSize": 123456,
    "fileType": "image/jpeg"
  },
  "message": "File uploaded successfully"
}
```

### DELETE `/api/upload?path=/storage/...`
**Protected** - Delete uploaded image.

---

## 🖼️ Public Image Access

All uploaded images are publicly accessible without authentication. Images are stored via Laravel's symbolic link at `/storage/`.

### URL Pattern
```
http://localhost:8000/storage/{path}
```

### Examples

| Type | Example URL |
|------|-------------|
| Gallery thumbnail | `http://localhost:8000/storage/galleries/anisa-and-imran-thumb.jpg` |
| Gallery full image | `http://localhost:8000/storage/galleries/anisa-and-imran.jpg` |
| Team photo | `http://localhost:8000/storage/team/Hasim.png` |

### How It Works

1. Files uploaded via `POST /api/upload` are saved to `storage/app/public/{type}/`
2. A symbolic link connects `public/storage` → `storage/app/public`
3. Any path returned in `originalPath` or `thumbnailPath` from the upload response can be prefixed with the base URL to access the image
4. **No authentication required** — images are public

### Response Format from API Endpoints

When you get data from galleries/teams endpoints, image paths are returned like this:

```json
{
  "thumbnail": "galleries/anisa-and-imran-thumb.jpg",
  "fullImage": "galleries/anisa-and-imran.jpg"
}
```

To display the image, prepend `/storage/`:
```html
<img src="http://localhost:8000/storage/galleries/anisa-and-imran-thumb.jpg" />
```

---

## ⚙️ Admin Config Endpoints

### GET `/api/admin/config`
**Protected** - Get admin profile.

### PUT `/api/admin/config`
**Protected** - Update admin profile.

**Request Body:**
```json
{
  "username": "newusername",
  "email": "new@email.com",
  "password": "newpassword",
  "password_confirmation": "newpassword"
}
```

---

## Global Response Format

### Success
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error
```json
{
  "success": false,
  "error": "Error message"
}
```

---

## Quick Start

1. Start the server:
```bash
php artisan serve
```

2. Login to get token:
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

3. Use token for protected requests:
```bash
curl -X GET http://localhost:8000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```
