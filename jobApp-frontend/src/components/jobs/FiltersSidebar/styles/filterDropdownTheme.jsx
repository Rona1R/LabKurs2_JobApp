import { createTheme } from "@mui/material";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

const filterDropdownTheme = createTheme({
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "hsla(210, 82%, 85%, 0.95)",
          fontWeight: "bold",
          paddingTop: "15px",
          paddingBottom: "15px",
          paddingLeft:"10px",
          fontSize:"1.1em",
          // backgroundColor: "#0A0529",
          "&.Mui-selected": {
            backgroundColor: "rgba(203, 195, 255, 0.25)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(203, 195, 255, 0.4)",
            },
          },
          "&:hover": {
            backgroundColor: "#0A0529",
            color: "white",
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "#151034",
          border: "1px solid hsla(210, 82.50%, 84.30%, 0.2)",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "hsla(210, 82.50%, 84.30%, 0.85)",
            borderRadius: "10px",
            border: "2px solid rgb(209, 202, 255)",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#888",
          },
          scrollbarWidth: "thin",
          scrollbarColor: "hsla(210, 82.50%, 84.30%, 0.85) #120A3A",
        },
      },
    },  
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "20px",
          color: "hsl(210, 100.00%, 86.10%)",
          fontWeight: "bold",
          "&.MuiInputLabel-shrink": {
            color: "hsl(210, 100.00%, 86.10%)",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: "20px",
          color: "hsl(210, 100.00%, 86.10%)",
          "& fieldset": {
            borderColor: "hsl(210, 100.00%, 86.10%)",
          },
          "& .MuiSelect-select": {
            padding: "20px",
          },
          "& .MuiSelect-icon": {
            color: "#90CAF9",
          },
          "&:hover fieldset": {
            borderColor: "hsl(210, 100.00%, 86.10%)",
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "hsl(210, 100.00%, 86.10%)",
          },
        },
      },
    },
  },
});
export default filterDropdownTheme;
