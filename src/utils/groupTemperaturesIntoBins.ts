import { WeatherData } from "~types/weatherData.ts";

interface HistogramBin {
  range: string;
  count: number;
}

export const groupTemperaturesIntoBins = (
  data: WeatherData[],
  step = 5,
): HistogramBin[] => {
  const bins = new Map<string, number>();

  data.forEach(({ temperature }) => {
    const binStart = Math.floor(temperature / step) * step;
    const binLabel = `${binStart}–${binStart + step}`;
    bins.set(binLabel, (bins.get(binLabel) || 0) + 1);
  });

  return Array.from(bins.entries())
    .sort(([a], [b]) => parseInt(a) - parseInt(b))
    .map(([range, count]) => ({ range, count }));
};
