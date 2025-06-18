import { WeatherData } from "~types/weatherData.ts";
import { useTheme } from "@mui/material";
import { calculateMovingAverage } from "~utils/calculateMovingAverage.ts";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { aggregateWeatherByDay } from "~utils/aggregateWeatherByDay.ts";

interface TemperatureTrendChartProps {
  data: WeatherData[];
}

export const TemperatureTrendChart = ({ data }: TemperatureTrendChartProps) => {
  const theme = useTheme();
  const processedData = aggregateWeatherByDay(data);
  const chartData = calculateMovingAverage(processedData);

  return (
    <ResponsiveContainer minWidth={320} height={300} width={"100%"}>
      <LineChart data={chartData}>
        <CartesianGrid stroke={theme.palette.divider} />
        <XAxis
          dataKey={"date"}
          stroke={theme.palette.text.secondary}
          tickFormatter={(str) =>
            new Date(str).toLocaleDateString("ru-RU", {
              day: "2-digit",
              month: "short",
            })
          }
        />
        <YAxis unit="°C" stroke={theme.palette.text.secondary} />
        <Tooltip
          contentStyle={{
            backgroundColor: theme.palette.background.paper,
            borderColor: theme.palette.divider,
            color: theme.palette.text.primary,
          }}
        />
        <Line
          type="monotone"
          dataKey="temperature"
          stroke={theme.palette.primary.main}
          strokeWidth={2}
          dot={false}
          name="Температура"
        />
        <Line
          type="monotone"
          dataKey="smoothed"
          stroke={theme.palette.secondary.main}
          strokeDasharray="5 5"
          strokeWidth={2}
          dot={false}
          name="Скользящее среднее"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
