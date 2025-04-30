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
import "./Register.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { AuthenticationService } from "src/api/sevices/auth/AuthenticationService";
import { validateEmail, validatePassword } from "src/components/common/utils/validationUtils";
import Alert from "src/components/common/Alert";

const authService = new AuthenticationService();

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

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [warnings, setWarnings] = useState({
    name: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setWarnings({ ...warnings, [e.target.name]: "" });
    setError("");
  };

  const validate = () => {
    if (formData.name.trim() === "") {
      setWarnings({ ...warnings, name: "First Name is required!" });
      return false;
    }
    if (formData.lastName.trim() === "") {
      setWarnings({ ...warnings, lastName: "Last Name is required!" });
      return false;
    }
    if (formData.username.trim() === "") {
      setWarnings({ ...warnings, username: "Username is required!" });
      return false;
    }
    if (formData.email.trim() === "") {
      setWarnings({ ...warnings, email: "Email is required!" });
      return false;
    }
    if (!validateEmail(formData.email)) {
      setWarnings({ ...warnings, email: "Invalid email format!" });
      return false;
    }
    if (formData.password.trim() === "") {
      setWarnings({ ...warnings, password: "Password is required!" });
      return false;
    }
    if (!validatePassword(formData.password)) {
      setWarnings({ ...warnings, password: "Password must contain at least one upper case digit,lower case digit,alphanumeric character,unique character and be at least 6 characters long!" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      await authService.register(formData);
      navigate("/login", { replace: true });
    } catch (err) {
      if (err.response.status === 400) {
        setError(err.response.data);
      } else {
        setError("An unexpected Error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDBContainer
      fluid
      className="p-4 background-radial-gradient overflow-hidden"
    >
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

          <Typography sx={{ color: "hsl(218, 81%, 85%)", fontSize: "1.5em" }}>
            Join the platform where opportunities meet talent. Create your
            profile today and take the first step toward building your future.
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
                <Link to="/">
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
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ "& .MuiTextField-root": { mb: 3, width: "100%" } }}
                >
                  <Grid container spacing={2}>
                    <Grid size={6}>
                      <TextField
                        label="First Name"
                        type="name"
                        //margin="dense"
                        name="name"
                        variant="outlined"
                        placeholder="Enter name..."
                        error={!!warnings.name}
                        helperText={warnings.name}
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid size={6}>
                      <TextField
                        label="Last Name"
                        type="lastName"
                        name="lastName"
                        variant="outlined"
                        placeholder="Enter last name..."
                        error={!!warnings.lastName}
                        helperText={warnings.lastName}
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid size={12}>
                      <TextField
                        label="Username"
                        type="username"
                        name="username"
                        variant="outlined"
                        placeholder="Enter username..."
                        error={!!warnings.username}
                        helperText={warnings.username}
                        value={formData.username}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid size={12}>
                      <TextField
                        label="Email"
                        name="email"
                        type="email"
                        variant="outlined"
                        placeholder="Enter email..."
                        error={!!warnings.email}
                        helperText={warnings.email}
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid size={12}>
                      <TextField
                        label="Password"
                        name="password"
                        type="password"
                        variant="outlined"
                        placeholder="Enter password..."
                        error={!!warnings.password}
                        helperText={warnings.password}
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                  {error && <Alert message={error} />}
                  <Button
                    className="sign-up-button"
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    sx={{
                      mt: 2,
                      color: "white",
                      fontSize: "1rem",
                      padding: "10px 0",
                      height: "60px",
                    }}
                  >
                    {loading ? "Signing Up..." : "Sign Up"}
                  </Button>
                </Box>
              </ThemeProvider>
              <Box mt={2} textAlign="center">
                <Typography variant="h6">
                  Already have an account?{" "}
                  <Link to="/login">
                    <span style={{ fontWeight: "bold" }}>Log In</span>
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
