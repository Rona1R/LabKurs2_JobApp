import Navigation from "components/layout/user/Navigation";
import { Outlet } from "react-router";
import Box from '@mui/material/Box';
import Footer from "components/layout/user/Footer";

export default function UserLayout() {
  return (
    <div
    style={{
      // height:"100%",
      minHeight: '100vh', 
      display:"flex",
      flexDirection:"column"
    }}
    >
      <Navigation />
      <Box component="main" sx={{ paddingTop: "90px",flex:1 }}>
        {/* User Pages Nested Routes */}
        <Outlet/> 
      </Box>
      <Footer/>
    </div>
  );
}
