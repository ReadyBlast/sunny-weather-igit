import { Box, Paper, styled } from "@mui/material";

export const WeatherChartsPanelContainer = styled(Box)({
  display: "flex",
  gap: "1rem",
  flexDirection: "column",
  width: "100%",
  paddingTop: "1rem",
});

export const WeatherChartsPanelPaper = styled(Paper)(({ theme }) => ({
  mb: 2,
  backgroundColor: theme.palette.background.paper,
}));
