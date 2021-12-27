import { createTheme } from "@material-ui/core/styles";
const qasongOrange = process.env.REACT_APP_QASONG_COLOR_1;

export const darkTheme = createTheme({
  palette: {
    background: {
      default: "#141414",
    },
    primary: {
      main: "#000",
    },
    secondary: {
      main: qasongOrange,
      dark: "#fff",
      contrastText: "#fff",
    },
    type: "dark",
  },
  shadows: ["none"],
});

export const lightTheme = createTheme({
  palette: {
    background: {
      default: "#ebebeb",
    },
    primary: {
      main: "#fff",
    },
    secondary: {
      main: qasongOrange,
      dark: "#fff",
      contrastText: "#fff",
    },
    type: "light",
  },
  shadows: ["none"],
});
