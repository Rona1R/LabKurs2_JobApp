import {
  Box,
  Typography,
  Button,
  TextField,
  ThemeProvider,
} from "@mui/material";

import menuTheme from "../dashboard/styles/menuTheme";

export default function JobHeader({
  showFilters,
  nrOfFilters,
  searchTerm,
  setSearchTerm,
  categoryName,
  tagName,
  hasPostings,
}) {
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

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
          {categoryName ? (
            <>
              Find The Perfect Job
              <span style={{ color: "hsl(210, 100%, 80%)" }}>
                {" "}
                in {categoryName}{" "}
              </span>
            </>
          ) : tagName ? (
            <>
              Jobs Tagged with{" "}
              <span style={{ color: "hsl(210, 100%, 80%)" }}>#{tagName}</span>
            </>
          ) : (
            <>
              Find The Perfect{" "}
              <span style={{ color: "hsl(210, 100%, 80%)" }}>Job For You</span>
            </>
          )}
        </Typography>
        {hasPostings && (
          <>
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
                  <TextField
                    value={searchTerm}
                    placeholder="Search for job ..."
                    onChange={handleChange}
                    sx={{
                      backgroundColor: "hsl(211, 100.00%, 94.30%)",
                      width: { xs: "100%", lg: "350px" },
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
                </ThemeProvider>
              </Box>
            </Box>
          </>
        )}
      </Box>
      {!categoryName && !tagName && (
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
      )}
    </Box>
  );
}
