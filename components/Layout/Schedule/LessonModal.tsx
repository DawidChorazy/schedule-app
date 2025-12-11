'use client';

import { useState, useEffect } from 'react';
import { Lesson } from '@/types';

interface LessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (lesson: Partial<Lesson>) => void;
  onDelete?: () => void;
  lesson?: Lesson | null;
  initialDay?: number;
  initialHour?: number;
}

const DAYS = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
const COLORS = [
  { value: 'blue', label: 'Niebieski' },
  { value: 'green', label: 'Zielony' },
  { value: 'yellow', label: 'Żółty' },
  { value: 'red', label: 'Czerwony' },
  { value: 'purple', label: 'Fioletowy' },
];

export default function LessonModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  lesson,
  initialDay,
  initialHour,
}: LessonModalProps) {
  const [title, setTitle] = useState('');
  const [day, setDay] = useState(0);
  const [startHour, setStartHour] = useState(8);
  const [duration, setDuration] = useState(1);
  const [teacher, setTeacher] = useState('');
  const [room, setRoom] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('blue');

  useEffect(() => {
    if (lesson) {
      setTitle(lesson.title);
      setDay(lesson.day);
      setStartHour(lesson.startHour);
      setDuration(lesson.duration);
      setTeacher(lesson.teacher || '');
      setRoom(lesson.room || '');
      setDescription(lesson.description || '');
      setColor(lesson.color || 'blue');
    } else if (initialDay !== undefined && initialHour !== undefined) {
      setTitle('');
      setDay(initialDay);
      setStartHour(initialHour);
      setDuration(1);
      setTeacher('');
      setRoom('');
      setDescription('');
      setColor('blue');
    }
  }, [lesson, initialDay, initialHour]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: lesson?.id,
      title,
      day,
      startHour,
      duration,
      teacher,
      room,
      description,
      color,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {lesson ? 'Edytuj zajęcia' : 'Dodaj zajęcia'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nazwa zajęć */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nazwa zajęć *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="np. Matematyka"
              />
            </div>

            {/* Dzień i godzina */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dzień tygodnia *
                </label>
                <select
                  value={day}
                  onChange={(e) => setDay(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                >
                  {DAYS.map((dayName, index) => (
                    <option key={index} value={index}>
                      {dayName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Godzina rozpoczęcia *
                </label>
                <select
                  value={startHour}
                  onChange={(e) => setStartHour(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                >
                  {Array.from({ length: 13 }, (_, i) => i + 8).map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}:00
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Czas trwania */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Czas trwania (godziny) *
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value={0.5}>0.5 godziny</option>
                <option value={1}>1 godzina</option>
                <option value={1.5}>1.5 godziny</option>
                <option value={2}>2 godziny</option>
                <option value={2.5}>2.5 godziny</option>
                <option value={3}>3 godziny</option>
              </select>
            </div>

            {/* Prowadzący i sala */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prowadzący
                </label>
                <input
                  type="text"
                  value={teacher}
                  onChange={(e) => setTeacher(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="np. Dr Jan Kowalski"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sala
                </label>
                <input
                  type="text"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="np. A101"
                />
              </div>
            </div>

            {/* Kolor */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Kolor
            </label>
            <div className="flex gap-2 flex-wrap">
                <button
                type="button"
                onClick={() => setColor('blue')}
                className={`px-4 py-2 rounded-lg border-2 transition ${
                    color === 'blue' ? 'border-blue-600 ring-2 ring-blue-200' : 'border-gray-300'
                }`}
                >
                <div className="w-6 h-6 rounded bg-blue-400"></div>
                </button>
                <button
                type="button"
                onClick={() => setColor('green')}
                className={`px-4 py-2 rounded-lg border-2 transition ${
                    color === 'green' ? 'border-green-600 ring-2 ring-green-200' : 'border-gray-300'
                }`}
                >
                <div className="w-6 h-6 rounded bg-green-400"></div>
                </button>
                <button
                type="button"
                onClick={() => setColor('yellow')}
                className={`px-4 py-2 rounded-lg border-2 transition ${
                    color === 'yellow' ? 'border-yellow-600 ring-2 ring-yellow-200' : 'border-gray-300'
                }`}
                >
                <div className="w-6 h-6 rounded bg-yellow-400"></div>
                </button>
                <button
                type="button"
                onClick={() => setColor('red')}
                className={`px-4 py-2 rounded-lg border-2 transition ${
                    color === 'red' ? 'border-red-600 ring-2 ring-red-200' : 'border-gray-300'
                }`}
                >
                <div className="w-6 h-6 rounded bg-red-400"></div>
                </button>
                <button
                type="button"
                onClick={() => setColor('purple')}
                className={`px-4 py-2 rounded-lg border-2 transition ${
                    color === 'purple' ? 'border-purple-600 ring-2 ring-purple-200' : 'border-gray-300'
                }`}
                >
                <div className="w-6 h-6 rounded bg-purple-400"></div>
                </button>
            </div>
            </div>

            {/* Opis */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Opis
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="Dodatkowe informacje..."
              />
            </div>

            {/* Przyciski */}
            <div className="flex justify-between pt-4">
              {lesson && onDelete && (
                <button
                  type="button"
                  onClick={onDelete}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Usuń
                </button>
              )}
              <div className="flex gap-2 ml-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Zapisz
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}