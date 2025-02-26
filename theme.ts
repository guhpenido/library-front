import { createTheme } from "@mui/material/styles";
import { createGlobalStyle } from "styled-components";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

export default theme;
export const globalColors = {
    primary: "#535EE0",
    secondary: "#223645",
    text: "#414141",
    accent: "#535EE0",
    fc28385: "#1B3096",
};

export const gradientBackground = `linear-gradient(45deg, ${globalColors.primary} 30%, ${globalColors.secondary} 90%)`;

export const GlobalStyle = createGlobalStyle`
    body {
        background: ${gradientBackground};
        margin: 0;
        padding: 0;
        font-family: ${theme.typography.fontFamily};
    }
`;