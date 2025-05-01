import Snackbar from "@mui/material/Snackbar";
import { Box, SnackbarContent, Typography } from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function SavedSnackbar({ open, setOpen,handleCollection }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const content = (
    <SnackbarContent
      sx={{
        backgroundColor: "#0A0529",
        fontWeight: "bold",
        color: "#e8f0fe",
      }}
      message={
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ mr: 10 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              <CheckCircleIcon sx={{ mr: 1 }} />
              Job was saved
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                fontSize: "1.2em",
                color: "hsl(210, 100%, 80%)",
                backgroundColor:"inherit",
                border:"none"      
              }}
              component={"button"}
              onClick={handleCollection}
            >
              Manage
              <ArrowForwardIosIcon sx={{ ml: 1 }} />
            </Typography>
          </Box>
        </Box>
      }
    />
  );

  return (
    <Snackbar
      sx={{
        "& .MuiSnackbarContent-root": {
          borderRadius: "10px",
        },
      }}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={open}
      onClose={handleClose}
      autoHideDuration={2000}
    >
      {content}
    </Snackbar>
  );
}
