import { createTheme } from "@mui/material";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

const filterDropdownTheme = createTheme({
  components: {
    MuiMenuItem:{
      styleOverrides:{
        root:{
          color: 'black',
          fontWeight:"bold",
          paddingTop:"10px",
          paddingBottom:"10px"
        } 
      }
    },
    MuiInputLabel: {
        styleOverrides: {
          root: {
            fontSize:"20px",
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
            fontSize:"20px",
            color:"hsl(210, 100.00%, 86.10%)",
            "& fieldset": {
              borderColor: "hsl(210, 100.00%, 86.10%)", 
            },
            '& .MuiSelect-select': {
              padding: '20px', 
            },
            '& .MuiSelect-icon': {
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
      }
  }
});
export default filterDropdownTheme;
