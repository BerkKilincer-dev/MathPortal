import { AppData, Lesson, Student, StudentLevel, LessonStatus, PaymentStatus } from '../types';

const STORAGE_KEY = 'mathtutor_data_tr_v2';

const DEFAULT_DATA: AppData = {
  students: [
    { id: '1', name: 'Ayşe Yılmaz', level: StudentLevel.HIGH_SCHOOL, email: 'ayse@ornek.com' },
    { id: '2', name: 'Mehmet Demir', level: StudentLevel.MIDDLE_SCHOOL, email: 'mehmet@ornek.com' },
  ],
  lessons: [
    {
      id: '101',
      studentId: '1',
      date: new Date().toISOString().split('T')[0],
      time: '16:00',
      durationMinutes: 60,
      topic: 'Türev: Temel Kurallar',
      price: 500,
      status: LessonStatus.SCHEDULED,
      paymentStatus: PaymentStatus.PENDING,
    },
    {
      id: '102',
      studentId: '2',
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Dün
      time: '15:00',
      durationMinutes: 45,
      topic: 'Cebir: Lineer Denklemler',
      price: 400,
      status: LessonStatus.COMPLETED,
      paymentStatus: PaymentStatus.PAID,
    }
  ],
  todos: [
    { id: '1', text: 'Kırtasiyeden yeni test kitaplarını al', completed: false },
    { id: '2', text: 'Ayşe\'nin velisini ara', completed: true },
  ]
};

// Her ortamda çalışan güvenli ID oluşturucu
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};

export const loadData = (): AppData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Eski versiyon verisi varsa ve todos yoksa ekle
      if (!parsed.todos) parsed.todos = [];
      return parsed;
    }
  } catch (e) {
    console.error("Veri yüklenemedi", e);
  }
  return DEFAULT_DATA;
};

export const saveData = (data: AppData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Veri kaydedilemedi", e);
  }
};
