import React, { useState } from 'react';
import { StudentLevel, GeneratedQuiz } from '../types';
import { generateQuiz } from '../services/aiService';
import { FileQuestion, Sparkles, Loader2, Printer, Copy, Check } from 'lucide-react';

export const QuizGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState<StudentLevel>(StudentLevel.HIGH_SCHOOL);
  const [questionCount, setQuestionCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [quiz, setQuiz] = useState<GeneratedQuiz | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;

    setIsLoading(true);
    setQuiz(null);
    setCopied(false);

    try {
      const result = await generateQuiz(topic, level, questionCount);
      setQuiz(result);
    } catch (err: any) {
      console.error(err);
      alert("Hata: " + (err.message || "Sınav oluşturulamadı."));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!quiz) return;
    
    const text = `KONU: ${quiz.topic} (${quiz.level})
    
SORULAR:
${quiz.questions.map((q, i) => `${i + 1}. ${q.question}`).join('\n\n')}

-------------------
CEVAP ANAHTARI:
${quiz.questions.map((q, i) => `${i + 1}. ${q.answer}`).join('\n')}
    `;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2 print:hidden">
        <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
          <FileQuestion className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Sınav Hazırlayıcı</h2>
        <p className="text-slate-600">Konuyu seçin, yapay zeka saniyeler içinde sınav hazırlasın.</p>
      </div>

      {/* Input Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 print:hidden">
        <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="md:col-span-3">
                <label className="block text-sm font-medium text-slate-600 mb-1">Konu</label>
                <input 
                    type="text" 
                    required
                    placeholder="Örn: İntegral Alma Kuralları, Üçgenlerde Benzerlik"
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Seviye</label>
                <select 
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    value={level}
                    onChange={(e) => setLevel(e.target.value as StudentLevel)}
                >
                    {Object.values(StudentLevel).map(l => (
                        <option key={l} value={l}>{l}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Soru Sayısı</label>
                <select 
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    value={questionCount}
                    onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                >
                    <option value="3">3 Soru</option>
                    <option value="5">5 Soru</option>
                    <option value="10">10 Soru</option>
                </select>
            </div>
            <button 
                type="submit"
                disabled={isLoading || !topic}
                className="w-full p-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-slate-200 disabled:text-slate-400 flex items-center justify-center gap-2"
            >
                {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                {isLoading ? 'Hazırlanıyor...' : 'Oluştur'}
            </button>
        </form>
      </div>

      {/* Results */}
      {quiz && (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-end gap-2 print:hidden">
                <button 
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                    {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Kopyalandı' : 'Metni Kopyala'}
                </button>
                <button 
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 text-white bg-slate-800 rounded-lg hover:bg-slate-900"
                >
                    <Printer className="w-4 h-4" /> Yazdır
                </button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 print:shadow-none print:border-none print:p-0">
                <div className="text-center border-b-2 border-slate-800 pb-6 mb-8">
                    <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-wider">{quiz.topic}</h1>
                    <p className="text-slate-600 mt-2">{quiz.level} Seviyesi • Çalışma Soruları</p>
                </div>

                <div className="space-y-8">
                    {quiz.questions.map((q, i) => (
                        <div key={i} className="flex gap-4">
                            <span className="flex-shrink-0 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-700 border border-slate-300 print:border-black">
                                {i + 1}
                            </span>
                            <div className="flex-1 pt-1">
                                <p className="text-lg text-slate-800 font-medium leading-relaxed">
                                    {q.question}
                                </p>
                                <div className="mt-8 border-b border-slate-200 border-dashed print:block hidden"></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 pt-8 border-t border-slate-200 print:break-before-page">
                    <h3 className="font-bold text-slate-800 mb-4">Cevap Anahtarı</h3>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                        {quiz.questions.map((q, i) => (
                            <div key={i} className="flex gap-2">
                                <span className="font-bold text-slate-700">{i + 1}.</span>
                                <span className="text-slate-600">{q.answer}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};