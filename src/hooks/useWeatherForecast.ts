import { useQuery } from "@tanstack/react-query";
import { WeatherData } from "~types/weatherData.ts";
import { fetchForecast } from "~shared/api";

export const useWeatherForecast = (city: string) => {
  return useQuery<WeatherData[]>({
    queryKey: ["forecast", city],
    queryFn: () => fetchForecast(city),
    staleTime: 500 * 60 * 10,
  });
};
