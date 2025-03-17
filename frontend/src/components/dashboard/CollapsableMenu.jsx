import React, { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  ListItem,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import "./styles/dashboardSidebar.css";

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

function CollapsableMenu(props) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={theme}>
      <List sx={{ bgcolor: "inherit",mb:1} } component="nav" disablePadding>
        <ListItem /*sx={{pl:4}} */>
          <ListItemButton onClick={handleClick}>
          <FontAwesomeIcon
            icon={props.fontAwesomeIcon}
            style={{ fontSize: "2rem" ,paddingRight: "20px" }}
          />
            <ListItemText primary={props.name} />
            {open ? (
              <FontAwesomeIcon
                icon={faChevronUp}
                style={{ fontSize: "2rem" }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faChevronDown}
                style={{ fontSize: "2rem" }}
              />
            )}
          </ListItemButton>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {props.children.map((child, index) => (
              <ListItem key={index}>
                <Link
                  to={child.path}
                  style={{ color: "white", width: "100%" }}
                  className={`dashboard-sidebar-link ${props.currentLocation === child.path ? 'active' : ''}`}
                >
                  <ListItemButton sx={{ pl:4 }}>
                    <FontAwesomeIcon
                      icon={child.fontAwesomeIcon}
                      style={{ fontSize: "2rem",paddingRight:"20px" }}
                    />
                    <ListItemText primary={child.name} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </ThemeProvider>
  );
}

export default CollapsableMenu;
