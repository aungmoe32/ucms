# University Campus Management System (UCMS)

The **University Campus Management System (UCMS)** is a web-based application designed to simplify campus operations, including timetable management, event notifications, and CRUD operations for students and teachers. It ensures a responsive, efficient, and user-friendly experience for both students and teachers.

## Demo

**App url** : https://ucms-orpin.vercel.app

**Video** : https://youtu.be/AUF3MB7q9Xo?si=4Vue81lRmyFvyvyJ

## Problem Statement

Universities always face timetable problems. It would be more convenient if students could get live details (date, location, room, etc.) about changes in class times, tutorials, assignments, and other events. The system should be restricted to only university students (no outsiders).

## Solution

I've developed a web app with two roles:

- Student
- Teacher (with administration access)

A semester consists of year, major, and term.
Students are grouped by semester.
Each semester has a timetable and subjects.
Students can view subject timings in the Dashboard's Timetable according to their semester.
When teachers make timetable changes, students receive web push notifications immediately.

Teachers can:

- Modify timetables for subjects they teach in their respective semesters
- Teach multiple subjects
- Easily view their specific teaching times in the Dashboard Timeline
- Perform CRUD operations on resources (students, teachers, events, subjects, etc.)

Registration is closed to prevent outside access (login only).
Teachers must create student accounts.
Each Event on the Timetable is categorized by:

- Title
- Description
- Start Date
- End Date
- Subject
- Event type (tutorial, assignment, etc.)
- Repeat (for recurrence events)
- Color (based on subject color)

When a teacher modifies a semester's timetable, students in that semester receive web push notifications.

## Features

### For Students:

- View current semester timetable.
- Access profile information (name, major, year, results).
- Receive live event notifications created by teachers.

### For Teachers:

- Manage profile (basic info, teaching subjects).
- CRUD operations on students and teachers.
- Create and manage timetables for any major.
- View teaching subjects current timetables.
- Post live events (students get notified).

### General:

- Role-based access control (Student and Teacher).
- Secure login with JWT-based authentication.
- Push notifications support for real-time updates (iOS requires app installation to Home Screen).
- Responsive design for both mobile and desktop.
- Drag and drop events' dates edits

## Technologies Used

### Frontend:

- **Framework**: React, Next.js
- **Styling**: TailwindCSS, Shadcn UI (Dark/Light mode support)
- **State Management**: React Query
- **Libraries** : Devextreme UI Components (For Scheduler), React Hook Form, Zod (for validation)

### Backend:

- **Framework**: Next.js API
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT, NextAuth

## Implementations

- **Next.js Features**: Enhances user experience by utilizing Server-Side Rendering (SSR) for faster initial loads, Lazy Loading to optimize resource usage, and Prefetching to preload data for smooth navigation.
- **Loading UI with Skeletons**: Improves user experience by displaying skeleton loaders while data is being fetched, providing a visual cue during loading.
- **Infinite Scrolling** : Automatically loads more content as users click load more button.
- **Debouncing Search**: Delays the search input processing until the user stops typing, reducing unnecessary API calls and improving efficiency.
- **Array Field with React Hook Form**: Enables managing dynamic form fields as an array, making it easier to handle lists of inputs (selecting multiple teaching subjects).
- **Zod Validation**: Ensures consistent form validation on both client and server, providing type-safe and schema-based validation.
- **NextAuth with JWT**: Handles authentication securely using JWT for stateless session management in Next.js.
- **Vercel Edge Middleware**: Optimizes performance by running custom logic at the edge, allowing for faster response times.

## Challenges

- **Recurring Event System**: Built a system to manage recurring events with flexible schedules and optimized database storage for scalability.
- **Performance Optimization in Next.js**: Used lazy loading, SSR, and prefetching to improve page load speed and navigation for dynamic content.
- **React Query Integration**: Used React Query for efficient data fetching, caching, and synchronization, simplifying state management and improving user experience.
- **Database Query Optimization**: Optimized database queries for complex timetable relationships.
- **Web Push Notifications for iOS**: Added push notifications for iOS devices.
- **Optimized APIs**: Created APIs with sorting, filtering, and pagination for efficient data retrieval.
- **React Hook Form**: Used React Hook Form to manage forms and validation efficiently.
- **GitFlow**: Used GitFlow for managing branches during development, ensuring organized workflows for feature development, releases, and bug fixes.

## Application Pages

### General Users:

- **Homepage**: Introductory details of the system.
- **Login Page**: Secure login for students and teachers.

### For Students:

- **Timetable Page**: View semester timetable.
- **Events Page**: Filter and view events of semesters.
- **Profile Page**: Update personal information.

### For Teachers:

- **Dashboard Timelines**: Today's teaching schedule.
- **Timetables**: Manage timetables for assigned semesters.
- **Teachers Page**: Manage teacher details.
- **Students Page**: Manage student details.
- **Events Page**: Filter and view events of semesters.
- **Profile Page**: Update personal information.

## Installation

### Prerequisites:

- **Node.js** (v16 or later)
- **PostgreSQL** (Database setup required)

### Steps:

1.  Clone the repository:
    `git clone https://github.com/aungmoe32/ucms.git`
    `cd ucms`
2.  Install dependencies:
    `npm install`
3.  Configure the environment variables:

    - Copy `.env.example` to `.env.local` in the root directory.
    - Add required fields in `.env.local`

4.  Run database migrations (using Drizzle ORM):
    `npm run db:migrate`
    `npm run db:seed-sems`
    `npm run db:seed-subjects`
    `npm run db:seed-eventTypes`
5.  Start the development server:
    `npm run dev`
6.  Access the app at http://localhost:3000.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
