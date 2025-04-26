import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';

const theme = createTheme({
  components: {
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontWeight: "bold",
          fontSize: "1.2rem",
          color: "#333333",
        },
      },
    },
  },
});

const JobDetailsList = ({ items, title }) => {
  return (
    <div>
      <Typography
        variant="h5"
        component="div"
        sx={{
          fontWeight: 700,
          color: "rgb(15, 18, 93)",
          display: "flex",
          alignItems: "center",
          textAlign: "start",
          ml:7
        }}
      >
        {title}
      </Typography>
      <ThemeProvider theme={theme}>
        <List>
          {items.map((item, index) => (
            <ListItem key={index} disablePadding sx={{pb:0.5}}>
              <ListItemIcon>
                <CircleIcon sx={{ color: "rgba(29, 33, 136, 0.75)",fontSize:"15px" }} />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </ThemeProvider>
    </div>
  );
};

export default JobDetailsList;
