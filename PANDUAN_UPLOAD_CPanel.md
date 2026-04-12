# 🚀 Panduan Upload ke Shared Hosting (cPanel)

Aplikasi ini sudah di-build menjadi file statis (HTML/CSS/JS) yang siap diupload ke File Manager cPanel.

---

## 📁 Folder yang Diupload

Cukup upload isi dari folder **`out/`** yang ada di direktori `frontend/`.
*(Jangan upload folder `out`-nya, tapi isi di dalamnya).*

---

## 📋 Langkah-langkah Upload

### **1. Persiapan di Komputer (Lokal)**

1.  Buka folder `C:\xampp\htdocs\kangfoto\portofolio\frontend\out`.
2.  **Select All** (`Ctrl + A`) file dan folder di dalamnya.
3.  **Klik Kanan** -> **Send to** -> **Compressed (zipped) folder**.
4.  Beri nama file tersebut: **`kangfoto-website.zip`**.

### **2. Upload ke cPanel**

1.  Login ke **cPanel** hosting Anda.
2.  Buka menu **File Manager**.
3.  Masuk ke folder **`public_html`** (atau folder `www` jika menggunakan add-on domain).
4.  **Hapus** file `default.html` atau `index.html` bawaan hosting jika ada.
5.  Klik tombol **Upload** di menu atas.
6.  Pilih file **`kangfoto-website.zip`** yang sudah dibuat tadi.
7.  Tunggu sampai upload selesai.
8.  Kembali ke File Manager, **Klik Kanan** pada `kangfoto-website.zip` -> **Extract**.
9.  Pastikan file-file ter-extract langsung di `public_html/` (bukan di subfolder).

### **3. Selesai!**

Buka domain Anda di browser (misal: `www.domainanda.com`). Website akan langsung tampil!

---

## ⚠️ PENTING: Koneksi ke Backend

Karena ini adalah **Static Build**, URL Backend API sudah "tertanam" (hardcoded) di dalam file Javascript saat proses build.

**Jika Backend Anda ada di Domain yang Sama (misal: `domainanda.com/api`):**
Pastikan di file `.env.local` sebelum build, Anda mengaturnya seperti ini:
```env
NEXT_PUBLIC_API_BASE_URL=https://domainanda.com
```
*(Tanpa /api di akhir)*.

**Jika Backend Anda di Subdomain (misal: `api.domainanda.com`):**
Pastikan `.env.local` sebelum build:
```env
NEXT_PUBLIC_API_BASE_URL=https://api.domainanda.com
```

Jika Anda salah mengatur URL ini saat build, Anda harus memperbaiki `.env.local` lalu melakukan **Build Ulang** (`npm run build`) dan **Upload Ulang** file zip-nya.

---

## 📂 Struktur Folder di `public_html`

Setelah extract, struktur folder Anda harus terlihat seperti ini:

```
public_html/
├── _next/             ← (Folder) File CSS & JS website
├── gallery/           ← (Folder) Halaman Gallery
├── img/               ← (Folder) Aset Gambar statis (jika ada)
├── index.html         ← (File) Homepage
├── 404.html           ← (File) Halaman Error
└── favicon.ico
```

---

## 🔍 Troubleshooting

**Gambar tidak muncul?**
- Cek Console browser. Jika errornya "Mixed Content", pastikan URL Backend di `.env.local` menggunakan `https://`.
- Pastikan gambar sudah diupload ke folder `uploads/` di dalam folder Backend Laravel Anda.

**Halaman 404 saat refresh?**
- Shared hosting biasanya tidak mendukung routing Next.js secara otomatis.
- Jika link galeri (misal `/gallery/wedding`) error 404 saat di-refresh, itu karena Next.js Static Export membuat link tersebut menjadi folder fisik. Pastikan link yang diklik sesuai dengan struktur folder hasil build.

---

**Selamat Mengupload! 🚀**
