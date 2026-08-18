# JATIS FMCG Cloud Platform 🚀

**Platform komunikasi digital omnichannel untuk seluruh ekosistem FMCG Indonesia** — dari principal, distributor, hingga warung dan konsumen akhir.

Web SaaS demo (front-end penuh, tanpa backend) yang dibangun dari **MASTER PRD** (23 chapter + 5 appendix). Data mock realistis, interaktivitas penuh, dan siap di-deploy ke hosting statis apa pun (Netlify, Vercel, GitHub Pages).

---

## ✨ Fitur

| Modul | Deskripsi |
|---|---|
| 📊 **Dashboard** | KPI cards, grafik volume animasi, distribusi kanal, kesehatan channel, activity feed |
| 📡 **Channels** | Kelola WhatsApp Business / SMS / Email, status real-time, template approval |
| 🤖 **Chatbot Studio** | Visual flow builder, simulasi chat (tes intent: `cek stok`, `harga`, `order`, `cs`), knowledge base |
| 📣 **Kampanye** | Wizard 4 langkah (konten → segmen → jadwal → review), approval flow, tracking |
| 💬 **Agent Inbox** | Chat terpadu dengan context card, SLA timer, balasan instan |
| 🔐 **OTP Service** | Simulasi kirim/verifikasi OTP, rate limit, riwayat |
| 🏆 **Loyalty & Trade** | Member, poin, klaim insentif (approve/reject/review), deteksi fraud |
| 📈 **Analytics** | Performa kampanye, metrik CS, biaya per produk, ekspor CSV |
| 💳 **Billing & Usage** | Kuota real-time, usage bars, invoice, top-up |
| 🛡️ **Content Safety** | Antrian moderasi L0–L4, approve/block |
| 🖥️ **Admin Console** | Tenant management, KPI platform, fraud & anomaly (Super Admin) |
| ⚙️ **Pengaturan** | Tim & role, keamanan (MFA), API keys, webhooks |

**Bonus:** landing page spektakuler (hero dengan demo chat animasi, fitur, skenario, pricing toggle, testimoni), command palette (`⌘K`), mode demo 1-klik, dan responsive mobile-first.

## 🚀 Cara Menjalankan

```bash
# Opsi 1 — langsung buka index.html di browser
open index.html

# Opsi 2 — server lokal
python3 -m http.server 8080
# buka http://localhost:8080
```

## 🔑 Mode Demo

Klik **"Masuk sebagai Demo (PT Makanan Nusantara)"** di halaman login — langsung masuk sebagai Company Admin dengan data lengkap.

## 🧪 Coba Ini

- **Chatbot Studio** → ketik `cek stok` / `harga` / `order` di simulasi chat
- **Kampanye** → buat kampanye baru, ikuti wizard 4 langkah
- **Loyalty & Trade** → setujui/tolak klaim insentif
- **Content Safety** → approve/block antrian moderasi
- **Top-up** → simulasi pembayaran VA
- **`⌘K`** → command palette

## 🛠️ Teknologi

- HTML5 + CSS3 (design system custom, glassmorphism, aurora background)
- Vanilla JavaScript (zero dependency, tanpa framework)
- Chart engine SVG custom (area, donut, bar) — tanpa library eksternal
- localStorage untuk session (demo)

## 🏢 Tentang

Produk demo dari **PT Informasi Teknologi Indonesia Tbk (JATI)** — terdaftar di Bursa Efek Indonesia, partner resmi WhatsApp Business Solution Provider sejak 2018, ISO 9001 & ISO 27001.

> ⚠️ Versi ini adalah demo front-end. Integrasi backend (REST API, webhook, WhatsApp Business API, SMS gateway, payment) mengikuti spesifikasi pada **MASTER PRD JATIS Mobile FMCG Cloud Platform v1.0**.
