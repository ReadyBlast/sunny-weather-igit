import { apiClient } from "~shared/api/apiClient.ts";
import { WeatherData } from "~types/weatherData.ts";
import { mapWeatherForecastResponse } from "~utils/mapWeatherForecastResponse.ts";

export const fetchForecast = async (city: string): Promise<WeatherData[]> => {
  const { data } = await apiClient.get("/forecast", {
    params: {
      q: city,
      appid: import.meta.env.VITE_API_KEY,
      units: "metric",
    },
  });

  return mapWeatherForecastResponse(data);
};
