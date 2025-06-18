import { DailyWeather } from "~types/weatherData.ts";

type SmoothedWeatherData = DailyWeather & { smoothed: number };

export const calculateMovingAverage = (
  data: DailyWeather[],
  windowSize: number = 5,
): SmoothedWeatherData[] => {
  const result: SmoothedWeatherData[] = [];

  for (let i = 0; i < data.length; i++) {
    const windowStart = Math.max(0, i - windowSize + 1);
    const window = data.slice(windowStart, i + 1);
    const average =
      window.reduce((sum, d) => sum + d.temperature, 0) / window.length;

    result.push({
      ...data[i],
      smoothed: +average.toFixed(1), // возвращаем число
    });
  }

  return result;
};
