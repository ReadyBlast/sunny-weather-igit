import { WeatherData } from "~types/weatherData.ts";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "@mui/material";
import { aggregateWeatherByDay } from "~utils/aggregateWeatherByDay.ts";

type TemperatureChartProps = {
  data: WeatherData[];
};

export const TemperatureChart = ({ data }: TemperatureChartProps) => {
  const theme = useTheme();
  const processedData = aggregateWeatherByDay(data);

  return (
    <ResponsiveContainer width={"100%"} height={300} minWidth={320}>
      <LineChart data={processedData}>
        <CartesianGrid stroke={theme.palette.divider} strokeDasharray={"3 3"} />
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
          labelFormatter={(str) => new Date(str).toLocaleString("ru-RU")}
          contentStyle={{
            backgroundColor: theme.palette.background.paper,
            borderColor: theme.palette.divider,
            color: theme.palette.text.primary,
          }}
          labelStyle={{ color: theme.palette.text.primary }}
        />
        <Line
          type="monotone"
          dataKey="temperature"
          stroke={theme.palette.primary.main}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
