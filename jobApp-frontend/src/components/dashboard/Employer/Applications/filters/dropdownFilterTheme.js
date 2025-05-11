import { createTheme } from "@mui/material";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
const dropdownFilterTheme = createTheme({
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "hsla(211, 53.50%, 8.40%, 0.95)",
          fontWeight: "bold",
          paddingTop: "15px",
          paddingBottom: "15px",
          paddingLeft: "10px",
          fontSize: "1.1em",
          "&.Mui-selected": {
            "&:hover": {
              color:"black",
              backgroundColor: "rgba(41, 120, 247, 0.4)",
            },
          },
          "&:hover": {
            backgroundColor: "hsl(210, 96.50%, 77.50%)",
            color: "black",
          }
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "hsl(210, 82.50%, 84.30%)",
          border: "1px solid hsla(210, 82.50%, 84.30%, 0.2)",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor:"#120A3A",
            borderRadius: "10px",
            border: "2px solid rgb(209, 202, 255)",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#888",
          },
          scrollbarWidth: "thin",
          scrollbarColor: "#120A3A hsla(210, 82.50%, 84.30%, 0.85)"
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "20px",
          color: "#151034",
          fontWeight: "bold",
          "&.MuiInputLabel-shrink": {
            color: "#151034",
          },
          "&.Mui-disabled": {
            color: "rgba(255, 255, 255, 0.78)"
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: "20px",
          color: "#151034",
          "& fieldset": {
            borderColor: "#151034",
          },
          "& .MuiSelect-select": {
            padding: "20px",
          },
          "& .MuiSelect-icon": {
            color: "#151034",
          },
          "&:hover fieldset": {
            borderColor: "hsl(210, 100.00%, 86.10%)",
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "#151034",
          },
          "&.Mui-disabled": {
            backgroundColor: "rgba(247, 242, 242, 0.18)",
            "& .MuiSelect-icon": {
              color: "rgba(255, 255, 255, 0.5)",
            }
          },
        },
      },
    },
  },
});
export default dropdownFilterTheme;