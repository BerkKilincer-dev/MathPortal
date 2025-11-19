# 🚀 Deployment Rehberi

Bu rehber, MathPortal projesini canlıya almak için adım adım talimatlar içerir.

## 📋 Ön Hazırlık

### 1. Groq API Key Alın (ZORUNLU - ÜCRETSIZ!)

Proje çalışması için Groq API key'e ihtiyacınız var:

1. https://console.groq.com/ adresine gidin
2. Google veya GitHub hesabınızla ücretsiz giriş yapın
3. **"API Keys"** > **"Create API Key"** tıklayın
4. Key'e bir isim verin ve **"Submit"** tıklayın
5. Key'i kopyalayın (güvenli bir yerde saklayın!)

✅ **AVANTAJLAR:**
- Tamamen ÜCRETSIZ (günde 14,400 istek!)
- Kredi kartı gerektirmez
- Süper hızlı (100x daha hızlı)
- Llama 3.3 70B - En güçlü ve en yeni açık kaynak model

⚠️ **ÖNEMLİ:** API key'inizi asla GitHub'a yüklemeyin!

### 2. GitHub'a Yükleyin

```bash
# Eğer henüz git init yapmadıysanız:
git init
git add .
git commit -m "Initial commit"

# GitHub'da yeni bir repo oluşturun ve ardından:
git remote add origin https://github.com/KULLANICI_ADI/REPO_ADI.git
git branch -M main
git push -u origin main
```

---

## 🟢 Seçenek 1: Vercel (TAVSİYE EDİLEN) ⚡

**Neden Vercel?**
- ✅ Tamamen ücretsiz
- ✅ 2 dakikada deploy
- ✅ Otomatik HTTPS
- ✅ Her commit otomatik deploy
- ✅ Global CDN
- ✅ Zero configuration

### Adımlar:

1. **Vercel Hesabı Oluşturun**
   - https://vercel.com adresine gidin
   - **"Sign Up"** > **"Continue with GitHub"** seçin
   - GitHub hesabınızla giriş yapın

2. **Projeyi Import Edin**
   - Dashboard'da **"Add New"** > **"Project"** tıklayın
   - GitHub repo'nuzdan **MathPortal**'ı seçin
   - **"Import"** butonuna tıklayın

3. **Environment Variables Ekleyin**
   - **"Environment Variables"** bölümüne tıklayın
   - Ekleyin:
     ```
     Key: API_KEY
     Value: (Groq API key'inizi buraya yapıştırın)
     ```
   - **"Add"** butonuna basın

4. **Deploy!**
   - **"Deploy"** butonuna tıklayın
   - 1-2 dakika bekleyin... ☕
   - Tebrikler! Siteniz hazır 🎉

5. **Link'inizi Alın**
   - Deploy tamamlandığında `https://math-portal-xxxx.vercel.app` gibi bir link alacaksınız
   - Bu linki paylaşabilirsiniz!

### 🔄 Güncellemeler

Vercel otomatik deploy yapar:
```bash
# Kod değişikliği yaptınız mı?
git add .
git commit -m "Değişiklik açıklaması"
git push
# Vercel otomatik olarak yeni versiyonu deploy eder!
```

---

## 🔵 Seçenek 2: Netlify

**Avantajları:**
- ✅ Ücretsiz
- ✅ Kolay kullanım
- ✅ Form handling
- ✅ Sürükle-bırak deploy

### Adımlar:

1. **Netlify Hesabı**
   - https://netlify.com adresine gidin
   - **"Sign Up"** > **GitHub ile giriş**

2. **Site Ekleyin**
   - **"Add new site"** > **"Import an existing project"**
   - **"GitHub"** seçin ve repo'nuzu bulun

3. **Build Settings** (Otomatik tespit edilecek)
   ```
   Build command: npm run build
   Publish directory: dist
   ```

4. **Environment Variables**
   - **"Show advanced"** > **"New variable"** tıklayın
   ```
   Key: API_KEY
   Value: (Gemini API key)
   ```

5. **Deploy Site**
   - Deploy butonuna basın
   - Link: `https://your-site-name.netlify.app`

---

## 🟠 Seçenek 3: GitHub Pages (Sadece Static)

⚠️ **NOT:** GitHub Pages environment variables desteklemez, bu yüzden API key'i build sırasında kodun içine gömerseniz herkes görebilir. **ÖNERİLMEZ!**

---

## 🔧 Manuel Deploy (Gelişmiş)

Kendi sunucunuza deploy etmek için:

### Build

```bash
# Environment variable'ı set edin
export API_KEY="your_gemini_api_key"

# Build yapın
npm run build
```

### Dosyaları Sunucuya Yükleyin

`dist` klasöründeki dosyaları sunucunuza yükleyin:

- **Nginx örnek config:**
```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/mathportal/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

- **Apache .htaccess:**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 🆘 Sorun Giderme

### "API Anahtarı bulunamadı" hatası

- Vercel/Netlify dashboard'da environment variable'ı kontrol edin
- Variable adının tam olarak `API_KEY` olduğundan emin olun
- Projeyi **redeploy** yapın (Settings > Deployments > Redeploy)

### Build hatası

```bash
# Local'de build test edin:
npm run build

# Bağımlılıkları güncelleyin:
npm install
```

### Site açılmıyor / 404 hatası

- SPA routing için `vercel.json` ve `netlify.toml` dosyalarının olduğundan emin olun
- Bu dosyalar zaten projede mevcut ✅

---

## 📊 Deploy Karşılaştırması

| Özellik | Vercel | Netlify | GitHub Pages |
|---------|--------|---------|--------------|
| Ücretsiz | ✅ | ✅ | ✅ |
| Kolay Kullanım | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Otomatik Deploy | ✅ | ✅ | ✅ |
| Environment Variables | ✅ | ✅ | ❌ |
| Custom Domain | ✅ | ✅ | ✅ |
| HTTPS | ✅ | ✅ | ✅ |
| Build Time | Hızlı | Hızlı | Orta |
| **ÖNERİ** | **✅ En İyi** | ✅ İyi | ⚠️ Bu proje için uygun değil |

---

## 🎉 Tamamlandı!

Deploy sonrası:
1. Sitenizi test edin
2. Link'i arkadaşlarınızla paylaşın
3. Geri bildirim toplayın
4. İyileştirmeler yapın ve push edin (otomatik deploy!)

**Yardıma mı ihtiyacınız var?** Issue açın: [GitHub Issues](https://github.com/yourusername/MathPortal/issues)



