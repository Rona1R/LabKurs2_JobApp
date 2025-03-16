import Offcanvas from "react-bootstrap/Offcanvas";
import {
  faChartLine,
  faBookmark,
  faGear,
  faFolderOpen,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./UserSidebar.css";
import { Link } from "react-router-dom";

const theme = createTheme({
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          width: "100%",
          height: "90px",
          "&:hover &:active": {
            color: "black",
          },
        },
      },
    },
    MuiListItemText :{
      styleOverrides:{
        primary: {
          color: "#0F0520",
          fontWeight: "bold", 
          fontSize:"1.5rem"
        },
      }
    },
    MuiListItemIcon:{
      styleOverrides:{
        root:{
          fontWeight:"bold",
          color: "#0F0520",
          fontSize:"1.5rem"
        }
      }
    }
  },
});

function UserSidebar({ show, handleClose, ...props }) {
  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        {...props}
        className="user-sidebar"
      >
        <Offcanvas.Header closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="profilePicture">
            <Avatar
              alt="Rona Rushiti"
              src="/static/images/avatar/2.jpg"
              sx={{ width: 125, height: 120 }}
            />
          </div>
          <ThemeProvider theme={theme}>
            <div className="usersidebarList">
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "#f4f7ff",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                className="userSidebarList"
              >
                {/* per userin qe osht logged in route param ka me qene id-ja qe u rujt kur u bo log in */}
                <Link to="/profile/1" className="sidebarlink"> 
                  <ListItemButton onClick={handleClose}>
                    <ListItemIcon>
                      <FontAwesomeIcon icon={faUser} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </ListItemButton>
                </Link>
                <Link to="/account" className="sidebarlink">
                  <ListItemButton onClick={handleClose}>
                    <ListItemIcon>
                      <FontAwesomeIcon icon={faGear} />
                    </ListItemIcon>
                    <ListItemText primary="Account Settings"/>
                  </ListItemButton>
                </Link>

                  <Link to="/dashboard" className="sidebarlink">
                    <ListItemButton onClick={handleClose}>
                      <ListItemIcon>
                        <FontAwesomeIcon icon={faChartLine} />
                      </ListItemIcon>
                      <ListItemText primary="Dashboard" />{" "}
                    </ListItemButton>
                  </Link>

                <Link to="/" className="sidebarlink">
                  <ListItemButton onClick={handleClose}>
                    <ListItemIcon>
                      <FontAwesomeIcon icon={faBookmark} />
                    </ListItemIcon>
                    <ListItemText primary="Saved Jobs" />
                  </ListItemButton>
                </Link>
                <Link to="/MyOrder" className="sidebarlink">
                  <ListItemButton onClick={handleClose}>
                    <ListItemIcon>
                      <FontAwesomeIcon icon={faFolderOpen} />
                    </ListItemIcon>
                    <ListItemText primary="My Applications" />
                  </ListItemButton>
                </Link>
                <ListItemButton onClick={handleClose}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Log out" />
                </ListItemButton>
              </List>
            </div>
          </ThemeProvider>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default UserSidebar;