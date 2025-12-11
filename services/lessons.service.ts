import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Lesson } from '@/types';

const LESSONS_COLLECTION = 'lessons';

export const lessonsService = {
  // Pobierz wszystkie zajęcia użytkownika
  async getUserLessons(userId: string): Promise<Lesson[]> {
    const q = query(
      collection(db, LESSONS_COLLECTION),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Lesson;
    });
  },

  // Dodaj nowe zajęcia
  async addLesson(lessonData: Omit<Lesson, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, LESSONS_COLLECTION), {
      ...lessonData,
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
    });
    return docRef.id;
  },

  // Zaktualizuj zajęcia
  async updateLesson(lessonId: string, lessonData: Partial<Lesson>): Promise<void> {
    const lessonRef = doc(db, LESSONS_COLLECTION, lessonId);
    await updateDoc(lessonRef, {
      ...lessonData,
      updatedAt: Timestamp.fromDate(new Date()),
    });
  },

  // Usuń zajęcia
  async deleteLesson(lessonId: string): Promise<void> {
    const lessonRef = doc(db, LESSONS_COLLECTION, lessonId);
    await deleteDoc(lessonRef);
  },
};
