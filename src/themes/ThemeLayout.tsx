import { Button, CssBaseline, styled, ThemeProvider } from "@mui/material";
import { ReactNode, useMemo, useState } from "react";
import { lightTheme } from "./lightTheme.ts";
import { darkTheme } from "./darkTheme.ts";

const ThemeLayoutButton = styled(Button)({
  position: "absolute",
  top: "1rem",
  right: "1rem",
});

export const ThemeLayout = ({ children }: { children?: ReactNode }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const theme = useMemo(
    () => (mode === "light" ? lightTheme : darkTheme),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeLayoutButton
        onClick={() => setMode((prev) => (prev === "light" ? "dark" : "light"))}
        size={"small"}
      >
        Toggle Theme
      </ThemeLayoutButton>
      {children}
    </ThemeProvider>
  );
};
