import { createTheme } from '@mui/material/styles';

const customTabPanelTheme = createTheme({
    components: {
      MuiTabs: {
        styleOverrides: {
          indicator: {
            backgroundColor: '#e8f0fe', 
            height:"3px",
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            color:"#e8f0fe",
            textTransform: 'none',  // Normal casing
            fontWeight:'bold',
            '&.Mui-selected': {
              color: '#e8f0fe',       
            },
          },
        },
      },
    },
  });

export default customTabPanelTheme;