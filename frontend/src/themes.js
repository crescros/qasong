import { createMuiTheme } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
const qasongOrange = process.env.REACT_APP_QASONG_COLOR_1;

export const darkTheme = createMuiTheme({
  palette: {
    background: {
      default: grey[900],
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

export const lightTheme = createMuiTheme({
  palette: {
    background: {
      default: grey[50],
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
