import { Drawer, Box, IconButton, Button } from "@mui/material";
import CheckboxMenu from "./CheckboxMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import FilterSelect from "./FilterSelect";
import { useState, useEffect } from "react";
import PayRangeFilter from "./PayRangeFilter";
import countryList from "react-select-country-list";
import { fetchCitiesForCountry } from "src/api/sevices/external/fetchCitiesByCountry";
import { kosovoCities } from "src/components/dashboard/Employer/Jobs/CreateJob/kosovoCities";

export default function FilterSidebar({
  isOpen,
  handleClose,
  filters,
  setFilters,
  handleApplyFilters,
  clearFilters,
  payRange,
  setPayRange,
  companies,
  categories,
  maxSalary
}) {
  const [cities, setCities] = useState([]);
  const additionalCountry = [
    {
      value: "Kosova",
      label: "Kosova",
    },
  ];
  const countriesOptions = countryList().getData();
  const countries = [...additionalCountry, ...countriesOptions].map(
    (country) => ({
      id: country.value,
      name: country.label,
    })
  );

  const handlePayChange = (event, newValue) => {
    setPayRange(newValue);
  };

  const handleFilters = async (selected, filterType) => {
    if (filterType === "country") {
      if (selected === "") {
        setCities([]);
      } else {
        if (selected === "Kosova") {
          setCities(kosovoCities.map((city) => ({ id: city, name: city })));
        } else {
          const filteredCities = await fetchCitiesForCountry(selected);
          setCities(filteredCities.map((city) => ({ id: city, name: city })));
        }
      }
    }
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: selected,
    }));
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
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "hsla(210, 82.50%, 84.30%, 0.85)",
            borderRadius: "10px",
            border: "2px solidrgb(209, 202, 255)",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#888",
          },
          scrollbarWidth: "thin",
          scrollbarColor: "hsla(210, 82.50%, 84.30%, 0.85) #0A0529",
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
      <Box sx={{ pt: 1 }}>
        <CheckboxMenu
          label="Job Type"
          options={["Full-time", "Part-time", "Temporary", "Contractual"]}
          selected={filters.jobTypes}
          setSelected={(selected) => handleFilters(selected, "jobTypes")}
        />
        <CheckboxMenu
          label="Salary Type"
          options={["Hourly", "Monthly", "Yearly"]}
          selected={filters.salaryTypes}
          setSelected={(selected) => handleFilters(selected, "salaryTypes")}
        />
        <CheckboxMenu
          label="Date Posted"
          options={["Any time", "Past month", "Past Week", "Past 24 hours"]}
          selected={filters.datePosted}
          isRadioButton={true}
          setSelected={(selected) => handleFilters(selected, "datePosted")}
        />
        <FilterSelect
          value={filters.categoryId}
          setValue={(selected) => handleFilters(selected, "categoryId")}
          label={"Select Category"}
          all={"All Categories"}
          options={categories}
        />
        <FilterSelect
          value={filters.companyId}
          setValue={(selected) => handleFilters(selected, "companyId")}
          label={"Select Company"}
          all={"All Companies"}
          options={companies}
        />
        <FilterSelect
          value={filters.country}
          setValue={(selected) => handleFilters(selected, "country")}
          label={"Select Country"}
          all={"All Countries"}
          options={countries}
        />
        <FilterSelect
          value={filters.city}
          setValue={(selected) => handleFilters(selected, "city")}
          label={"Select City"}
          all={"All Cities"}
          isDisabled={filters.country === ""}
          options={cities}
        />

        {/* <FilterSelect
          value={filters.categoryId}
          setValue={(selected) => handleFilters(selected, "categoryId")}
          label={"Select Category"}
          all={"All Categories"}
          options={categories}
        /> */}
        {/* <FilterSelect
          value={filters.companyId}
          setValue={(selected) => handleFilters(selected, "companyId")}
          label={"Select Company"}
          all={"All Companies"}
          options={companies}
        /> */}
        <PayRangeFilter value={payRange} max={maxSalary} onChange={handlePayChange} />
      </Box>
      <Box
        sx={{
          mx: 2,
          my: 1,
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
            color: "#0A0529",
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
            backgroundColor: "#151034",
            color: "hsla(210, 82.50%, 84.30%, 0.85)",
            "&:hover": {
              backgroundColor: "#0A0529",
            },
          }}
        >
          Clear Filters
        </Button>
      </Box>
    </Drawer>
  );
}
