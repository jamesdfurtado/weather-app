# 🌤️ Weather App

A full-stack weather app!

Users can sign up with secure 2FA and password hashing.

Current forecasts for cities can be viewed, and favorite locations can be saved for easy access.

This project was built to explore full-stack development with a focus on clean UI, real-time API interaction, and secure user data handling.

---

## Tech Stack

**Frontend:** React.js  
**Backend:** Java Spring Boot  
**Database:** MySQL  
**Authentication:** Firebase Phone Auth  
**Weather Data:** OpenWeatherMap API

---

## Features

- **Search by City:** Get current weather by typing any city name
- **Saved Locations:** Save and quickly switch between favorite cities
- **Phone Auth:** Secure login/signup with SMS via Firebase
- **Weather API:** Powered by OpenWeatherMap
- **MySQL Database:** Saves user/location data
  
---

## Setup Guide

### Prerequisites

Make sure you have these installed before you begin:

- Node.js
- Java JDK 17+
- Maven
- MySQL Server + Workbench
- [OpenWeatherMap API Key](https://openweathermap.org/api)
- [Firebase Console Account](https://console.firebase.google.com/)

---

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```

Create a .env file based on .env.example and add your Firebase project credentials and API base URL.

Then start the React dev server:

```bash
npm start
```

### 3. Database Setup

Open MySQL Workbench

Connect to your local MySQL server and run the script found in "sql/".

### 4. Firebase Setup (Phone Auth)

Go to Firebase Console

Create a new project

Add a web app to get your API keys (used in frontend .env)

Enable Phone Authentication under "Authentication" → "Sign-in Method"

Generate a Service Account JSON under "Project Settings" → "Service Accounts"

Download the JSON and move it to the backend folder as:

```bash
backend/firebase.json
```

Update your backend .env file (see .env.example) with:

### 5. Backend Setup

```bash
cd backend
```

Make sure firebase.json is in this directory. Then run:

```bash
mvn spring-boot:run
```

Backend will start on http://localhost:8080.

### Folder Structure
```
weather-app/
│
├── frontend/            # React frontend (port 3000)
│   └── .env             # Frontend env template
│
├── backend/             # Spring Boot backend (port 8080)
│   └── firebase.json    # Firebase service account (not committed)
│   └── .env             # Backend env template
│
└── sql/
```

### Usage

Open http://localhost:3000

Search a city to view current weather

Sign up with phone number (You'd have to either enable billing in firebase or add "test" numbers to simulate the process)

Save cities to your account for quick access

---

### Contact
Built by James Furtado
Feel free to reach out with questions, ideas, or feedback. jamesdfurtado@gmail.com
