import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router";
import { useMemo, useState } from "react";
import { useDebounce } from "react-use";
import { WeatherChartsPanel } from "~pages/Home/WeatherChartsPanel/WeatherChartsPanel.tsx";
import { WeatherControls } from "~components/WeatherControls/WeatherControls.tsx";
import { HomeButton, HomeContentContainer } from "~pages/Home/Home.styles.ts";
import { useWeatherForecast } from "~hooks/useWeatherForecast";

export const Home = () => {
  const navigate = useNavigate();
  const [cityInputValue, setCityInputValue] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [debounceVal, setDebounceVal] = useState(cityInputValue);

  useDebounce(
    () => {
      setDebounceVal(cityInputValue);
    },
    300,
    [cityInputValue],
  );

  const { data, isLoading } = useWeatherForecast(debounceVal);

  const [minDate, maxDate] = useMemo(() => {
    if (!data || data.length === 0) return [null, null];

    const dates = data.map((item) => new Date(item.datetime));
    return [
      new Date(Math.min(...dates.map((date) => date.getTime()))),
      new Date(Math.max(...dates.map((date) => date.getTime()))),
    ];
  }, [data]);

  // Обработчики с автоматической коррекцией зависимых дат
  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    if (date && endDate && date > endDate) {
      setEndDate(null);
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    if (date && startDate && date < startDate) {
      setStartDate(null);
    }
  };

  return (
    <>
      <HomeButton
        type={"button"}
        variant={"contained"}
        size={"small"}
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        Logout
      </HomeButton>
      <HomeContentContainer>
        <WeatherControls
          city={cityInputValue}
          onCityChange={setCityInputValue}
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
          minDate={minDate}
          maxDate={maxDate}
        />
        {isLoading ? (
          <Skeleton variant={"rectangular"} width={"100%"} height={380} />
        ) : (
          <WeatherChartsPanel
            data={data || []}
            startDate={startDate}
            endDate={endDate}
          />
        )}
      </HomeContentContainer>
    </>
  );
};
