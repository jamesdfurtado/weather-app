# Weather App

A full-stack weather app! :)

---

## My Stack

- **Frontend**: React.js
- **Backend**: Java Spring Boot
- **Database**: MySQL
- **API**: OpenWeatherMap API
  
---

## Features

- **Search for Weather**: Look up the current weather by city name.
- **Location-based Weather**: Automatically fetch weather data for your current location.
- **User Authentication**: Sign up or sign in to save and manage your favorite locations.
- **Saved Locations**: View saved locations as tabs and switch between them to display weather instantly.
- **Responsive Design**: Adaptable for various screen sizes.

---

## Installation Guide

### Prerequisites

1. **Node.js**: Install Node.js for running the frontend.
2. **Java**: Install Java Development Kit (JDK) for the backend.
3. **Maven**: Install Maven for running the backend
4. **MySQL**: Install MySQL Server and MySQL Workbench.
5. **API Key**: Obtain an API key from [OpenWeatherMap](https://openweathermap.org/api).

### Steps

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
```

#### 2. Frontend Setup

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Add the OpenWeatherMap API key in `ApiCall.js`.
4. Start the React app:
   ```bash
   npm start
   ```

#### 3. Database Setup

1. Open MySQL Workbench and click on your Local Instance (localhost:3306).
2. Create the database schema:
   ```sql
   CREATE DATABASE weather_app_db;
   ```
3. Tables are automatically created by the backend on first run.
   

#### 4. Backend Setup

1. Navigate to the `backend/src/main/resources` folder:
   ```bash
   cd ../backend/src/main/resources
   ```
2. Update `application.properties` with your MySQL credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/weather_app_db
   spring.datasource.username=your_mysql_username
   spring.datasource.password=your_mysql_password
   spring.jpa.hibernate.ddl-auto=update
   ```
3. Navigate back to the `backend` folder:
4. Build and run the backend:
   ```bash
   mvn spring-boot:run
   ```

---

## Usage

1. Visit the frontend at `http://localhost:3000`.
2. Use the search bar to look up weather information.
3. Sign up to save your favorite locations.
4. Saved locations appear as tabs; click on them to view weather instantly.

---

## Folder Structure

```
weather-app/
|-- frontend/      # React frontend
|-- backend/       # Java Spring Boot backend
|-- README.md      # Project documentation
```

---

---

## Contact

If you have any questions or feedback, please contact me at [jamesdfurtado@gmail.com](mailto:jamesdfurtado@gmail.com).

