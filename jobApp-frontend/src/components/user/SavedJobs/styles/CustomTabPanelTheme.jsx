import { createTheme } from '@mui/material/styles';

const customTabPanelTheme = createTheme({
    components: {
      MuiTabs: {
        styleOverrides: {
          indicator: {
            backgroundColor: 'hsl(210, 100%, 80%)', 
            height:"3px",
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            color:"hsl(210, 100%, 80%) ",
            textTransform: 'none',  // Normal casing
            fontWeight:'bold',
            '&.Mui-selected': {
              color: 'hsl(210, 100%, 80%) ',       
            },
          },
        },
      },
    },
  });

export default customTabPanelTheme;