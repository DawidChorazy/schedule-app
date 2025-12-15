'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { User, sendEmailVerification } from 'firebase/auth';

export default function VerifyEmailPage() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [resendLoading, setResendLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user && user.emailVerified) {
      router.push('/schedule');
    }
  }, [user, router]);

  const handleResendVerification = async () => {
    if (!user) return;

    setResendLoading(true);
    setMessage('');

    try {
      await sendEmailVerification(user);
      setMessage('E-mail weryfikacyjny został wysłany ponownie.');
    } catch (error) {
      setMessage('Błąd podczas wysyłania e-maila. Spróbuj ponownie.');
      console.error(error);
    } finally {
      setResendLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Błąd wylogowania:', error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Ładowanie...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Zweryfikuj swój e-mail
            </h2>
            <p className="text-gray-600 mb-6">
              Wysyłaliśmy e-mail weryfikacyjny na adres <strong>{user.email}</strong>.
              Kliknij w link w e-mailu, aby zweryfikować swoje konto.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Nie widzisz e-maila? Sprawdź folder spam lub kliknij przycisk poniżej, aby wysłać ponownie.
            </p>

            {message && (
              <div className={`mb-4 p-3 rounded ${
                message.includes('Błąd') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              }`}>
                {message}
              </div>
            )}

            <div className="space-y-4">
              <button
                onClick={handleResendVerification}
                disabled={resendLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {resendLoading ? 'Wysyłanie...' : 'Wyślij ponownie'}
              </button>

              <button
                onClick={handleSignOut}
                className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition"
              >
                Wyloguj się
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}