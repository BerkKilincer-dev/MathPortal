import React, { useState } from 'react';
import { Lesson, Student, LessonStatus, PaymentStatus } from '../types';
import { Plus, Calendar as CalendarIcon, Clock, CheckCircle, XCircle, DollarSign, FileText } from 'lucide-react';
import { generateId } from '../services/storage';

interface LessonsProps {
  lessons: Lesson[];
  students: Student[];
  onAddLesson: (lesson: Lesson) => void;
  onUpdateLesson: (lesson: Lesson) => void;
}

export const Lessons: React.FC<LessonsProps> = ({ lessons, students, onAddLesson, onUpdateLesson }) => {
  const [isScheduling, setIsScheduling] = useState(false);
  const [newLesson, setNewLesson] = useState<Partial<Lesson>>({
    date: new Date().toISOString().split('T')[0],
    time: '16:00',
    durationMinutes: 60,
    price: 500,
    status: LessonStatus.SCHEDULED,
    paymentStatus: PaymentStatus.PENDING
  });

  const sortedLessons = [...lessons].sort((a, b) => {
    return new Date(`${b.date}T${b.time}`).getTime() - new Date(`${a.date}T${a.time}`).getTime();
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLesson.studentId && newLesson.topic) {
      onAddLesson({
        id: generateId(),
        studentId: newLesson.studentId,
        date: newLesson.date!,
        time: newLesson.time!,
        durationMinutes: newLesson.durationMinutes!,
        topic: newLesson.topic,
        price: newLesson.price!,
        status: LessonStatus.SCHEDULED,
        paymentStatus: PaymentStatus.PENDING,
      } as Lesson);
      setIsScheduling(false);
      setNewLesson({
        date: new Date().toISOString().split('T')[0],
        time: '16:00',
        durationMinutes: 60,
        price: 500,
        status: LessonStatus.SCHEDULED,
        paymentStatus: PaymentStatus.PENDING,
        topic: ''
      });
    }
  };

  const togglePayment = (lesson: Lesson) => {
    onUpdateLesson({
      ...lesson,
      paymentStatus: lesson.paymentStatus === PaymentStatus.PAID ? PaymentStatus.PENDING : PaymentStatus.PAID
    });
  };

  const toggleStatus = (lesson: Lesson) => {
    const nextStatus = {
      [LessonStatus.SCHEDULED]: LessonStatus.COMPLETED,
      [LessonStatus.COMPLETED]: LessonStatus.CANCELLED,
      [LessonStatus.CANCELLED]: LessonStatus.SCHEDULED
    };
    onUpdateLesson({
      ...lesson,
      status: nextStatus[lesson.status]
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Dersler</h2>
        <button 
          onClick={() => setIsScheduling(!isScheduling)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Ders Planla
        </button>
      </div>

      {isScheduling && (
        <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-slate-700">Yeni Ders Planla</h3>
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-600 mb-1">Öğrenci</label>
              <select 
                required
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={newLesson.studentId || ''}
                onChange={e => setNewLesson({...newLesson, studentId: e.target.value})}
              >
                <option value="">Öğrenci seçiniz...</option>
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.level})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Konu</label>
              <input 
                required
                type="text" 
                placeholder="örn: Cebire Giriş"
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={newLesson.topic || ''}
                onChange={e => setNewLesson({...newLesson, topic: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Tarih</label>
              <input 
                required
                type="date" 
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={newLesson.date}
                onChange={e => setNewLesson({...newLesson, date: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Saat</label>
              <input 
                required
                type="time" 
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={newLesson.time}
                onChange={e => setNewLesson({...newLesson, time: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Süre (dk)</label>
              <input 
                required
                type="number" 
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={newLesson.durationMinutes}
                onChange={e => setNewLesson({...newLesson, durationMinutes: parseInt(e.target.value)})}
              />
            </div>
             <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Ücret (₺)</label>
              <input 
                required
                type="number" 
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={newLesson.price}
                onChange={e => setNewLesson({...newLesson, price: parseInt(e.target.value)})}
              />
            </div>
            <div className="md:col-span-2 flex justify-end gap-2 mt-2">
              <button type="button" onClick={() => setIsScheduling(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">İptal</button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Planla</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-4">Tarih & Saat</th>
                <th className="p-4">Öğrenci</th>
                <th className="p-4">Konu</th>
                <th className="p-4">Durum</th>
                <th className="p-4">Ödeme</th>
                <th className="p-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedLessons.map(lesson => {
                const student = students.find(s => s.id === lesson.studentId);
                return (
                  <tr key={lesson.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-800">{new Date(lesson.date).toLocaleDateString('tr-TR')}</span>
                        <span className="text-slate-500 text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {lesson.time} ({lesson.durationMinutes}dk)
                        </span>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-slate-700">
                      {student ? student.name : 'Bilinmeyen Öğrenci'}
                    </td>
                    <td className="p-4 text-slate-600">{lesson.topic}</td>
                    <td className="p-4">
                      <button 
                        onClick={() => toggleStatus(lesson)}
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-colors ${
                          lesson.status === LessonStatus.COMPLETED ? 'bg-green-100 text-green-700' :
                          lesson.status === LessonStatus.CANCELLED ? 'bg-red-100 text-red-700' :
                          'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {lesson.status === LessonStatus.COMPLETED && <CheckCircle className="w-3 h-3" />}
                        {lesson.status === LessonStatus.CANCELLED && <XCircle className="w-3 h-3" />}
                        {lesson.status === LessonStatus.SCHEDULED && <CalendarIcon className="w-3 h-3" />}
                        {lesson.status}
                      </button>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => togglePayment(lesson)}
                        className={`flex items-center gap-1 text-sm ${
                          lesson.paymentStatus === PaymentStatus.PAID ? 'text-green-600 font-medium' : 'text-amber-600'
                        }`}
                      >
                        <DollarSign className="w-4 h-4" />
                        {lesson.paymentStatus === PaymentStatus.PAID ? 'Ödendi' : `₺${lesson.price} Bekliyor`}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      {/* Future: Link to Lesson Details / AI Plan */}
                      {lesson.aiGeneratedPlan && (
                        <div className="text-xs text-indigo-600 flex justify-end items-center gap-1">
                           <FileText className="w-3 h-3"/> Plan Hazır
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
              {sortedLessons.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    Planlanmış ders bulunmuyor.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
