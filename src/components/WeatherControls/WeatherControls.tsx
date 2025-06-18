import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ru } from "date-fns/locale/ru";
import { Box, TextField } from "@mui/material";
import { WeatherControlsContainer } from "~components/WeatherControls/WeatherControls.styles.ts";

interface Props {
  city: string;
  onCityChange: (value: string) => void;
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (value: Date | null) => void;
  onEndDateChange: (value: Date | null) => void;
  minDate?: Date | null;
  maxDate?: Date | null;
}

export const WeatherControls = ({
  city,
  onCityChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  minDate = null,
  maxDate = null,
}: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
      <WeatherControlsContainer>
        <TextField
          fullWidth
          label="Выберите город"
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
        />
        <Box display={"flex"} gap={2}>
          <DatePicker
            label="Дата начала"
            value={startDate}
            onChange={onStartDateChange}
            slotProps={{ textField: { fullWidth: true } }}
            minDate={minDate ?? undefined}
            maxDate={endDate ? endDate : (maxDate ?? undefined)}
          />
          <DatePicker
            label="Дата окончания"
            value={endDate}
            onChange={onEndDateChange}
            slotProps={{ textField: { fullWidth: true } }}
            minDate={startDate ? startDate : (minDate ?? undefined)}
            maxDate={maxDate ?? undefined}
          />
        </Box>
      </WeatherControlsContainer>
    </LocalizationProvider>
  );
};
