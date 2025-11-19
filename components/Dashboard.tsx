import React, { useMemo, useRef, useState } from 'react';
import { AppData, LessonStatus, PaymentStatus, TodoItem } from '../types';
import { saveData, generateId } from '../services/storage';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { DollarSign, Clock, CheckCircle, User, Download, Upload, AlertTriangle, CheckSquare, Square, Plus, Trash2 } from 'lucide-react';

interface DashboardProps {
  data: AppData;
  onUpdateData: (newData: AppData) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ data, onUpdateData }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newTodo, setNewTodo] = useState('');

  const stats = useMemo(() => {
    const totalStudents = data.students.length;
    const upcomingLessons = data.lessons.filter(l => l.status === LessonStatus.SCHEDULED).length;
    const completedLessons = data.lessons.filter(l => l.status === LessonStatus.COMPLETED).length;
    
    const unpaidAmount = data.lessons
      .filter(l => l.status === LessonStatus.COMPLETED && l.paymentStatus === PaymentStatus.PENDING)
      .reduce((sum, l) => sum + l.price, 0);

    return { totalStudents, upcomingLessons, completedLessons, unpaidAmount };
  }, [data]);

  const chartData = useMemo(() => {
    // Simple last 7 days earnings/lessons view
    const days = [];
    const dayNamesTR = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      
      const dayLessons = data.lessons.filter(l => l.date === dateStr && l.status === LessonStatus.COMPLETED);
      const income = dayLessons.reduce((sum, l) => sum + l.price, 0);
      
      days.push({
        name: dayNamesTR[d.getDay()],
        income: income,
        lessons: dayLessons.length
      });
    }
    return days;
  }, [data.lessons]);

  const handleExport = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `matematik_asistani_yedek_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedData = JSON.parse(content);
        
        if (parsedData.students && parsedData.lessons) {
            if(window.confirm("Mevcut veriler silinecek ve yedekten geri yüklenecek. Emin misiniz?")) {
                saveData(parsedData);
                window.location.reload(); 
            }
        } else {
            alert("Geçersiz dosya formatı.");
        }
      } catch (err) {
        alert("Dosya okunamadı: " + err);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  // Todo Actions
  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    const newItem: TodoItem = {
        id: generateId(),
        text: newTodo,
        completed: false
    };
    onUpdateData({
        ...data,
        todos: [...(data.todos || []), newItem]
    });
    setNewTodo('');
  };

  const toggleTodo = (id: string) => {
    onUpdateData({
        ...data,
        todos: data.todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    });
  };

  const deleteTodo = (id: string) => {
      onUpdateData({
          ...data,
          todos: data.todos.filter(t => t.id !== id)
      });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Genel Bakış</h2>
        <div className="flex gap-2">
            <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden" 
                accept=".json"
            />
            <button 
                onClick={handleImportClick}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
                <Upload className="w-4 h-4" /> Yedek Yükle
            </button>
            <button 
                onClick={handleExport}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-slate-700 rounded-lg hover:bg-slate-800 transition-colors"
            >
                <Download className="w-4 h-4" /> Yedek İndir
            </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <User className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Toplam Öğrenci</p>
            <p className="text-2xl font-bold text-slate-800">{stats.totalStudents}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-full">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Yaklaşan Dersler</p>
            <p className="text-2xl font-bold text-slate-800">{stats.upcomingLessons}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-full">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Tamamlanan</p>
            <p className="text-2xl font-bold text-slate-800">{stats.completedLessons}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-red-100 text-red-600 rounded-full">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Bekleyen Ödeme</p>
            <p className="text-2xl font-bold text-slate-800">₺{stats.unpaidAmount}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 lg:col-span-2">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">Haftalık Gelir Özeti</h3>
            <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} prefix="₺" />
                <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                    cursor={{fill: '#f1f5f9'}}
                    formatter={(value) => [`₺${value}`, 'Gelir']}
                />
                <Bar dataKey="income" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
            </div>
        </div>

        {/* Todo List */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col h-full">
            <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-indigo-600" />
                Yapılacaklar
            </h3>
            
            <form onSubmit={addTodo} className="flex gap-2 mb-4">
                <input 
                    type="text" 
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Yeni not ekle..."
                    className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <button type="submit" className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    <Plus className="w-4 h-4" />
                </button>
            </form>

            <div className="flex-1 overflow-y-auto space-y-2 max-h-[200px]">
                {data.todos && data.todos.length > 0 ? (
                    data.todos.map(todo => (
                        <div key={todo.id} className="flex items-center justify-between group p-2 hover:bg-slate-50 rounded-lg">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <button onClick={() => toggleTodo(todo.id)} className="flex-shrink-0 text-slate-400 hover:text-indigo-600">
                                    {todo.completed ? <CheckSquare className="w-5 h-5 text-green-500" /> : <Square className="w-5 h-5" />}
                                </button>
                                <span className={`text-sm truncate ${todo.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                                    {todo.text}
                                </span>
                            </div>
                            <button onClick={() => deleteTodo(todo.id)} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-slate-400 text-center py-4">Henüz bir not yok.</p>
                )}
            </div>
        </div>

        {/* Info / Warning */}
        <div className="lg:col-span-3 bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
                <h4 className="font-bold text-blue-800 text-sm">Veri Güvenliği Hatırlatması</h4>
                <p className="text-sm text-blue-700 mt-1">
                    Verileriniz tarayıcınızda saklanıyor. Düzenli olarak <strong>"Yedek İndir"</strong> butonunu kullanmayı unutmayın.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};
