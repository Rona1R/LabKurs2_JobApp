import { Drawer, Box, IconButton, Button } from "@mui/material";
import CheckboxMenu from "./CheckboxMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function FilterSidebar({
  isOpen,
  handleClose,
  filters,
  setFilters,
  handleApplyFilters,
  clearFilters,
}) {
  const handleFilters = (selected, filterType) => {
    if (filterType === "jobType") {
      setFilters({ ...filters, jobTypes: selected });
    } else if (filterType === "salaryType") {
      setFilters({ ...filters, salaryTypes: selected });
    } else if (filterType === "datePosted") {
      setFilters({ ...filters, datePosted: selected });
    }
  };

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={handleClose}
      sx={{
        [`& .MuiDrawer-paper`]: {
          boxSizing: "border-box",
          backgroundColor: "#0A0529",
          width: { xs: "100%", sm: "360px" },
        },
      }}
    >
      <IconButton
        onClick={handleClose}
        sx={{
          color: "hsla(210, 82.50%, 84.30%, 0.85)",
          mt: 2,
          ml: "auto",
          mr: 2,
        }}
      >
        <FontAwesomeIcon icon={faX} />
      </IconButton>
      <Box sx={{ pt: 5 }}>
        <CheckboxMenu
          label="Job Type"
          options={["Full-time", "Part-time", "Temporary", "Contractual"]}
          selected={filters.jobTypes}
          setSelected={(selected) => handleFilters(selected, "jobType")}
        />
        <CheckboxMenu
          label="Salary Type"
          options={["Hourly", "Monthly", "Yearly"]}
          selected={filters.salaryTypes}
          setSelected={(selected) => handleFilters(selected, "salaryType")}
        />
        <CheckboxMenu
          label="Date Posted"
          options={["Any time", "Past month", "Past Week", "Past 24 hours"]}
          selected={filters.datePosted}
          isRadioButton={true}
          setSelected={(selected) => handleFilters(selected, "datePosted")}
        />
      </Box>
      <Box
        sx={{
          mx: 2,
          mt: 3,
        }}
      >
        <Button
          onClick={handleApplyFilters}
          sx={{
            textTransform: "none",
            width: "100%",
            py: 1,
            fontWeight: "bold",
            fontSize: "large",
            color:"#0A0529",
            backgroundColor: "hsla(210, 100.00%, 81.60%, 0.85)",
            "&:hover": {
              backgroundColor: "hsla(210, 91.40%, 72.70%, 0.85)", 
            },
          }}
        >
          Apply Filters
        </Button>
        <Button
          onClick={clearFilters}
          sx={{
            textTransform: "none",
            width: "100%",
            mt: 1,
            py: 1,
            fontWeight: "bold",
            fontSize: "large",
            backgroundColor: "#616161", 
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor:"#4B4745", 
            },
          }}
        >
          Clear Filters
        </Button>
      </Box>
    </Drawer>
  );
}
