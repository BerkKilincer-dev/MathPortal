import React, { useState } from 'react';
import { Student, Lesson, AILessonPlan, LessonStatus } from '../types';
import { generateLessonPlan } from '../services/aiService';
import { BrainCircuit, Sparkles, Loader2, BookOpen, Save } from 'lucide-react';

interface AIPlannerProps {
  students: Student[];
  lessons: Lesson[];
  onUpdateLesson: (lesson: Lesson) => void;
}

export const AIPlanner: React.FC<AIPlannerProps> = ({ students, lessons, onUpdateLesson }) => {
  const [selectedLessonId, setSelectedLessonId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<AILessonPlan | null>(null);
  
  // Only show scheduled lessons that don't have a plan yet (or allow regeneration)
  const eligibleLessons = lessons.filter(l => l.status === LessonStatus.SCHEDULED);

  const handleGenerate = async () => {
    const lesson = lessons.find(l => l.id === selectedLessonId);
    const student = students.find(s => s.id === lesson?.studentId);
    
    if (!lesson || !student) return;

    setIsLoading(true);
    setGeneratedPlan(null);

    try {
      const plan = await generateLessonPlan(lesson.topic, student.level, lesson.durationMinutes);
      setGeneratedPlan(plan);
    } catch (err: any) {
      console.error("Plan oluşturulamadı", err);
      alert("Hata: " + (err.message || "Ders planı oluşturulamadı."));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    const lesson = lessons.find(l => l.id === selectedLessonId);
    if (lesson && generatedPlan) {
      onUpdateLesson({
        ...lesson,
        aiGeneratedPlan: generatedPlan
      });
      alert("Ders planı başarıyla kaydedildi!");
      setSelectedLessonId('');
      setGeneratedPlan(null);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
          <BrainCircuit className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">YZ Ders Planlayıcı</h2>
        <p className="text-slate-600">Planlanmış bir ders seçin ve Gemini sizin için yapılandırılmış bir ders planı oluştursun.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-slate-600 mb-1">Yaklaşan Dersi Seç</label>
            <select 
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={selectedLessonId}
              onChange={(e) => {
                setSelectedLessonId(e.target.value);
                setGeneratedPlan(null);
              }}
            >
              <option value="">-- Bir ders seçin --</option>
              {eligibleLessons.map(l => {
                const s = students.find(stu => stu.id === l.studentId);
                return (
                  <option key={l.id} value={l.id}>
                    {l.date} - {l.topic} ({s?.name})
                  </option>
                );
              })}
            </select>
          </div>
          <button 
            onClick={handleGenerate}
            disabled={!selectedLessonId || isLoading}
            className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all ${
              !selectedLessonId || isLoading 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'
            }`}
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            {isLoading ? 'Oluşturuluyor...' : 'Plan Oluştur'}
          </button>
        </div>
      </div>

      {generatedPlan && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white rounded-xl shadow-lg border border-indigo-100 overflow-hidden">
            <div className="bg-indigo-600 p-4 flex justify-between items-center">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5" /> Ders Planı
              </h3>
              <button 
                onClick={handleSave}
                className="bg-white text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-50 flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Derse Kaydet
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <h4 className="text-sm uppercase tracking-wide text-slate-400 font-semibold mb-1">Hedef</h4>
                <p className="text-slate-800 text-lg leading-relaxed">{generatedPlan.objective}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-sm uppercase tracking-wide text-indigo-600 font-semibold">Ana Kavramlar</h4>
                  <ul className="list-disc pl-5 space-y-2 text-slate-700">
                    {generatedPlan.keyConcepts.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm uppercase tracking-wide text-amber-600 font-semibold">Ödev Fikirleri</h4>
                  <ul className="list-disc pl-5 space-y-2 text-slate-700">
                    {generatedPlan.homeworkIdeas.map((h, i) => <li key={i}>{h}</li>)}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-sm uppercase tracking-wide text-green-600 font-semibold mb-4">Örnek Sorular</h4>
                <div className="space-y-4">
                  {generatedPlan.practiceProblems.map((p, i) => (
                    <div key={i} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <p className="font-medium text-slate-800 mb-2">S: {p.problem}</p>
                      <p className="text-slate-600 italic text-sm border-t border-slate-200 pt-2 mt-2">
                        <span className="font-semibold">Çözüm:</span> {p.solution}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};