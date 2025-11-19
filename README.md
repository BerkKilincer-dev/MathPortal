<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🎓 MathPortal - Matematik Asistanı

Öğretmenler için AI destekli matematik öğretim platformu. Ders planları oluşturun, öğrenci takibi yapın ve otomatik sınav soruları üretin.

## ✨ Özellikler

- 🤖 **AI Ders Planı Oluşturma** - Groq AI (Llama 3.3 70B) ile otomatik ders planları
- 📝 **Sınav Oluşturucu** - Konuya özel matematik soruları
- 👨‍🎓 **Öğrenci Takibi** - İlerleme ve performans izleme
- 📊 **Dashboard** - Görsel raporlar ve istatistikler
- ⚡ **Süper Hızlı** - Groq'un LPU™ teknolojisi ile anında yanıt

## 🚀 Yerel Kurulum

**Gereksinimler:** Node.js 18+

1. Projeyi klonlayın
2. Bağımlılıkları kurun:
   ```bash
   npm install
   ```
3. `.env.local` dosyası oluşturun ve Groq API Key'inizi ekleyin:
   ```
   API_KEY=your_groq_api_key_here
   ```
   API Key için: https://console.groq.com/ (Tamamen ÜCRETSIZ!)
4. Uygulamayı çalıştırın:
   ```bash
   npm run dev
   ```

## 🌐 Deploy (Canlıya Alma)

### Vercel ile Deploy (Önerilen) ⚡

1. [Vercel](https://vercel.com) hesabı oluşturun (GitHub ile giriş yapın)
2. "Add New Project" > GitHub repo'nuzu seçin
3. Environment Variables bölümüne:
   - **Key:** `API_KEY`
   - **Value:** `your_gemini_api_key`
4. Deploy butonuna basın! 🎉

Vercel otomatik olarak:
- Her commit'te deploy yapar
- HTTPS sağlar
- Global CDN üzerinden sunar

### Netlify ile Deploy

1. [Netlify](https://netlify.com) hesabı oluşturun
2. "Add new site" > "Import from Git"
3. Repo'nuzu seçin
4. Site settings > Environment > Add variable:
   - `API_KEY` = `your_gemini_api_key`
5. Deploy! 🚀

### Manuel Deploy

Build dosyalarını oluşturun:
```bash
npm run build
```
`dist` klasörünü herhangi bir static hosting'e yükleyin.

## 🔑 API Key Nasıl Alınır?

1. https://console.groq.com/ adresine gidin
2. Google veya GitHub ile ücretsiz hesap oluşturun
3. "API Keys" > "Create API Key" tıklayın
4. Key'i kopyalayın ve `.env.local` dosyasına ekleyin

**Groq Avantajları:**
- ✅ Tamamen ÜCRETSIZ (günde 14,400 istek!)
- ✅ 100x daha hızlı yanıt süresi
- ✅ Llama 3.3 70B - En güçlü ve en yeni açık kaynak model
- ✅ Kredi kartı gerektirmez!

## 📱 Teknolojiler

- React 18 + TypeScript
- Vite
- TailwindCSS
- **Groq AI** (Llama 3.3 70B) - Süper hızlı AI yanıtları
- Recharts
- React Router

## 📄 Lisans

MIT License
