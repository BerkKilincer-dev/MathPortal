# 🚀 Netlify Sürükle-Bırak Deploy Rehberi

## Adım 1: API Key Al

1. https://console.groq.com/ adresine git
2. Ücretsiz hesap oluştur (Google/GitHub ile)
3. "API Keys" → "Create API Key"
4. Key'i kopyala (örn: `gsk_...`)

✅ Tamamen ÜCRETSIZ! Kredi kartı gerekmez!

## Adım 2: Build Yap

PowerShell'de şu komutları çalıştır:

```powershell
# API Key'i set et (kendi key'ini yapıştır)
$env:API_KEY="AIzaSyA_KENDI_KEYIN_BURAYA"

# Build yap
npm run build
```

✅ Build başarılı olursa `dist` klasörü oluşacak!

## Adım 3: Netlify'a Sürükle-Bırak

1. https://app.netlify.com/drop adresine git
2. **`dist` klasörünü** sürükle-bırak yap (tüm projeyi değil!)
3. Birkaç saniye bekle
4. Link hazır! 🎉

---

## ⚠️ ÖNEMLİ NOTLAR

- **Sadece `dist` klasörünü** sürükle! (Proje klasörünü değil)
- Her güncelleme için tekrar build yapıp yeniden sürüklemelisin
- API key build'e gömülür (herkese açık olur - dikkatli ol!)

## 🔄 Güncellemeler İçin

Kod değişikliği yaptın mı? Tekrar:

```powershell
$env:API_KEY="YOUR_KEY"
npm run build
```

Sonra yeni `dist` klasörünü tekrar sürükle!

---

## 💡 Daha İyi Alternatif: Git ile Deploy

API key'in güvenliği için GitHub ile deploy daha iyi:

1. https://app.netlify.com → "Add new site"
2. "Import from Git" → GitHub repo seç
3. Environment Variables'a `API_KEY` ekle
4. Otomatik deploy! (Her push'ta güncellenir)

Bu yöntemle API key güvende kalır ve otomatik güncellenir!



