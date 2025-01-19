# Library App

Aplikasi perpustakaan untuk pengelolaan peminjaman buku secara online, dibangun dengan teknologi backend menggunakan Node.js, Express, dan Prisma, serta frontend menggunakan Next.js dan Tailwind CSS.

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Project Setup](#project-setup)
   - [Backend](#backend)
   - [Frontend](#frontend)
3. [Running the Application](#running-the-application)
4. [Database Migrations](#database-migrations)
5. [Seeding the Database](#seeding-the-database)
6. [Notes](#notes)
7. [Conclusion](#conclusion)

---

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime environment untuk membangun aplikasi server-side.
- **Express.js**: Web framework untuk Node.js, digunakan untuk membangun RESTful API.
- **Prisma**: ORM (Object Relational Mapping) untuk interaksi dengan database PostgreSQL.
- **PostgreSQL**: Sistem manajemen database relasional.
- **npm**: JavaScript package manager untuk mengelola dependensi.

### Frontend
- **React**: Library JavaScript untuk membangun antarmuka pengguna (UI).
- **Next.js**: Framework React untuk server-side rendering dan pembuatan halaman statis.
- **Tailwind CSS**: Framework CSS utility-first untuk styling.
- **JavaScript**: Digunakan untuk scripting dan logika aplikasi sisi klien.

### Tools
- **Git**: Sistem kontrol versi untuk mengelola kode sumber.
- **Postman**: Alat untuk pengujian API (opsional).

---

## Project Setup

### 1. Backend (BE)

Backend adalah API REST yang dibangun dengan Express.js dan Prisma untuk interaksi dengan database PostgreSQL.

#### Langkah-langkah untuk Menyiapkan Backend:
1. Arahkan ke folder backend:
   ```bash
   cd backend
   ```

2. Instal dependensi untuk backend:
   ```bash
   npm install
   ```

3. Pastikan file `.env` Anda telah diatur dengan benar, berisi kredensial database.

4. Inisialisasi Prisma:
   ```bash
   npx prisma generate
   ```

### 2. Frontend (FE)

Frontend dibangun menggunakan Next.js dan React, dengan Tailwind CSS untuk styling.

#### Langkah-langkah untuk Menyiapkan Frontend:
1. Arahkan ke folder frontend:
   ```bash
   cd frontend
   ```

2. Instal dependensi untuk frontend:
   ```bash
   npm install
   ```

---

## Running the Application

Proyek ini dikelola secara terpisah untuk backend dan frontend, tetapi Anda dapat menjalankan keduanya secara bersamaan atau terpisah sesuai kebutuhan.

### Backend (BE)
Untuk menjalankan backend, gunakan perintah berikut:

- **Development**: Jalankan backend dalam mode pengembangan (hot reloading, dll.):
  ```bash
  npm run dev:be
  ```

- **Start**: Jalankan backend dalam mode produksi:
  ```bash
  npm run start:be
  ```

### Frontend (FE)
Untuk menjalankan frontend, gunakan perintah berikut:

- **Development**: Jalankan frontend dalam mode pengembangan:
  ```bash
  npm run dev:fe
  ```

- **Start**: Jalankan frontend dalam mode produksi:
  ```bash
  npm run start:fe
  ```

### Menjalankan Backend dan Frontend Secara Bersamaan
Untuk menjalankan backend dan frontend secara bersamaan, jalankan perintah berikut di terminal yang terpisah:

1. **Backend**:
   ```bash
   npm run dev:be
   ```

2. **Frontend**:
   ```bash
   npm run dev:fe
   ```

Ini akan menjalankan kedua aplikasi dalam mode pengembangan.

---

## Database Migrations

Untuk mengelola skema database, kami menggunakan Prisma untuk migrasi. Berikut adalah perintah untuk menjalankan migrasi database:

- **Jalankan Migrasi di Pengembangan**: Menerapkan semua migrasi yang tertunda di lingkungan pengembangan.
  ```bash
  npm run migrate:dev
  ```

- **Deploy Migrasi**: Menerapkan migrasi ke lingkungan produksi.
  ```bash
  npm run migrate:deploy
  ```

- **Reset Migrasi**: Mereset database dan menerapkan migrasi dari awal.
  ```bash
  npm run migrate:reset
  ```

- **Cek Status Migrasi**: Melihat status migrasi saat ini.
  ```bash
  npm run migrate:status
  ```

---

## Seeding the Database

Untuk mengisi database dengan data awal, Anda bisa melakukan seeding menggunakan perintah berikut:

- **Seed Database**:
  ```bash
  npm run seed
  ```

Ini akan menjalankan script seed Prisma untuk memasukkan data awal ke dalam database.

---

## Notes

- **Environment Variables**: Pastikan file `.env` Anda telah diatur dengan nilai yang sesuai untuk koneksi PostgreSQL dan konfigurasi lainnya. Contoh file `.env`:
  ```env
  DATABASE_URL="postgresql://postgres:mypassword@localhost:5432/mydb?schema=public"
  ```

- **Docker**: Aplikasi dapat dikontainerisasi menggunakan Docker untuk mempermudah deployment. Jika menggunakan Docker, pastikan Docker telah diinstal dan dikonfigurasi dengan benar.

---

## Conclusion

README ini memberikan langkah-langkah untuk menyiapkan, menjalankan, dan mengelola komponen backend dan frontend proyek. Jika Anda mengalami masalah, pastikan semua dependensi telah diinstal dengan benar dan file `.env` telah dikonfigurasi dengan tepat.