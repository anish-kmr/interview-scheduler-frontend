import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      // light:"#4e4f8f",
      // main:"#1e2761",
      // dark:"#000037"
      main: "#143d59"
    },
    secondary: {
      // light:"#ac4f73",
      // main:"#7a2048",
      // dark:"#4a0021",
      main: "#efefef"
    },
  },
  components: {

    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: '1.4rem',
        },
      },
    },

    MuiCheckbox: {
      root: { fontSize: "2rem" }
    },
    MuiSvgIcon: {
      root: { fontSize: "3rem", color: "red" }

    },

  },
});

export default theme;