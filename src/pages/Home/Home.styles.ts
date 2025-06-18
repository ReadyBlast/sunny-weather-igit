import { Button, styled } from "@mui/material";

export const HomeButton = styled(Button)({
  position: "absolute",
  top: "1rem",
  left: "1rem",
});

export const HomeContentContainer = styled("div")({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
});

export const HomeLoaderWrapper = styled("div")({
  zIndex: 345523,
  position: "absolute",
  background: "darkgray",
  height: "100%",
  width: "100%",
});
