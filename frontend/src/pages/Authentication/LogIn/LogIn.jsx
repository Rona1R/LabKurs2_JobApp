import React, { useState } from "react";
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
import "../Register/Register.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router";

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: "60px", 
        },
      },
    },
  },
});

function LogIn() {
  const [formData,setFormData]= useState({
    email:"",
    password:""
  })

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  return (
    <MDBContainer
      fluid
      className="p-4 background-radial-gradient overflow-hidden"
    >
      <MDBRow className="register-container">
        <MDBCol
          lg="6"
          className="position-relative order-2 order-lg-1" 
        >
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
                mb={8}
              >
                <AdbIcon sx={{ mr: 1, fontSize: "3rem" }} />
                <Typography
                  variant="h3"
                  component="a"
                  href="/"
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
              </Box>
              <ThemeProvider theme={theme}>
                <Box
                  component="form"
                  sx={{ "& .MuiTextField-root": { mb: 3, width: "100%" } }}
                >
                  <Grid container spacing={2} marginBottom={2}>
                    <Grid size={12}>
                      <TextField
                        required
                        label="Email"
                        type="email"
                        variant="outlined"
                        margin="dense"
                        name="email"
                        placeholder="Enter email..."
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid size={12}>
                      <TextField
                        required
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="dense"
                        name="password"
                        placeholder="Enter password..."
                        value={formData.password}
                        onChange={handleChange}
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
                      height: "60px",
                    }}
                  >
                    Log In
                  </Button>
                </Box>
              </ThemeProvider>
              <Box mt={2} textAlign="center">
                <Typography variant="h6">
                  Don't have an Account?{" "}
                  <Link to="/register">
                    <span style={{ fontWeight: "bold" }}>Sign Up</span>
                  </Link>
                </Typography>
              </Box>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol
          lg="6"
          className="text-center text-md-start d-flex flex-column justify-content-center register-text order-1 order-lg-2" 
        >
          <Typography
            variant="h3"
            className="my-5 fw-bold"
            sx={{ color: "hsl(218, 81%, 95%)", lineHeight: 1.5 }}
          >
            Welcome Back ! <br />
            <span style={{ color: "hsl(218, 81%, 75%)" }}>
              Log In to Your Account
            </span>
          </Typography>

          <Typography
            sx={{
              color: "hsl(218, 81%, 85%)",
              fontSize: "1.5em",
            }}
          >
            Access your profile, discover new opportunities, and continue
            building your future.
          </Typography>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default LogIn;
