import { WeatherData } from "~types/weatherData.ts";

interface OpenWeatherForecastResponse {
  list: {
    dt: number;
    main: {
      temp: number;
      humidity: number;
    };
  }[];
}

export const mapWeatherForecastResponse = (
  raw: OpenWeatherForecastResponse,
): WeatherData[] => {
  return raw.list.map((entry) => ({
    datetime: new Date(entry.dt * 1000).toISOString(),
    temperature: parseFloat(entry.main.temp.toFixed(1)),
    humidity: entry.main.humidity,
  }));
};
