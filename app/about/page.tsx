export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            O aplikacji
          </h1>

          <div className="prose prose-lg">
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-700">Schedule App</h2>
            <p className="text-gray-700 mb-4">
              Aplikacja do zarządzania planem zajęć.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-700">Funkcjonalności:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Uwierzytelnianie użytkowników (Firebase Authentication)</li>
              <li>Autoryzacja - dostęp do planu po zalogowaniu</li>
              <li>Interaktywny plan zajęć tygodniowych</li>
              <li>Dodawanie, edycja i usuwanie zajęć</li>
              <li>Responsywny design (mobile, tablet, desktop)</li>
              <li>Zapis danych w Firestore</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-700">Technologie:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Next.js 14 (App Router)</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Firebase (Auth + Firestore)</li>
              <li>React Hook Form</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-700">Autor</h3>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-blue-600">
              <p className="text-gray-800 leading-relaxed">
                <strong className="text-blue-900">Imię i Nazwisko:</strong> <span className="text-gray-700">Dawid Chorąży</span><br/>
                <strong className="text-blue-900">Numer albumu:</strong> <span className="text-gray-700">14976</span><br/>
                <strong className="text-blue-900">Rok akademicki:</strong> <span className="text-gray-700">2025/2026</span><br/>
                <strong className="text-blue-900">Uczelnia:</strong> <span className="text-gray-700">Wyższa Szkoła Ekonomii i Informatyki w Krakowie</span><br/>
                <strong className="text-blue-900">Przedmiot:</strong> <span className="text-gray-700">Frameworki Frontendowe</span>
              </p>
            </div>
            
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Projekt</h4>
              <p className="text-gray-700 text-sm">
                Komponent rozkładu tygodniowego zajęć z możliwością edycji, dodawania i usuwania zajęć.
                Aplikacja wykorzystuje Firebase do uwierzytelniania użytkowników oraz przechowywania danych w Firestore.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}