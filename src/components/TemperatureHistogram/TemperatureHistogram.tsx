import { WeatherData } from "~types/weatherData.ts";
import { useTheme } from "@mui/material";
import { groupTemperaturesIntoBins } from "~utils/groupTemperaturesIntoBins.ts";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface TemperatureHistogramProps {
  data: WeatherData[];
}

export const TemperatureHistogram = ({ data }: TemperatureHistogramProps) => {
  const theme = useTheme();
  const bins = groupTemperaturesIntoBins(data, 5);

  return (
    <ResponsiveContainer minWidth={320} width={"100%"} height={300}>
      <BarChart data={bins}>
        <CartesianGrid stroke={theme.palette.divider} />
        <XAxis
          dataKey={"range"}
          stroke={theme.palette.text.secondary}
          label={{
            value: "Температурный диапазон (°C)",
            position: "insideBottom",
            offset: -5,
          }}
        />
        <YAxis
          stroke={theme.palette.text.secondary}
          allowDecimals={false}
          label={{
            value: "Кол-во измерений",
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: theme.palette.background.paper,
            borderColor: theme.palette.divider,
            color: theme.palette.text.primary,
          }}
        />
        <Bar dataKey="count" fill={theme.palette.primary.main} barSize={30} />
      </BarChart>
    </ResponsiveContainer>
  );
};
