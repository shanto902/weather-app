import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_RAPID_API_KEY;
const apiHost = import.meta.env.VITE_API_HOST;

// Cache object to store weather data
const cache = {};

export const fetchWeatherData = async (location, cached = true) => {
  // Check if cached data exists
  if (cached && cache[location]) {
    console.log("Using cached data for:", location);
    return cache[location]; // Return cached data if available
  }

  const options = {
    method: "GET",
    url: baseUrl,
    params: { q: location },
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": apiHost,
    },
  };

  try {
    const response = await axios.request(options);
    const weatherData = response.data;

    // Cache the data if not cached already
    if (cached) {
      console.log("Caching data for:", location);
      cache[location] = weatherData;
    }

    return weatherData;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    throw error;
  }
};
