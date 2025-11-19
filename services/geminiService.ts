import { GoogleGenAI, Type } from "@google/genai";
import { AILessonPlan, StudentLevel, GeneratedQuiz } from '../types';

// Vite config process.env.API_KEY'i build sırasında string olarak gömer.
const apiKey = process.env.API_KEY || '';

// API Key boş olsa bile instance oluşturuyoruz, ancak metodlarda kontrol edeceğiz.
const ai = new GoogleGenAI({ apiKey });

export const generateLessonPlan = async (
  topic: string,
  level: StudentLevel,
  durationMinutes: number
): Promise<AILessonPlan | null> => {
  if (!apiKey) {
    throw new Error("API Anahtarı bulunamadı! Lütfen Vercel ayarlarından 'API_KEY' değişkenini ekleyin ve projeyi Redeploy yapın.");
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Bir matematik ders planı oluştur. Öğrenci seviyesi: ${level}. 
      Konu: ${topic}. 
      Süre: ${durationMinutes} dakika.
      Çıktı dili tamamen Türkçe olmalı ve kesinlikle JSON formatında olmalıdır.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            objective: { type: Type.STRING, description: "Dersin ana öğrenme hedefi" },
            keyConcepts: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING }, 
              description: "Kapsanacak anahtar kavramların listesi" 
            },
            practiceProblems: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  problem: { type: Type.STRING, description: "Soru metni" },
                  solution: { type: Type.STRING, description: "Çözüm ve cevap" }
                }
              },
              description: "Çözümleriyle birlikte 3-5 alıştırma sorusu"
            },
            homeworkIdeas: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Önerilen ev ödevi görevleri listesi"
            }
          },
          required: ["objective", "keyConcepts", "practiceProblems", "homeworkIdeas"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AILessonPlan;
    }
    return null;

  } catch (error) {
    console.error("Ders planı oluşturulurken hata oluştu:", error);
    throw error;
  }
};

export const generateQuiz = async (topic: string, level: StudentLevel, count: number = 5): Promise<GeneratedQuiz | null> => {
  if (!apiKey) {
    throw new Error("API Anahtarı bulunamadı! Lütfen Vercel ayarlarından 'API_KEY' değişkenini ekleyin ve projeyi Redeploy yapın.");
  }
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Şu konu için ${count} adet matematik sınav sorusu oluştur: ${topic}. Seviye: ${level}.
      Sorular açık uçlu veya çoktan seçmeli olabilir ama formatı temiz tut.
      Çıktı Türkçe ve JSON formatında olmalıdır.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topic: { type: Type.STRING },
            level: { type: Type.STRING },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING, description: "Soru metni" },
                  answer: { type: Type.STRING, description: "Doğru cevap ve kısa çözüm yolu" }
                }
              }
            }
          }
        }
      }
    });
    
    if (response.text) {
      return JSON.parse(response.text) as GeneratedQuiz;
    }
    return null;
  } catch (e) {
    console.error("Sınav oluşturma başarısız oldu", e);
    throw e;
  }
}