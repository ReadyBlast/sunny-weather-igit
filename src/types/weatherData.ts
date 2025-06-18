export interface WeatherData {
  datetime: string;
  temperature: number;
  humidity: number;
}

export interface DailyWeather {
  date: string; // формат: "2025-06-17"
  temperature: number;
  humidity: number;
}
