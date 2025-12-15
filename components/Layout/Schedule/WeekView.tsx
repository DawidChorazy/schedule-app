'use client';

import { useState } from 'react';
import { Lesson } from '@/types';

interface WeekViewProps {
  lessons: Lesson[];
  onLessonClick: (lesson: Lesson) => void;
  onEmptySlotClick: (day: number, hour: number) => void;
}

const DAYS = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
const HOURS = Array.from({ length: 26 }, (_, i) => 8 + i * 0.5); // 8:00, 8:30, ..., 20:30

export default function WeekView({ lessons, onLessonClick, onEmptySlotClick }: WeekViewProps) {
  const getLessonForSlot = (day: number, hour: number) => {
    return lessons.find(
      (lesson) => lesson.day === day && hour >= lesson.startHour && hour <= lesson.startHour + lesson.duration
    );
  };

  const getLessonColor = (color?: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-100 border-blue-300 hover:bg-blue-200',
      green: 'bg-green-100 border-green-300 hover:bg-green-200',
      yellow: 'bg-yellow-100 border-yellow-300 hover:bg-yellow-200',
      red: 'bg-red-100 border-red-300 hover:bg-red-200',
      purple: 'bg-purple-100 border-purple-300 hover:bg-purple-200',
    };
    return colors[color || 'blue'] || colors.blue;
  };

  return (
    <div className="overflow-x-auto">
      {/* Desktop View */}
      <div className="hidden lg:block min-w-[1000px]">
        <div className="grid grid-cols-8 gap-2">
          {/* Header - godziny */}
          <div className="font-bold text-center py-2">Godzina</div>
          {DAYS.map((day) => (
            <div key={day} className="font-bold text-center py-2 text-sm">
              {day}
            </div>
          ))}

          {/* Siatka godzin */}
          {HOURS.map((hour) => (
            <div key={hour} className="contents">
              {/* Kolumna z godziną */}
              <div className="flex items-center justify-center font-semibold text-gray-600 bg-gray-50 rounded">
                {Math.floor(hour)}:{hour % 1 === 0 ? '00' : '30'}
              </div>

              {/* Kolumny dni */}
              {DAYS.map((_, dayIndex) => {
                const lesson = getLessonForSlot(dayIndex, hour);

                return (
                  <div
                    key={`${dayIndex}-${hour}`}
                    onClick={() => {
                      if (lesson) {
                        onLessonClick(lesson);
                      } else {
                        onEmptySlotClick(dayIndex, hour);
                      }
                    }}
                    className={`
                      min-h-[80px] border-2 rounded-lg p-2 cursor-pointer transition
                      ${lesson 
                        ? `${getLessonColor(lesson.color)} border-solid`
                        : 'bg-white border-dashed border-gray-300 hover:bg-gray-50'
                      }
                    `}
                  >
                    {lesson && (
                      <div className="h-full flex flex-col">
                        <div className="font-semibold text-sm text-gray-900">{lesson.title}</div>
                        {lesson.teacher && hour === lesson.startHour && (
                          <div className="text-xs text-gray-600 mt-1">{lesson.teacher}</div>
                        )}
                        {lesson.room && hour === lesson.startHour && (
                          <div className="text-xs text-gray-500">Sala: {lesson.room}</div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet View */}
      <div className="lg:hidden space-y-4">
        {DAYS.map((day, dayIndex) => (
          <div key={day} className="bg-white rounded-lg shadow p-4">
            <h3 className="font-bold text-lg mb-3">{day}</h3>
            <div className="space-y-2">
              {HOURS.map((hour) => {
                const lesson = getLessonForSlot(dayIndex, hour);

                return (
                  <div
                    key={`${dayIndex}-${hour}`}
                    onClick={() => {
                      if (lesson) {
                        onLessonClick(lesson);
                      } else {
                        onEmptySlotClick(dayIndex, hour);
                      }
                    }}
                    className={`
                      p-3 border-2 rounded-lg cursor-pointer transition
                      ${lesson 
                        ? `${getLessonColor(lesson.color)} border-solid`
                        : 'border-dashed border-gray-300 hover:bg-gray-50'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{Math.floor(hour)}:{hour % 1 === 0 ? '00' : '30'}</span>
                      {lesson ? (
                        <div>
                          <div className="font-semibold text-gray-900">{lesson.title}</div>
                          {lesson.teacher && hour === lesson.startHour && (
                            <div className="text-sm text-gray-600">{lesson.teacher}</div>
                          )}
                          {lesson.room && hour === lesson.startHour && (
                            <div className="text-sm text-gray-500">Sala: {lesson.room}</div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">Wolne</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}