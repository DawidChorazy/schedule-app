'use client';

import { useState, useEffect } from 'react';
import { Dialog, Listbox } from '@headlessui/react';
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
  const [startHour, setStartHour] = useState(18);
  const [duration, setDuration] = useState(3);
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
      setDuration(3);
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

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <Dialog.Title className="text-2xl font-bold text-gray-900">
                {lesson ? 'Edytuj zajęcia' : 'Dodaj zajęcia'}
              </Dialog.Title>
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
                <Listbox value={day} onChange={setDay}>
                  <div className="relative">
                    <Listbox.Button className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-left">
                      {DAYS[day]}
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                      {DAYS.map((dayName, index) => (
                        <Listbox.Option
                          key={index}
                          value={index}
                          className={({ active }) =>
                            `cursor-pointer select-none px-4 py-2 ${
                              active ? 'bg-blue-100' : 'text-gray-900'
                            }`
                          }
                        >
                          {dayName}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Godzina rozpoczęcia *
                </label>
                <Listbox value={startHour} onChange={setStartHour}>
                  <div className="relative">
                    <Listbox.Button className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-left">
                      {Math.floor(startHour)}:{startHour % 1 === 0 ? '00' : '30'}
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                      {Array.from({ length: 26 }, (_, i) => 8 + i * 0.5).map((hour) => (
                        <Listbox.Option
                          key={hour}
                          value={hour}
                          className={({ active }) =>
                            `cursor-pointer select-none px-4 py-2 ${
                              active ? 'bg-blue-100' : 'text-gray-900'
                            }`
                          }
                        >
                          {Math.floor(hour)}:{hour % 1 === 0 ? '00' : '30'}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>
            </div>

            {/* Czas trwania */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Czas trwania (godziny) *
              </label>
              <Listbox value={duration} onChange={setDuration}>
                <div className="relative">
                  <Listbox.Button className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-left">
                    {duration} {duration === 1 ? 'godzina' : duration < 2 ? 'godziny' : 'godzin'}
                  </Listbox.Button>
                  <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                    <Listbox.Option
                      value={0.5}
                      className={({ active }) =>
                        `cursor-pointer select-none px-4 py-2 ${
                          active ? 'bg-blue-100' : 'text-gray-900'
                        }`
                      }
                    >
                      0.5 godziny
                    </Listbox.Option>
                    <Listbox.Option
                      value={1}
                      className={({ active }) =>
                        `cursor-pointer select-none px-4 py-2 ${
                          active ? 'bg-blue-100' : 'text-gray-900'
                        }`
                      }
                    >
                      1 godzina
                    </Listbox.Option>
                    <Listbox.Option
                      value={1.5}
                      className={({ active }) =>
                        `cursor-pointer select-none px-4 py-2 ${
                          active ? 'bg-blue-100' : 'text-gray-900'
                        }`
                      }
                    >
                      1.5 godziny
                    </Listbox.Option>
                    <Listbox.Option
                      value={2}
                      className={({ active }) =>
                        `cursor-pointer select-none px-4 py-2 ${
                          active ? 'bg-blue-100' : 'text-gray-900'
                        }`
                      }
                    >
                      2 godziny
                    </Listbox.Option>
                    <Listbox.Option
                      value={2.5}
                      className={({ active }) =>
                        `cursor-pointer select-none px-4 py-2 ${
                          active ? 'bg-blue-100' : 'text-gray-900'
                        }`
                      }
                    >
                      2.5 godziny
                    </Listbox.Option>
                    <Listbox.Option
                      value={3}
                      className={({ active }) =>
                        `cursor-pointer select-none px-4 py-2 ${
                          active ? 'bg-blue-100' : 'text-gray-900'
                        }`
                      }
                    >
                      3 godziny
                    </Listbox.Option>
                  </Listbox.Options>
                </div>
              </Listbox>
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
      </Dialog.Panel>
    </div>
  </Dialog>
  );
}