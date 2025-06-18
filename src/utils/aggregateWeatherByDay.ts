import { DailyWeather, WeatherData } from "~types/weatherData.ts";

export const aggregateWeatherByDay = (data: WeatherData[]): DailyWeather[] => {
  const grouped = data.reduce(
    (acc, entry) => {
      const dateKey = entry.datetime.slice(0, 10);
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(entry);
      return acc;
    },
    {} as Record<string, WeatherData[]>,
  );

  return Object.entries(grouped).map(([date, items]) => {
    const temperature =
      items.reduce((sum, el) => sum + el.temperature, 0) / items.length;
    const humidity =
      items.reduce((sum, el) => sum + el.humidity, 0) / items.length;

    return {
      date,
      temperature: parseFloat(temperature.toFixed(1)),
      humidity: parseFloat(humidity.toFixed(1)),
    };
  });
};
