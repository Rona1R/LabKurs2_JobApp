import {
  Box,
  Typography,
  Button,
  TextField,
  Autocomplete,
  ThemeProvider,
} from "@mui/material";
import menuTheme from "../../components/dashboard/styles/menuTheme";
import { useState } from "react";

export default function JobHeader({
  showFilters,
  nrOfFilters,
  searchTerm,
  setSearchTerm,
  searchJob,
  jobTitles,
}) {
  const [dropdownOpen,setDropdownOpen] = useState(false);

  const handleChange = (e) => {
    setDropdownOpen(e.target.value.length > 0);
    setSearchTerm(e.target.value);
  };

  const handleOpen = () => {
    if (searchTerm) {
      setDropdownOpen(true);
    }
  };

  const handleClose = () => {
    setDropdownOpen(false);
  };
  const handleSearch = () => {
    searchJob();
  };

  // const handleSearch = () => {
  //   searchJob(searchTerm);
  // }

  return (
    <Box
      sx={{
        backgroundColor: "#0A0529",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        padding: { xs: "40px 20px", md: "50px 80px", lg: "70px 90px" },
        flexDirection: "row",
        gap: 10,
      }}
    >
      <Box
        sx={{
          color: "white",
          maxWidth: { xs: "100%", md: "400px", lg: "650px" },
          textAlign: { xs: "center", lg: "left" },
          minWidth: 0,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginBottom: "10px",
            textAlign: { xs: "center", lg: "left" },
            fontSize: { lg: "40px" },
            mb: { lg: "20px" },
          }}
        >
          Find The Perfect{" "}
          <span style={{ color: "hsl(210, 100%, 80%)" }}>Job For You</span>
        </Typography>
        <Typography
          variant="h6"
          sx={{
            opacity: 0.8,
            fontWeight: "bold",
            textAlign: { xs: "center", lg: "left" },
            fontSize: { lg: "25px" },
          }}
        >
          Browse through the list of the most recent active job postings and
          apply filters to accelerate your job hunting experience
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 2,
            marginTop: "20px",
            justifyContent: { xs: "center", lg: "flex-start" },
            mx: { sm: 15, md: 0 },
          }}
        >
          <Button
            variant="contained"
            onClick={showFilters}
            sx={{
              backgroundColor: "hsl(210, 95.70%, 81.60%)",
              color: "#0A0529",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "hsl(210, 90%, 70%)",
              },
              fontSize: "18px",
              px: 4,
              py: 1,
            }}
          >
            Apply Filters {nrOfFilters ? `(${nrOfFilters})` : ""}
          </Button>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <ThemeProvider theme={menuTheme}>
              <Autocomplete
                freeSolo
                open = {dropdownOpen}
                onOpen={handleOpen}
                onClose={handleClose}
                sx = {{width: { xs: "100%",lg:"250px" }}}
                options={jobTitles.map((option) => option)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search for job ..."
                    onChange={handleChange}
                    sx={{
                      backgroundColor: "hsl(211, 100.00%, 94.30%)",
                      width: { xs: "100%",lg:"250px" },
                      borderRadius: "8px",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "hsl(210, 100%, 80%)" },
                        "&:hover fieldset": {
                          borderColor: "hsl(210, 90%, 70%)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "hsl(210, 100%, 60%)",
                        },
                      },
                    }}
                  />
                )}
                value={searchTerm}
                onChange={(event, newValue) => {
                  setSearchTerm(newValue);
                }}
              />
            </ThemeProvider>
            <Button
              variant="outlined"
              onClick={handleSearch}
              sx={{
                borderColor: "hsl(210, 100%, 80%)",
                color: "hsl(210, 100%, 80%)",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": { backgroundColor: "hsl(210, 100%, 15%)" },
                fontSize: "18px",
                px: 2,
                py: 1.3,
              }}
            >
              Search
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        component="img"
        src="/images/person-in-laptop.webp"
        alt="Hero Section Image"
        sx={{
          display: { xs: "none", md: "block" },
          width: { md: "250px", xl: "300px" },
          height: { md: "250px", xl: "300px" },
          objectFit: "contain",
        }}
      />
    </Box>
  );
}
