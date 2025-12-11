import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Schedule App
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Zarządzaj swoim planem zajęć w prosty i intuicyjny sposób
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/login"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Zaloguj się
            </Link>
            <Link
              href="/register"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition"
            >
              Zarejestruj się
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2 text-gray-700">Plan tygodniowy</h3>
            <p className="text-gray-600">
              Zobacz wszystkie zajęcia w przejrzystym układzie tygodniowym
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2 text-gray-700">Łatwa edycja</h3>
            <p className="text-gray-600">
              Dodawaj, edytuj i usuwaj zajęcia jednym kliknięciem
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2 text-gray-700">Responsywność</h3>
            <p className="text-gray-600">
              Dostęp z komputera, tabletu i telefonu
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}