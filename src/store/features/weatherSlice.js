import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWeatherData } from "../../services/weatherAPI";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (location, { rejectWithValue }) => {
    try {
      const weatherData = await fetchWeatherData(location);
      return weatherData;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch weather data"
      );
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    current: null,
    history: [],
  },
  reducers: {
    addToHistory: (state, action) => {
      state.history.push(action.payload);
      if (state.history.length > 3) {
        state.history.shift(); //  last 3 items
      }
    },
    clearHistory: (state) => {
      state.history = []; // Clear history
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.current = action.payload;
    });
  },
});

export const { addToHistory } = weatherSlice.actions;
export default weatherSlice.reducer;
