import { Tab, Tabs } from "@mui/material";
import { TemperatureChart } from "~components/TemperatureChart/TemperatureChart.tsx";
import { TemperatureHistogram } from "~components/TemperatureHistogram/TemperatureHistogram.tsx";
import { TemperatureTrendChart } from "~components/TemperatureTrendChart/TemperatureTrendChart.tsx";
import { TemperatureHumidityChart } from "~components/TemperatureHumidityChart/TemperatureHumidityChart.tsx";
import { SyntheticEvent, useState } from "react";
import { WeatherData } from "~types/weatherData.ts";
import {
  WeatherChartsPanelContainer,
  WeatherChartsPanelPaper,
} from "~pages/Home/WeatherChartsPanel/WeatherChartsPanel.styles.ts";

interface WeatherChartsPanelProps {
  data: WeatherData[];
  startDate: Date | null;
  endDate: Date | null;
}

export const WeatherChartsPanel = ({
  data,
  endDate,
  startDate,
}: WeatherChartsPanelProps) => {
  const [tabIndex, setTabIndex] = useState(0);

  const normalizeDate = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const filteredData = data.filter((entry) => {
    const entryDate = normalizeDate(new Date(entry.datetime));

    if (startDate && endDate) {
      const normalizedStart = normalizeDate(startDate);
      const normalizedEnd = normalizeDate(endDate);
      return entryDate >= normalizedStart && entryDate <= normalizedEnd;
    }

    if (startDate) {
      return entryDate >= normalizeDate(startDate);
    }

    if (endDate) {
      return entryDate <= normalizeDate(endDate);
    }

    return true;
  });

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <WeatherChartsPanelContainer>
      <WeatherChartsPanelPaper elevation={2}>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Температура (линейный)" />
          <Tab label="Гистограмма" />
          <Tab label="Скользящее среднее" />
          <Tab label="Темп. + Влажность" />
        </Tabs>
      </WeatherChartsPanelPaper>
      <>
        {tabIndex === 0 && <TemperatureChart data={filteredData} />}
        {tabIndex === 1 && <TemperatureHistogram data={filteredData} />}
        {tabIndex === 2 && <TemperatureTrendChart data={filteredData} />}
        {tabIndex === 3 && <TemperatureHumidityChart data={filteredData} />}
      </>
    </WeatherChartsPanelContainer>
  );
};
