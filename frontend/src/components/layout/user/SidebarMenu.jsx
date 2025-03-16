import React, { useState } from "react";
import { List, ListItemButton, ListItemText, Collapse } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";

const theme = createTheme({
  components: {
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontWeight: "bold",
          fontSize: "1.5rem",
        },
      },
    },
  },
});

function SidebarMenu({ categories, handleClose }) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={theme}>
      <List sx={{ width: "100%", bgcolor: "inherit" }} component="nav">
        <ListItemButton onClick={handleClick} sx={{ mb: 3 }}>
          <ListItemText primary="Categories" />
          {open ? (
            <FontAwesomeIcon
              icon={faChevronUp}
              style={{ color: "white", fontSize: "2rem" }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faChevronDown}
              style={{ color: "white", fontSize: "2rem" }}
            />
          )}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {categories.map((category) => (
              <ListItemButton
                sx={{ pl: 4, mb: 2 }}
                key={category.id}
                onClick={handleClose}
              >
                <Link to="/jobPostings" style={{ color: "white" }}>
                  <ListItemText primary={category.name} />
                </Link>
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>
    </ThemeProvider>
  );
}

export default SidebarMenu;
