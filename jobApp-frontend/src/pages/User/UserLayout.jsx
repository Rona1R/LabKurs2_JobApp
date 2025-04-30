import Navigation from "src/components/layout/user/Navigation";
import { Outlet } from "react-router";
import Box from '@mui/material/Box';
import Footer from "src/components/layout/user/Footer";

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
      <Box component="main" sx={{ paddingTop: {xs:"90px",md:"100px"},flex:1 }}>
        {/* User Pages Nested Routes */}
        <Outlet/> 
      </Box>
      <Footer/>
    </div>
  );
}
