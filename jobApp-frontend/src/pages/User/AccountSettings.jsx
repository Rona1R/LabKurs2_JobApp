import {
  Container,
  Box,
  Typography,
  Divider,
  Tab,
  Tabs,
  ThemeProvider,
} from "@mui/material";
// import ProfileForm from "../../components/user/Settings/ProfileForm";
import PasswordChangeForm from "src/components/user/Settings/PasswordChangeForm";
// import PasswordChangeForm from "../../components/user/Settings/PasswordChangeForm";
import Grid from "@mui/material/Grid2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import "./styles/AccountSettings.css";
import tabsTheme from "./styles/TabsTheme";
import { useState } from "react";
import ProfileForm from "src/components/user/Settings/ProfileForm";

export default function AccountSettings(){
    const [value, setValue] = useState("General");

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <>
        <Box sx={{ backgroundColor: "#0A0529", height: "300px" }} />
        <Container sx={{ mt: -20, mb: 15 }}>
          <Box
            sx={{
              py: 7,
              px: { xs: 6, md: 20 },
            }}
            className="settings-container"
          >
            <Grid display={"flex"} justifyContent={"center"}
            sx={{mt: -12}}
            >
              <Typography
                sx={{
                  fontFamily: "sans-serif",
                  fontWeight: 700,
                  fontSize:{xs:"1em",md:"2em"},
                }}
                className="account-settings-label"
              >
                Account Settings
                <FontAwesomeIcon icon={faGear} style={{ marginLeft: "10px" }} />
              </Typography>
            </Grid>
            <Divider
              sx={{
                backgroundColor: "#0A0529",
                marginBottom: 5,
                marginTop: 5,
                borderWidth: "1px",
              }}
            />
            <ThemeProvider theme={tabsTheme}>
              <Tabs
                value={value}
                onChange={handleChange}
                id="settings-tabs"
                centered
                sx={{ fontSize: { xs: "10px",md:"1em"} }}
              >
                <Tab value="General" label="General" className="settings-tab" />
                <Tab value="Password" label="Password" className="settings-tab" />
              </Tabs>
            </ThemeProvider>
  
            {value === "General" && <ProfileForm />}
  
            {value === "Password" && (
              <Box sx={{ mt: 8, mb: 8 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    pb: 3,
                    textAlign: "start",
                  }}
                >
                  Change Password
                </Typography>
                <PasswordChangeForm />
              </Box>
            )}
          </Box>
        </Container>
      </>
    )
}