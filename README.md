# Schedule App

A modern web application built with Next.js for managing schedules and lessons. Features user authentication, interactive weekly schedule view, and lesson management.

## Features

- User authentication (login/register)
- Interactive weekly schedule view
- Lesson management with modal interface
- Responsive design
- Firebase integration for backend services

## Technologies Used

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Firebase
- **Linting:** ESLint

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd schedule-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase configuration in `lib/firebase.ts`

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/` - Next.js app router pages
- `components/` - Reusable React components
- `contexts/` - React contexts (e.g., AuthContext)
- `lib/` - Utility libraries (e.g., Firebase config)
- `services/` - API services (e.g., lessons service)
- `types/` - TypeScript type definitions

## Usage

- **Home:** Landing page
- **About:** Information about the app
- **Login/Register:** User authentication
- **Schedule:** View and manage weekly schedule

## Live Version

Check out the live version of the project: [Schedule App Live](https://schedule-app-psi-puce.vercel.app/)


