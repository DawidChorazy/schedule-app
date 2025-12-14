'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Błąd wylogowania:', error);
    }
  };

  return (
    <Disclosure as="nav" className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600 text-gray-700">
            Schedule
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
              Home
            </Link>
            {user && (
              <Link href="/schedule" className="text-gray-700 hover:text-blue-600 transition">
                Plan zajęć
              </Link>
            )}
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">
              O aplikacji
            </Link>
            
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-600 text-sm">{user.email}</span>
                <button
                  onClick={handleSignOut}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Wyloguj
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Zaloguj się
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Disclosure.Button className="md:hidden text-gray-700">
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Disclosure.Button>
        </div>

        {/* Mobile Menu */}
        <Disclosure.Panel className="md:hidden py-4 border-t">
          <Link
            href="/"
            className="block py-2 text-gray-700 hover:text-blue-600"
          >
            Home
          </Link>
          {user && (
            <Link
              href="/schedule"
              className="block py-2 text-gray-700 hover:text-blue-600"
            >
              Plan zajęć
            </Link>
          )}
          <Link
            href="/about"
            className="block py-2 text-gray-700 hover:text-blue-600"
          >
            O aplikacji
          </Link>
          
          {user ? (
            <>
              <div className="py-2 text-gray-600 text-sm">{user.email}</div>
              <button
                onClick={handleSignOut}
                className="block w-full text-left py-2 text-red-600 font-semibold"
              >
                Wyloguj
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="block py-2 text-blue-600 font-semibold"
            >
              Zaloguj się
            </Link>
          )}
        </Disclosure.Panel>
      </div>
    </Disclosure>
  );
}