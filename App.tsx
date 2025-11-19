import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Students } from './components/Students';
import { Lessons } from './components/Lessons';
import { AIPlanner } from './components/AIPlanner';
import { QuizGenerator } from './components/QuizGenerator';
import { LoginScreen } from './components/LoginScreen';
import { AppData, Student, Lesson } from './types';
import { loadData, saveData } from './services/storage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState<AppData>({ students: [], lessons: [], todos: [] });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load initial data
  useEffect(() => {
    const storedData = loadData();
    setData(storedData);
    setIsLoaded(true);
  }, []);

  // Save data on change
  useEffect(() => {
    if (isLoaded) {
      saveData(data);
    }
  }, [data, isLoaded]);

  const handleUpdateData = (newData: AppData) => {
      setData(newData);
  }

  const handleAddStudent = (student: Student) => {
    setData(prev => ({ ...prev, students: [...prev.students, student] }));
  };

  const handleDeleteStudent = (id: string) => {
    if (window.confirm("Emin misiniz? Bu öğrenciye ait tüm ders geçmişi silinecek.")) {
      setData(prev => ({
        ...prev,
        students: prev.students.filter(s => s.id !== id),
        lessons: prev.lessons.filter(l => l.studentId !== id)
      }));
    }
  };

  const handleAddLesson = (lesson: Lesson) => {
    setData(prev => ({ ...prev, lessons: [...prev.lessons, lesson] }));
  };

  const handleUpdateLesson = (updatedLesson: Lesson) => {
    setData(prev => ({
      ...prev,
      lessons: prev.lessons.map(l => l.id === updatedLesson.id ? updatedLesson : l)
    }));
  };

  if (!isLoaded) return null;

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard data={data} onUpdateData={handleUpdateData} />} />
          <Route 
            path="/students" 
            element={
              <Students 
                students={data.students} 
                onAddStudent={handleAddStudent}
                onDeleteStudent={handleDeleteStudent}
              />
            } 
          />
          <Route 
            path="/lessons" 
            element={
              <Lessons 
                lessons={data.lessons} 
                students={data.students}
                onAddLesson={handleAddLesson}
                onUpdateLesson={handleUpdateLesson}
              />
            } 
          />
          <Route 
            path="/planner" 
            element={
              <AIPlanner 
                lessons={data.lessons}
                students={data.students}
                onUpdateLesson={handleUpdateLesson}
              />
            } 
          />
          <Route path="/quiz" element={<QuizGenerator />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}