import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { Button, Typography, TextField, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AdbIcon from "@mui/icons-material/Adb";
import "./Register.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router";

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: "60px", // Set global height for input fields
        },
      },
    },
  },
});

function Register() {
  return (
    <MDBContainer fluid className="p-4 background-radial-gradient overflow-hidden">
      <MDBRow className="register-container">
        <MDBCol
          lg="6"
          className="text-center text-md-start d-flex flex-column justify-content-center register-text"
        >
          <Typography
            variant="h3"
            className="my-5 fw-bold"
            sx={{ color: "hsl(218, 81%, 95%)", lineHeight: 1.5 }}
          >
            Explore & Find <br />
            <span style={{ color: "hsl(218, 81%, 75%)" }}>Your Dream Job</span>
          </Typography>

          <Typography
            sx={{ color: "hsl(218, 81%, 85%)", fontSize: "1.5em"}}
          >
            Join the platform where opportunities meet talent. Create your profile
            today and take the first step toward building your future.
          </Typography>
        </MDBCol>

        <MDBCol lg="6" className="position-relative">
          <div
            id="radius-shape-1"
            className="position-absolute rounded-circle shadow-5-strong"
          ></div>
          <div
            id="radius-shape-2"
            className="position-absolute shadow-5-strong"
          ></div>

          <MDBCard className="my-5 bg-glass register-form">
            <MDBCardBody className="p-5">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb={4}
              >
                <AdbIcon sx={{ mr: 1, fontSize: "3rem" }} />
                <Link
                  to="/"
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontFamily: "monospace",
                      fontWeight: "bold",
                      letterSpacing: ".3rem",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    LOGO
                  </Typography>
                </Link>              
              </Box>

              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "inherit",
                  textAlign: "center",
                  mb: 3,
                }}
              >
                Create Your Account
              </Typography>
              <ThemeProvider theme={theme}>
                <Box component="form" sx={{ "& .MuiTextField-root": { mb: 3, width: "100%" } }}>
                  <Grid container spacing={2}>
                    <Grid size={6}>
                      <TextField
                        required
                        label="First Name"
                        variant="outlined"               
                      />
                    </Grid>
                    <Grid size={6}>
                      <TextField
                        required
                        label="Last Name"
                        variant="outlined"             
                      />
                    </Grid>
                    <Grid size={12}>
                      <TextField
                        required
                        label="Username"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid size={12}>
                      <TextField
                        required
                        label="Email"
                        type="email"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid size={12}>
                      <TextField
                        required
                        label="Password"
                        type="password"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    className="sign-up-button"
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 2,
                      color: "white",
                      fontSize: "1rem",
                      padding: "10px 0",
                      height:"60px"
                    }}
                  >
                    Sign Up
                  </Button>
                </Box>
              </ThemeProvider>
              <Box mt={2} textAlign="center">
                <Typography variant="h6">
                  Already have an account?{" "}
                  <Link to="/login">
                  <span style={{fontWeight:"bold"}}>
                    Log In
                  </span>
                  </Link>
                </Typography>
              </Box>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Register;
