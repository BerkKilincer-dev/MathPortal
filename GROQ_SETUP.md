# 🚀 Groq AI Kurulum Rehberi

MathPortal artık **Groq AI** kullanıyor! Gemini'den 100x daha hızlı ve tamamen ücretsiz! 🎉

## ⚡ Groq Nedir?

Groq, dünyanın en hızlı AI çıkarım platformudur:
- **Llama 3.3 70B** modeli kullanır (En yeni!)
- **LPU™ (Language Processing Unit)** teknolojisi
- Saniyede **750+ token** üretir (GPU'dan 10x hızlı!)
- Tamamen ÜCRETSIZ (günde 14,400 istek)

## 📝 API Key Nasıl Alınır? (2 Dakika!)

### Adım 1: Groq Console'a Git
👉 **https://console.groq.com/**

### Adım 2: Ücretsiz Hesap Oluştur
- "Sign Up" butonuna tıkla
- Google veya GitHub ile giriş yap
- ✅ Kredi kartı GEREKMİYOR!

### Adım 3: API Key Oluştur
1. Sol menüden **"API Keys"** sekmesine git
2. **"Create API Key"** butonuna tıkla
3. Key'e bir isim ver (örn: "MathPortal")
4. **"Submit"** tıkla
5. 🔑 Key'i kopyala (örnek: `gsk_...`)

### Adım 4: Key'i Projeye Ekle

**Lokal Geliştirme İçin:**
`.env.local` dosyası oluştur (proje klasöründe):
```
API_KEY=gsk_YOUR_KEY_HERE
```

**Vercel/Netlify Deploy İçin:**
Environment Variables bölümüne ekle:
- Key: `API_KEY`
- Value: `gsk_YOUR_KEY_HERE`

## 🎯 Groq vs Gemini

| Özellik | Groq | Gemini |
|---------|------|--------|
| **Hız** | 750 token/sn ⚡ | 50 token/sn |
| **Fiyat** | ÜCRETSIZ 🎁 | Ücretsiz Quota Sınırlı |
| **Günlük Limit** | 14,400 istek | Değişken |
| **Model** | Llama 3.1 70B | Gemini 1.5 Flash |
| **Kredi Kartı** | Gerekmez ✅ | Bazen gerekli |
| **503 Hataları** | Nadiren ❌ | Sık olur ⚠️ |

## 🔥 Hız Karşılaştırması

**Ders Planı Oluşturma:**
- Gemini: ~8-12 saniye
- Groq: **~1-2 saniye** 🚀

**Sınav Soruları:**
- Gemini: ~5-8 saniye
- Groq: **~0.5-1 saniye** ⚡

## 🛠️ Teknik Detaylar

**Model:** `llama-3.3-70b-versatile`
- 70 milyar parametre
- 128K context window
- JSON mode desteği
- Türkçe dil desteği mükemmel

## 📊 Kullanım Limitleri (Ücretsiz Tier)

- **Günlük:** 14,400 istek
- **Dakikalık:** 30 istek
- **Token/Dakika:** 6,000

MathPortal için bu limitler **çok fazla**! Normal kullanımda asla dolmaz.

## 🔒 Güvenlik

- API key'inizi asla GitHub'a commit etmeyin!
- `.env.local` dosyası `.gitignore`'da olmalı (zaten var)
- Vercel/Netlify'da Environment Variables kullanın

## 💡 İpuçları

1. **Hata Alırsanız:**
   - API key'in doğru kopyalandığından emin olun
   - `gsk_` ile başlamalı
   - Boşluk veya özel karakter içermemeli

2. **Rate Limit Aşarsanız:**
   - Birkaç saniye bekleyin
   - Normal kullanımda bu asla olmaz

3. **Yavaş Yanıt Alırsanız:**
   - İnternet bağlantınızı kontrol edin
   - Groq normalde çok hızlıdır!

## 🎓 Model Seçenekleri

Groq'da başka modeller de var:

```javascript
// Daha hızlı ama daha küçük:
model: "llama-3.1-8b-instant"

// Daha büyük ve daha güçlü (EN YENİ):
model: "llama-3.3-70b-versatile" // 👈 MathPortal bunu kullanıyor

// Gemma alternatifi:
model: "gemma2-9b-it"
```

## ❓ Sık Sorulan Sorular

**S: Gerçekten ücretsiz mi?**
A: Evet! Kredi kartı bile istemez.

**S: Production'da kullanabilir miyim?**
A: Evet! Groq üretim kullanımı destekliyor.

**S: Türkçe destekliyor mu?**
A: Evet! Llama 3.3 Türkçe'de mükemmel - 3.1'den daha iyi!

**S: API key'im expire oluyor mu?**
A: Hayır, siz silmediğiniz sürece kalıcı.

## 🆘 Yardım

Sorun mu yaşıyorsun?
- Groq Docs: https://console.groq.com/docs
- Groq Discord: https://groq.com/discord

## 🎉 Başlangıç

API key'ini aldıktan sonra:

```bash
# .env.local oluştur
echo "API_KEY=gsk_YOUR_KEY" > .env.local

# Uygulamayı başlat
npm run dev
```

Hepsi bu kadar! Artık süper hızlı AI asistanın hazır! 🚀

