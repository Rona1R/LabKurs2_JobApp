import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AdbIcon from "@mui/icons-material/Adb";
import UserSidebar from "../../../components/user/UserSidebar";
import CustomDropdown from "./Dropdown";
import CollapsedNavigation from "./CollapsedNavigation";
import { Link } from "react-router";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { CategoryService } from "../../../api/sevices/CategoryService";
const pages = [
  {
    name:"Job Postings",
    path:"/jobPostings"
  },{
    name:"Blogs",
    path:"/"
  },{
    name:"About Us",
    path:"/"
  }
]

const categoryService = new CategoryService();

function Navigation() {
  const [showUserSidebar, setShowUserSidebar] = React.useState(false);
  const [showCollapsedNav, setShowCollapsedNav] = React.useState(false);
  const [categories, setCategories] = React.useState([]);

  // const [profilePic,setProfilePic] = React.useState("");
  const isMobile = useMediaQuery("(max-width: 900px)");
  const loggedIn = "logged in...";

  React.useEffect(() => {
    if (categories.length === 0) {
      const fetchData = async () => {
        try {
          const response = await categoryService.getAll();
          setCategories(response.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
      // nese sjan already fetched ! -> qe mos mu bo fetch sa her tbohet toggle e veq kur komponenti bohet re-render qe e klikon
    }
  }, []);
  // const loggedUser = 1;
  // IDE ma e mir, te tdhanat e userit qe ruhen nlocal storage me rujt edhe foton e profilit qe me mujt me ja display on top tnavigation
  // nese e ndrron profilin -> veq ja bon update edhe foton nlocal storage


  // React.useEffect(()=>{

  //   if(loggedUser){
  //     const fetchData = async() => {
  //       try{
  //         const response = await userService.getById(loggedUser);
  //         setProfilePic(response.data.profilePic);
  //       }catch(err){
  //         console.log(err);
  //       }
  //     }
  //     fetchData();
  //   }
  // },[])

  const openSidebar = () => {
    // if (userDetails) {
    setShowUserSidebar(true);
    // } else {
    //   setShowUserSidebar(false);
    //   navigate("/LogIn");
    // }
  };

  const closeSidebar = () => {
    setShowUserSidebar(false);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#0A0529", zIndex: 1000 }}>
      <Container
        maxWidth={false}
        sx={{
          padding: "10px 0px",
        }}
      >
        <Toolbar disableGutters>
          <AdbIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              fontSize: "2rem",
            }}
          />
          <Typography
            variant="h4"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link to="/" style={{ color: "white" }}>
              LOGO
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => setShowCollapsedNav(true)}
              color="inherit"
            >
              <MenuIcon sx={{ fontSize: "3rem" }} />
            </IconButton>
            <CollapsedNavigation
              show={showCollapsedNav && isMobile}
              handleClose={() => setShowCollapsedNav(false)}
              categories = {categories}
              placement={"start"}
            />
          </Box>
          <AdbIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              fontSize: "2rem",
            }}
          />
          <Typography
            variant="h4"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "sans-serif",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link to="/" style={{ color: "white" }}>
              LOGO
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page,index) => (
              <Button
                key={index}
                // onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontFamily: "sans-serif",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  fontSize: "18px",
                }}
              >
                <Link to={page.path} style={{ color: "white" }}>
                  {page.name}
                </Link>
              </Button>
            ))}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomDropdown
                name="Categories"
                options={categories}
                // options={[
                //   {
                //     name: "Information Technology",
                //     link: "/",
                //   },
                //   {
                //     name: "Marketing & Social Media",
                //     link: "/",
                //   },
                //   {
                //     name: "Business Managment",
                //     link: "/",
                //   },
                // ]}
              />
            </Box>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {loggedIn ? (
              <Tooltip title="Open settings">
                <IconButton onClick={openSidebar} sx={{ p: 1 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  {/* <Avatar alt="Remy Sharp" src={`${process.env.REACT_APP_IMAGE_PATH}/${profilePic}`}/> */}
                </IconButton>
              </Tooltip>
            ) : (
              <IconButton sx={{ p: 1 }}>
                <FontAwesomeIcon
                  icon={faRightToBracket}
                  style={{ color: "white", height: "30px" }}
                />
              </IconButton>
            )}
            <UserSidebar
              placement="end"
              handleClose={closeSidebar}
              show={showUserSidebar}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navigation;
