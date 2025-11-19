import Groq from "groq-sdk";
import { AILessonPlan, StudentLevel, GeneratedQuiz } from '../types';

// Groq API Key
const apiKey = process.env.API_KEY || '';

// Groq client
const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true });

export const generateLessonPlan = async (
  topic: string,
  level: StudentLevel,
  durationMinutes: number
): Promise<AILessonPlan | null> => {
  if (!apiKey) {
    throw new Error("API Anahtarı bulunamadı! Lütfen 'API_KEY' değişkenini ayarlayın.");
  }

  try {
    const prompt = `Sen bir uzman matematik öğretmenisin. Aşağıdaki kriterlere göre detaylı bir matematik ders planı oluştur:

Öğrenci Seviyesi: ${level}
Konu: ${topic}
Süre: ${durationMinutes} dakika

Lütfen SADECE JSON formatında yanıt ver (başka açıklama ekleme):

{
  "objective": "Dersin ana öğrenme hedefi",
  "keyConcepts": ["Kavram 1", "Kavram 2", "Kavram 3"],
  "practiceProblems": [
    {
      "problem": "Soru metni",
      "solution": "Detaylı çözüm"
    }
  ],
  "homeworkIdeas": ["Ödev 1", "Ödev 2", "Ödev 3"]
}

Tüm yanıt Türkçe olmalı.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Sen bir uzman matematik öğretmenisin. Her zaman Türkçe konuşursun ve JSON formatında yanıt verirsin."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 2048,
      response_format: { type: "json_object" }
    });

    const responseText = chatCompletion.choices[0]?.message?.content || '';
    
    if (responseText) {
      const parsed = JSON.parse(responseText);
      return parsed as AILessonPlan;
    }
    
    return null;

  } catch (error: any) {
    console.error("Ders planı oluşturulurken hata:", error);
    
    if (error?.message?.includes('API key')) {
      throw new Error("API Key geçersiz! Lütfen https://console.groq.com adresinden yeni bir key alın.");
    } else if (error?.message?.includes('rate limit')) {
      throw new Error("İstek limiti aşıldı. Lütfen birkaç saniye bekleyin.");
    }
    
    throw new Error(`Ders planı oluşturulamadı: ${error?.message || 'Bilinmeyen hata'}`);
  }
};

export const generateQuiz = async (
  topic: string, 
  level: StudentLevel, 
  count: number = 5
): Promise<GeneratedQuiz | null> => {
  if (!apiKey) {
    throw new Error("API Anahtarı bulunamadı! Lütfen 'API_KEY' değişkenini ayarlayın.");
  }
  
  try {
    const prompt = `Sen bir uzman matematik öğretmenisin. Aşağıdaki kriterlere göre ${count} adet matematik sınavı sorusu oluştur:

Konu: ${topic}
Seviye: ${level}
Soru Sayısı: ${count}

Lütfen SADECE JSON formatında yanıt ver (başka açıklama ekleme):

{
  "topic": "${topic}",
  "level": "${level}",
  "questions": [
    {
      "question": "Soru metni",
      "answer": "Doğru cevap ve kısa çözüm"
    }
  ]
}

Tüm sorular ve cevaplar Türkçe olmalı. Sorular açık uçlu veya çoktan seçmeli olabilir.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Sen bir uzman matematik öğretmenisin. Her zaman Türkçe konuşursun ve JSON formatında yanıt verirsin."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.8,
      max_tokens: 2048,
      response_format: { type: "json_object" }
    });

    const responseText = chatCompletion.choices[0]?.message?.content || '';
    
    if (responseText) {
      const parsed = JSON.parse(responseText);
      return parsed as GeneratedQuiz;
    }
    
    return null;
    
  } catch (error: any) {
    console.error("Sınav oluşturulurken hata:", error);
    
    if (error?.message?.includes('API key')) {
      throw new Error("API Key geçersiz! Lütfen https://console.groq.com adresinden yeni bir key alın.");
    } else if (error?.message?.includes('rate limit')) {
      throw new Error("İstek limiti aşıldı. Lütfen birkaç saniye bekleyin.");
    }
    
    throw new Error(`Sınav oluşturulamadı: ${error?.message || 'Bilinmeyen hata'}`);
  }
};

