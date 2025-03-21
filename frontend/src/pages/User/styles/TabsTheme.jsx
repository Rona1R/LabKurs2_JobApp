import { createTheme } from '@mui/material/styles';

const tabsTheme = createTheme({
    components: {
      MuiTabs: {
        styleOverrides: {
          indicator: {
            backgroundColor: '#0A0529', 
            height:"3px"
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            padding: '12px 24px',
            textTransform: 'none',  // Normal casing
            fontWeight:'bold',
            '&.Mui-selected': {
              color: '#0A0529',       
            },
          },
        },
      },
    },
  });

export default tabsTheme;