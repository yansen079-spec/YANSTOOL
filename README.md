# Yanstool.my.id Starter

Starter website static untuk Yanstool.

## Fitur aktif
- Responsive homepage
- Dark/light mode
- Search + category filters
- IPK Calculator
- Percentage Calculator
- Discount Calculator
- Word Counter
- Case Converter
- Random Name Picker
- Password Generator
- Storage Converter
- Yan AI UI siap dihubungkan ke endpoint `/api/ai`

## Cara jalankan
Bisa langsung buka `index.html`, atau deploy folder ini ke hosting static.

## AI
Frontend mengirim POST JSON ke `/api/ai`:

```json
{ "mode": "summarize", "input": "teks pengguna" }
```

Endpoint diharapkan mengembalikan:

```json
{ "output": "hasil AI" }
```

Jangan taruh API key di `app.js` atau browser. Simpan key di server/backend.

## Catatan audit dan pengujian manual (November 2026)

- Pencarian tools sekarang digabung dengan filter kategori, bukan saling menimpa.
- Reset modal tools tidak lagi mencoba mengiterasi satu elemen DOM.
- Percentage Calculator menolak pembagian dengan nol; Discount Calculator memvalidasi rentang 0–100%.
- IPK Calculator memvalidasi SKS positif dan nilai pada rentang 0–4.
- Edit subscription di Yan Vault kembali disimpan dalam format `YANVAULT:` agar countdown tidak hilang.
- Tanggal langganan yang tidak valid tidak lagi tampil sebagai `NaN hari`.
- Kegagalan jaringan saat login/daftar Vault kini menampilkan pesan dan mengaktifkan kembali tombol.

### Smoke test sebelum merge
1. Ketik pencarian pada halaman Tools lalu ganti kategori; pastikan kedua filter berlaku bersamaan.
2. Buka kalkulator, isi nilai, tekan Reset; pastikan modal tidak error.
3. Uji Percentage Calculator dengan pembagi 0, Discount dengan diskon 150, dan IPK dengan nilai 5.
4. Login ke Vault menggunakan akun pengujian, edit subscription dan simpan; pastikan countdown tetap tampil setelah refresh.
5. Putuskan koneksi internet ketika login; pastikan tombol login bisa dipakai kembali setelah gagal.

### Batas audit
Audit ini berbasis pembacaan source code dan pemeriksaan penggantian teks secara statis. Belum dilakukan tes end-to-end di browser maupun verifikasi kebijakan RLS terhadap project Supabase yang berjalan. Kunci `anon/publishable` Supabase memang boleh ada di frontend **jika** RLS diterapkan dengan benar; jangan taruh `service_role` atau secret server di sini. Endpoint `/api/ai` masih perlu backend bila hendak dipakai.
