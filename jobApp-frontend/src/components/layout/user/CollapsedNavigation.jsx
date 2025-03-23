import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import SidebarMenu from "./SidebarMenu";
import AdbIcon from "@mui/icons-material/Adb";
import { Typography } from "@mui/material";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
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

export default function CollapsedNavigation({
  show,
  handleClose,
  categories,
  ...props
}) {
  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        {...props}
        style={{ backgroundColor: "#0A0529" }}
      >
        <Offcanvas.Header
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            style={{ backgroundColor: "inherit", boxShadow: "none" }}
            onClick={handleClose}
          >
            <FontAwesomeIcon
              icon={faX}
              style={{ color: "white", fontSize: "1.8em" }}
            />
          </Button>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ color: "white" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "50px",
            }}
          >
            <AdbIcon
              sx={{
                mr: 1,
                fontSize: "2.5rem",
              }}
            />
            <Typography
              variant="h4"
              noWrap
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Link to="/" style={{ color: "white" }} onClick={handleClose}>
                LOGO
              </Link>
            </Typography>
          </div>
          <ThemeProvider theme={theme}>
            <List component="div" disablePadding>
              <ListItemButton sx={{ mb: 2 }} onClick={handleClose}>
                <Link to="/jobPostings" style={{ color: "white" }}>
                  <ListItemText primary="Job Postings" />
                </Link>
              </ListItemButton>
              <ListItemButton sx={{ mb: 2 }} onClick={handleClose}>
                <Link to="/" style={{ color: "white" }}>
                  <ListItemText primary="Blogs" />
                </Link>
              </ListItemButton>
              <ListItemButton sx={{ mb: 2 }} onClick={handleClose}>
                <Link to="/" style={{ color: "white" }}>
                  <ListItemText primary="About Us" />
                </Link>
              </ListItemButton>
            </List>
          </ThemeProvider>
          <SidebarMenu categories={categories} handleClose={handleClose} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
