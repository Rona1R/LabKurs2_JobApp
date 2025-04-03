import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemButton,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import CollapsableMenu from "../../components/dashboard/CollapsableMenu";
import { faBriefcase, faBuilding, faChartPie, faCircleCheck, faClipboard, faComputer,faFolderOpen, faHouse, faList, faMedal, faNoteSticky, faTable, faUniversity, faUser, faUserTie, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../components/dashboard/styles/dashboardSidebar.css";
import { useLocation } from "react-router-dom";

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
const drawerWidth = 350;

const navLinks = [
  {
    name: "Home",
    path: "/",
    fontAwesomeIcon: faHouse,
  },
  {
    name:"Dashboard",
    path:"/dashboard",
    fontAwesomeIcon:faChartPie
  },
  {
    name:"Users",
    fontAwesomeIcon: faUser,
    children: [
      {
        fontAwesomeIcon: faTable,
        name:"All Users",
        path:"/dashboard/users"

      },{
        fontAwesomeIcon: faUserTie,
        name:"Employers",
        path:"/dashboard/employers"
      },{
        fontAwesomeIcon: faCircleCheck,
        name:"Roles",
        path:"/"
      }
    ]
  },
  {
    name: "Companies",
    path: "/dashboard/companies",
    fontAwesomeIcon: faBriefcase,
  },
  {
    name: "Departments",
    path: "/dashboard/departments",
    fontAwesomeIcon: faBuilding,
  },
  {
    name: "Languages",
    path: "/dashboard/languages",
    fontAwesomeIcon: faBuilding,
  },
  {
    name: "Categories",
    path: "/dashboard/categories",
    fontAwesomeIcon: faList,
  },
  {
    name : "Instituions",
    path:"/",
    fontAwesomeIcon : faUniversity
  },
  {
    name : "Jobs",
    fontAwesomeIcon: faBriefcase,
    children : [
      {
        fontAwesomeIcon : faFolderOpen,
        name : "Postings",
        path:"/dashboard/jobPostings"
      },{
        fontAwesomeIcon : faClipboard,
        name : "Applications",
        path:"/"
      },{
        fontAwesomeIcon : faComputer,
        name : "Interviews",
        path:"/"
      }
    ]
  },
  {
    name : "Blogs",
    fontAwesomeIcon: faNoteSticky,
    path:"/"
  },{
    name: "Testimonials",
    fontAwesomeIcon:faMedal,
    path:"/"
  }
];

function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  // console.log(location);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ overflow: "auto" }}>
      <List sx={{ mt: 7 }}>
        {navLinks.map((item, index) =>
          item.children ? (
            <CollapsableMenu
              key={index}
              name={item.name}
              fontAwesomeIcon={item.fontAwesomeIcon}
              children={item.children}
              currentLocation = {location.pathname}
            />
          ) : (
            <ListItem key={index} sx={{ mb: 1 }}>
              <Link
                to={item.path}
                style={{ color: "white", width: "100%" }}
                className={`dashboard-sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <ListItemButton>
                  <FontAwesomeIcon
                    icon={item.fontAwesomeIcon}
                    fontSize={"2rem"}
                    style={{ paddingRight: "20px" }}
                  />
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </Link>
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex"}}>
        {/* AppBar                            , ml: { md: `${drawerWidth}px`                                     // ml - margin-left ...*/}
        <AppBar
          position="fixed"
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            backgroundColor: "#fff",
            ml: { md: `${drawerWidth}px` },
          }}
        >
          <Toolbar sx={{ padding: "20px" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon
                sx={{
                  fontSize: "40px",
                  color: "#010529",
                  stroke: "#010529",
                  strokeWidth: 1,
                }}
              />
            </IconButton>
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ color: "#0A0529", fontWeight: "bold" }}
            >
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Sidebar - Persistent on Larger Screens */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#0A0529",
              color: "white",
            },
          }}
          open
        >
          {drawer}
        </Drawer>

        {/* offcanvas sidebar for smaller screens ! */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#0A0529",
              color: "white",
              position: "relative",
            },
          }}
        >
          <Button
            style={{
              boxShadow: "none",
              position: "absolute",
              top: "20px",
              right: "10px",
              padding:"0px",
          
            }}
            onClick={() => setMobileOpen(false)}
          >
            <FontAwesomeIcon
              icon={faX}
              style={{ color: "white", fontSize: "1.8em" }}
            />
          </Button>
          {drawer}
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            // zIndex: 1,
            // marginTop:13,
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
            mt: "100px",
            overflowX:"hidden"
          }}
        >
          {/* <Toolbar sx={{padding:"50px"}}/> */}
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default Dashboard;
