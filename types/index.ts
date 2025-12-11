export interface Lesson {
  id: string;
  title: string;
  day: number;
  startHour: number;
  duration: number;
  teacher?: string;
  room?: string;
  description?: string;
  color?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}