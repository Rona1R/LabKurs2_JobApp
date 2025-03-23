import React from "react";
import { TextField, Button, Box, ThemeProvider } from "@mui/material";
import Grid from "@mui/material/Grid2"; // Corrected import for Grid2
import "../../../pages/Authentication/Register/Register.css";
import formTheme from "../../../components/dashboard/styles/formTheme";

function PasswordChangeForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle password change logic here
  };

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { mb: 3, width: "100%" } }}
    >
      <ThemeProvider theme={formTheme}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              required
              label="Old Password"
              type="password"
              variant="outlined"
            />
          </Grid>
          <Grid size={12}>
            <TextField
              required
              label="New Password"
              type="password"
              variant="outlined"
            />
          </Grid>
          <Grid size={12}>
            <TextField
              required
              label="Confirm Password"
              type="password"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </ThemeProvider>
      <Button
        className="sign-up-button"
        variant="contained"
        onClick={handleSubmit}
        fullWidth
        sx={{
          mt: 2,
          color: "white",
          fontSize: "1rem",
          padding: "10px 0",
          height: "60px",
        }}
      >
        Save Changes
      </Button>
    </Box>
  );
}

export default PasswordChangeForm;
