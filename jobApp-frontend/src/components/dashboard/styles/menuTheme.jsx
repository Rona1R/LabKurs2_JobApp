import { createTheme } from "@mui/material";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

const menuTheme = createTheme({
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        option: {  
          color: '#070616', 
          fontWeight:"bold",
          paddingTop:"10px",
          paddingBottom:"10px"
        },
      }
    },
    MuiMenuItem:{
      styleOverrides:{
        root:{
          color: '#070616', 
          fontWeight:"bold",
          paddingTop:"10px",
          paddingBottom:"10px"
        } 
      }
    },
    MuiFormHelperText : {
      styleOverrides: {
       root: {
         color:"#1D1D1D",
         fontWeight:"bold"
       }
      }
     },
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
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "&:hover fieldset": {
              borderColor: "#1e1b46", 
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "#1e1b46",
            },
          },
        },
      },
  }
});
export default menuTheme;
