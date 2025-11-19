export enum StudentLevel {
  ELEMENTARY = 'İlkokul',
  MIDDLE_SCHOOL = 'Ortaokul',
  HIGH_SCHOOL = 'Lise',
  COLLEGE = 'Üniversite',
}

export interface Student {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  level: StudentLevel;
  notes?: string;
}

export enum LessonStatus {
  SCHEDULED = 'Planlandı',
  COMPLETED = 'Tamamlandı',
  CANCELLED = 'İptal',
}

export enum PaymentStatus {
  PENDING = 'Bekliyor',
  PAID = 'Ödendi',
}

export interface Lesson {
  id: string;
  studentId: string;
  date: string; // ISO Date string
  time: string;
  durationMinutes: number;
  topic: string;
  price: number;
  status: LessonStatus;
  paymentStatus: PaymentStatus;
  notes?: string;
  aiGeneratedPlan?: AILessonPlan;
}

export interface AILessonPlan {
  objective: string;
  keyConcepts: string[];
  practiceProblems: {
    problem: string;
    solution: string;
  }[];
  homeworkIdeas: string[];
}

export interface QuizQuestion {
  question: string;
  answer: string;
}

export interface GeneratedQuiz {
  topic: string;
  level: string;
  questions: QuizQuestion[];
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface AppData {
  students: Student[];
  lessons: Lesson[];
  todos: TodoItem[];
}