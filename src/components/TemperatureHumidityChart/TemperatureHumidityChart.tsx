import { useTheme } from "@mui/material/styles";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { WeatherData } from "~types/weatherData.ts";
import { aggregateWeatherByDay } from "~utils/aggregateWeatherByDay.ts";

interface Props {
  data: WeatherData[];
}

export const TemperatureHumidityChart = ({ data }: Props) => {
  const theme = useTheme();
  const processedData = aggregateWeatherByDay(data);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={processedData}>
        <CartesianGrid stroke={theme.palette.divider} />
        <XAxis
          dataKey="date"
          stroke={theme.palette.text.secondary}
          tickFormatter={(str) =>
            new Date(str).toLocaleDateString("ru-RU", {
              day: "2-digit",
              month: "short",
            })
          }
        />
        <YAxis
          yAxisId="left"
          unit="°C"
          stroke={theme.palette.primary.main}
          label={{ value: "Температура", angle: -90, position: "insideLeft" }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          unit="%"
          stroke={theme.palette.secondary.main}
          label={{ value: "Влажность", angle: -90, position: "insideRight" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: theme.palette.background.paper,
            borderColor: theme.palette.divider,
            color: theme.palette.text.primary,
          }}
        />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="temperature"
          stroke={theme.palette.primary.main}
          dot={true}
          name="Температура"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="humidity"
          stroke={theme.palette.secondary.main}
          dot={false}
          name="Влажность"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
