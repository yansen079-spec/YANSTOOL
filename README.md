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
