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


## YANSTOOL Studio (studio.html)
Enam fitur baru:
1. **QR Code Studio:** QR link/teks dan format koneksi WiFi. Library QRCode dimuat via CDN.
2. **PDF Toolkit:** gabung beberapa PDF, ekstrak rentang halaman, atau gambar (PNG/JPG/WebP) menjadi PDF. Memakai pdf-lib via CDN. File maksimal 25 MB per file.
3. **Invoice Generator:** input seller, buyer, nomor invoice, item, diskon; preview dan simpan PDF lewat Print browser.
4. **Watermark Studio:** tempel watermark teks/logo ke gambar, opacity dan posisi, ekspor PNG.
5. **Social Media Cropper:** crop tengah dan geser untuk rasio 1:1, 4:5, 9:16, 16:9.
6. **Money Tracker:** simpan pemasukan/pengeluaran ke localStorage, hitung saldo, ekspor CSV, hapus data.

### Privasi dan batas fitur
- Input gambar, PDF, invoice dan transaksi tidak diunggah ke server oleh kode Studio. Library PDF/QR diunduh dari CDN, sehingga internet tetap diperlukan saat pertama dipakai.
- Money Tracker disimpan **hanya** pada browser/perangkat. Hapus data browser berarti transaksi hilang. Export CSV secara teratur. Bukan sistem akuntansi, bukan sinkronisasi multi-perangkat.
- Invoice hanya mencetak data yang dimasukkan pengguna. Tidak menerapkan perpajakan otomatis atau tanda tangan digital.
- PDF operasi bergantung pada memori browser dan tidak mendukung PDF terenkripsi.
- Watermark dan cropper memproses gambar menggunakan Canvas; metadata asli gambar tidak dipertahankan pada hasil PNG.

### Manual acceptance checklist
- [ ] Buka \`studio.html\` via localhost atau preview deployment; pindah keenam tab, termasuk viewport ponsel.
- [ ] QR teks/URL dan QR WiFi berhasil discan; unduh file PNG.
- [ ] Merge dua PDF; extract halaman \`1-2,4\`; konversi dua gambar menjadi satu PDF.
- [ ] Buat invoice dua item; diskon 10%; pastikan preview, print serta Save as PDF memuat total benar.
- [ ] Upload foto, tambahkan watermark teks lalu logo, cek posisi dan download.
- [ ] Crop gambar portrait ke 1:1 dan 16:9, ubah slider geser, cek file hasil.
- [ ] Buat transaksi pemasukan/pengeluaran; reload halaman, saldo tetap; export CSV dan hapus data.
- [ ] Cek DevTools Console: tidak ada error, uji di Chrome desktop dan mobile.
