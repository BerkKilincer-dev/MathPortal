import React, { useState } from 'react';
import { Student, StudentLevel } from '../types';
import { Plus, Mail, Phone, GraduationCap, Trash2 } from 'lucide-react';
import { generateId } from '../services/storage';

interface StudentsProps {
  students: Student[];
  onAddStudent: (student: Student) => void;
  onDeleteStudent: (id: string) => void;
}

export const Students: React.FC<StudentsProps> = ({ students, onAddStudent, onDeleteStudent }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    level: StudentLevel.HIGH_SCHOOL
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStudent.name && newStudent.level) {
      onAddStudent({
        id: generateId(),
        name: newStudent.name,
        level: newStudent.level,
        email: newStudent.email,
        phone: newStudent.phone,
        notes: ''
      });
      setIsAdding(false);
      setNewStudent({ level: StudentLevel.HIGH_SCHOOL });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Öğrenciler</h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Öğrenci Ekle
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100 mb-6 animate-fade-in">
          <h3 className="text-lg font-semibold mb-4 text-slate-700">Yeni Öğrenci Bilgileri</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Ad Soyad</label>
              <input 
                required
                type="text" 
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={newStudent.name || ''}
                onChange={e => setNewStudent({...newStudent, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Seviye</label>
              <select 
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={newStudent.level}
                onChange={e => setNewStudent({...newStudent, level: e.target.value as StudentLevel})}
              >
                {Object.values(StudentLevel).map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">E-posta (İsteğe Bağlı)</label>
              <input 
                type="email" 
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={newStudent.email || ''}
                onChange={e => setNewStudent({...newStudent, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Telefon (İsteğe Bağlı)</label>
              <input 
                type="tel" 
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={newStudent.phone || ''}
                onChange={e => setNewStudent({...newStudent, phone: e.target.value})}
              />
            </div>
            <div className="md:col-span-2 flex justify-end gap-2 mt-2">
              <button 
                type="button" 
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                İptal
              </button>
              <button 
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Kaydet
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {students.map(student => (
          <div key={student.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow relative group">
            <button 
              onClick={() => onDeleteStudent(student.id)}
              className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              title="Öğrenciyi Sil"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-lg font-bold">
                {student.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{student.name}</h3>
                <div className="flex items-center gap-1 text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded-full w-fit mt-1">
                  <GraduationCap className="w-3 h-3" />
                  {student.level}
                </div>
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-slate-600">
              {student.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <a href={`mailto:${student.email}`} className="hover:text-indigo-600">{student.email}</a>
                </div>
              )}
              {student.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <a href={`tel:${student.phone}`} className="hover:text-indigo-600">{student.phone}</a>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {students.length === 0 && !isAdding && (
          <div className="col-span-full text-center py-12 text-slate-500">
            Henüz öğrenci eklenmedi. Başlamak için "Öğrenci Ekle" butonuna tıklayın.
          </div>
        )}
      </div>
    </div>
  );
};
