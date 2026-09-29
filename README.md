# College Event Management System - MERN

## Stack
- React + Vite
- Node.js + Express
- MongoDB + Mongoose

## Features
- Student registration
- Login / logout
- Create, view, search, edit and delete events
- Event registration
- Capacity and live participant count
- My registered events
- Cancel registration
- Dashboard statistics
- Event details

## Setup

### 1. Backend
cd server
npm install

Copy `.env.example` to `.env` and set your MongoDB connection string.

npm run dev

Backend runs at http://localhost:5000

### 2. Frontend
Open a second terminal:

cd client
npm install
npm run dev

Frontend normally runs at the Vite URL shown in the terminal.

## Note
This project intentionally uses simple login/logout with localStorage and does not implement JWT or role-based authorization, matching the requested project design.
