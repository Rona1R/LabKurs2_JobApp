import { createTheme } from "@mui/material";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

const formTheme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "gray",
          fontWeight: "bold",
          "&.MuiInputLabel-shrink": {
            color: "#1e1b46",
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "#1D1D1D",
          fontWeight: "bold",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontWeight: "bold",
          "&:hover fieldset": {
            borderColor: "#1e1b46",
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "#1e1b46",
          },
          "& input[readonly]": {
            backgroundColor: "#f0f0f0",
            color: "#777",
            cursor: "default",
          },
        },
      },
    },
  },
});

export default formTheme;
