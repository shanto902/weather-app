# Weather App 🌦️

This is a responsive Weather App that fetches real-time weather data using RapidAPI. The app is built with Semantic UI for styling and Redux for state management, while Axios is used for API calls. It provides users with an intuitive interface to search for current weather details of any location.

## Features

- ### Real-Time Weather Data:
  - Fetches current weather information using RapidAPI.
- ### Responsive Design:
  - Uses Semantic UI for consistent and mobile-friendly UI components.
- ### State Management:
  - Leverages Redux for managing the state efficiently.
- ### API Integration:
  - Axios is used for seamless API calls.

## Technologies Used

- ### Frontend:
  - React & Semantic UI for responsive and modern styling.
- ### State Management:
  - Redux for managing app state.
- ### API Integration:
  - Axios for making HTTP requests to RapidAPI's weather endpoint.

## Installation

1. Clone the repository:

```
git clone https://github.com/shanto902/weather-app.git

cd weather-app
```

2. Install dependencies:

```
npm install
```

3. Create a .env file in the root directory and add your RapidAPI key:

```
VITE_RAPID_API_KEY=[Rapid API key]
VITE_API_URL=[Rapid API URL]
VITE_API_HOST=[Rapid API Host]
```

4. Start the development server:

```
npm run dev
```

## Usage

1. Open the app in your browser at http://localhost:5173

2. Enter a location in the search bar to view current weather details.

3. The app will display temperature, Day & night and other relevant information.

## Code Overview

State Management (Redux)

- Actions: Define actions for fetching and storing weather data.
- Reducers: Handle state updates based on actions.
- Store: Configures the Redux store for the app.

## API Integration

- Axios is used to call RapidAPI's weather endpoint

```
const fetchWeather = async (location) => {
  const response = await axios.get(`https://rapidapi-endpoint`, {
    headers: {
      'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
      'x-rapidapi-host': 'weather-api-host',
    },
    params: { location },
  });
  return response.data;
};
```

## Styling

Semantic UI is used for consistent design elements such as:

- Search bar
- Weather card
- Responsive grid layout
