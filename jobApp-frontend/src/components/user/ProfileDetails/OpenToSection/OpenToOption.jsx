import { Paper, Typography, Box, IconButton,ThemeProvider } from "@mui/material";
import { useState } from "react";
import { TextField } from "@mui/material";
import formTheme from "src/components/dashboard/styles/formTheme";

export default function OpenToOption({
  option,
  optionLabel,
  defaultDescription,
  optionDescription,
  saveChanges,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(optionDescription);

  const handleClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSave = () => {
    setIsEditing(false);
    saveChanges(optionLabel, description);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        margin: 2,
        transition: "0.3s",
        boxShadow: "0 4px 20px 0 rgba(40, 22, 111, 0.17)",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
        },
        borderRadius: "10px", // Rounded corners
        backgroundColor: optionDescription
          ? "rgba(138, 144, 255, 0.08)"
          : "white",
        cursor: "pointer", // Change cursor on hover
        border: optionDescription ? "1px solid rgba(28, 11, 95, 0.95)" : "none",
      }}
      onClick={handleClick}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          marginBottom: 1,
          color: "rgba(28, 11, 95, 0.95)",
        }}
      >
        {option}
      </Typography>
      {isEditing ? (
        <>
          <Box
            sx={{
                display:"flex",
                justifyContent:"flex-end",
                mb:1
            }}
          >
            <IconButton onClick={handleCancel}>
              <i className="fa-solid fa-xmark"></i>
            </IconButton>
            <IconButton onClick={handleSave}>
              <i className="fa-solid fa-check" style={{ color: "green" }}></i>
            </IconButton>
          </Box>
          <ThemeProvider theme={formTheme}>
            <TextField
                value={description}
                onChange={handleDescriptionChange}
                variant="outlined"
                size="small"
                fullWidth
                autoFocus
            />
          </ThemeProvider>
        </>
      ) : (
        <Typography
          variant="subtitle1"
          sx={{ marginBottom: 2, fontWeight: "bold", color: "#424242" }}
        >
          {optionDescription || defaultDescription}
        </Typography>
      )}
    </Paper>
  );
}
