'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import WeekView from '@/components/Layout/Schedule/WeekView';
import LessonModal from '@/components/Layout/Schedule/LessonModal';
import { Lesson } from '@/types';
import { lessonsService } from '@/services/lessons.service';

export default function SchedulePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [newLessonDay, setNewLessonDay] = useState<number | undefined>();
  const [newLessonHour, setNewLessonHour] = useState<number | undefined>();
  const [loadingLessons, setLoadingLessons] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Pobierz zajęcia z Firestore
  useEffect(() => {
    if (user) {
      loadLessons();
    }
  }, [user]);

  const loadLessons = async () => {
    if (!user) return;
    
    try {
      setLoadingLessons(true);
      const userLessons = await lessonsService.getUserLessons(user.uid);
      setLessons(userLessons);
    } catch (error) {
      console.error('Błąd pobierania zajęć:', error);
    } finally {
      setLoadingLessons(false);
    }
  };

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setNewLessonDay(undefined);
    setNewLessonHour(undefined);
    setIsModalOpen(true);
  };

  const handleEmptySlotClick = (day: number, hour: number) => {
    setSelectedLesson(null);
    setNewLessonDay(day);
    setNewLessonHour(hour);
    setIsModalOpen(true);
  };

  const handleSaveLesson = async (lessonData: Partial<Lesson>) => {
    if (!user) return;

    try {
      if (selectedLesson) {
        // Edycja istniejących zajęć
        await lessonsService.updateLesson(selectedLesson.id, lessonData);
      } else {
        // Dodawanie nowych zajęć
        const newLesson: Omit<Lesson, 'id'> = {
          title: lessonData.title!,
          day: lessonData.day!,
          startHour: lessonData.startHour!,
          duration: lessonData.duration!,
          teacher: lessonData.teacher,
          room: lessonData.room,
          description: lessonData.description,
          color: lessonData.color,
          userId: user.uid,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        await lessonsService.addLesson(newLesson);
      }
      // Odśwież listę zajęć
      await loadLessons();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Błąd zapisu zajęć:', error);
      alert('Błąd zapisu. Sprawdź uprawnienia w Firebase.');
    }
  };

  const handleDeleteLesson = async () => {
    if (!selectedLesson) return;

    try {
      await lessonsService.deleteLesson(selectedLesson.id);
      await loadLessons();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Błąd usuwania zajęć:', error);
      alert('Błąd usuwania. Sprawdź uprawnienia w Firebase.');
    }
  };

  if (loading || loadingLessons) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Ładowanie...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Plan zajęć
          </h1>
          <p className="text-gray-600">
            Kliknij na zajęcia aby je edytować, lub na puste pole aby dodać nowe
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <WeekView
            lessons={lessons}
            onLessonClick={handleLessonClick}
            onEmptySlotClick={handleEmptySlotClick}
          />
        </div>
      </div>

      <LessonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveLesson}
        onDelete={selectedLesson ? handleDeleteLesson : undefined}
        lesson={selectedLesson}
        initialDay={newLessonDay}
        initialHour={newLessonHour}
      />
    </div>
  );
}