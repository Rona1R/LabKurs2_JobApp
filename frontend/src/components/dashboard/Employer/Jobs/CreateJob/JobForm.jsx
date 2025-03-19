import {
  TextField,
  Box,
  ThemeProvider,
  Autocomplete,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
} from "@mui/material";
import formTheme from "../../../styles/formTheme";
import Grid from "@mui/material/Grid2";
import countryList from "react-select-country-list";
import menuTheme from "../../../styles/menuTheme";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";
dayjs.extend(advancedFormat);

export default function JobForm({
  formData,
  errors,
  handleChange,
  setErrors,
  selectedCountry,
  handleCountryChange,
  cities,
  selectedCity,
  handleCityChange,
  step,
  companies,
  selectedCompany,
  handleCompanyChange,
  categories,
  selectedCategory,
  handleCategoryChange,
  handleDateChange,
}) {
  const now = dayjs();
  const additionalCountry = [
    {
      value: "Kosova",
      label: "Kosova",
    },
  ];
  const countriesOptions = countryList().getData();
  const countries = [...additionalCountry, ...countriesOptions];
  // value , label

  // cities : "string"

  return (
    <ThemeProvider theme={formTheme}>
      <Box
        component="form"
        sx={{ "& .MuiTextField-root": { mb: 3, width: "100%" } }}
      >
        <Grid container spacing={2}>
          {step === 1 ? (
            <>
              <Grid size={12}>
                <TextField
                  required
                  name="title"
                  label="Title"
                  variant="outlined"
                  value={formData.title}
                  error={!!errors.title}
                  helperText={errors.title}
                  onChange={(e) => {
                    handleChange(e);
                    setErrors({ ...errors, title: "" });
                  }}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  required
                  name="description"
                  label="Description"
                  variant="outlined"
                  value={formData.description}
                  error={!!errors.description}
                  helperText={errors.description}
                  onChange={(e) => {
                    handleChange(e);
                    setErrors({ ...errors, description: "" });
                  }}
                  multiline
                  rows={5}
                />
              </Grid>
              <Grid size={12}>
                <ThemeProvider theme={menuTheme}>
                  <Autocomplete
                    id="autocomplete-country-select"
                    options={countries}
                    getOptionLabel={(option) => `${option.label}`}
                    value={selectedCountry}
                    onChange={(event, newValue) => {
                      handleCountryChange(event, newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Country *"
                        error={!!errors.country}
                        helperText={errors.country || ""}
                      />
                    )}
                  />
                </ThemeProvider>
              </Grid>
              <Grid size={12}>
                <ThemeProvider theme={menuTheme}>
                  <Autocomplete
                    id="autocomplete-city-select"
                    options={cities}
                    value={selectedCity}
                    onChange={(event, newValue) => {
                      handleCityChange(event, newValue);
                    }}
                    disabled={!selectedCountry}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="City *"
                        error={!!errors.city}
                        helperText={errors.city || ""}
                      />
                    )}
                  />
                </ThemeProvider>
              </Grid>
              <Grid size={12}>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <ThemeProvider theme={menuTheme}>
                    <InputLabel id="demo-employment-select-label">
                      Employment Type *
                    </InputLabel>
                    <Select
                      labelId="demo-employment-select-label"
                      id="demo-employment-select"
                      name="employmentType"
                      value={formData.employmentType}
                      label="Emplyoment type *"
                      onChange={(e) => {
                        setErrors({ ...errors, employmentType: "" });
                        handleChange(e);
                      }}
                    >
                      <MenuItem value={"Full-Time"}>Full-Time</MenuItem>
                      <MenuItem value={"Part-Time"}>Part-Time</MenuItem>
                      <MenuItem value={"Temporary"}>Temporary</MenuItem>
                      <MenuItem value={"Contractual"}>Contractual</MenuItem>
                    </Select>
                  </ThemeProvider>
                  {errors.employmentType && (
                    <FormHelperText
                      sx={{ color: "#d32f2f", fontWeight: "bold" }}
                    >
                      {errors.employmentType}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </>
          ) : (
            <>
              <Grid size={{ md: 4, xs: 12 }}>
                <TextField
                  type="number"
                  name="minimalSalary"
                  label="Minimal Salary *"
                  variant="outlined"
                  slotProps={{
                    htmlInput: {
                      min: 0,
                    },
                  }}
                  value={formData.minimalSalary}
                  error={!!errors.minimalSalary}
                  helperText={errors.minimalSalary}
                  onChange={(e) => {
                    handleChange(e);
                    setErrors({ ...errors, minimalSalary: "" });
                  }}
                />
              </Grid>
              <Grid size={{ md: 4, xs: 12 }}>
                <TextField
                  type="number"
                  name="maximalSalary"
                  label="Maximal Salary *"
                  variant="outlined"
                  slotProps={{
                    htmlInput: {
                      min: 0,
                    },
                  }}
                  value={formData.maximalSalary}
                  error={!!errors.maximalSalary}
                  helperText={errors.maximalSalary}
                  onChange={(e) => {
                    handleChange(e);
                    setErrors({ ...errors, maximalSalary: "" });
                  }}
                />
              </Grid>
              <Grid size={{ md: 4, xs: 12 }}>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <ThemeProvider theme={menuTheme}>
                    <InputLabel id="demo-currency-select-label">
                      Currency *
                    </InputLabel>
                    <Select
                      labelId="demo-currency-select-label"
                      id="demo-currency-select"
                      name="currency"
                      value={formData.currency}
                      label="Currency *"
                      onChange={(e) => {
                        setErrors({ ...errors, currency: "" });
                        handleChange(e);
                      }}
                    >
                      <MenuItem value={"€"}>€</MenuItem>
                      <MenuItem value={"$"}>$</MenuItem>
                    </Select>
                  </ThemeProvider>
                  {errors.currency && (
                    <FormHelperText
                      sx={{ color: "#d32f2f", fontWeight: "bold" }}
                    >
                      {errors.currency}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid size={12}>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <ThemeProvider theme={menuTheme}>
                    <InputLabel id="salaryType-select-label">
                      Salary Type *
                    </InputLabel>
                    <Select
                      labelId="salaryType-select-label"
                      id="salaryType-select"
                      name="salaryPeriod"
                      value={formData.salaryPeriod}
                      label="Salary Type *"
                      onChange={(e) => {
                        setErrors({ ...errors, salaryPeriod: "" });
                        handleChange(e);
                      }}
                    >
                      <MenuItem value={"Hourly"}>Hourly</MenuItem>
                      <MenuItem value={"Monthly"}>Monthly</MenuItem>
                      <MenuItem value={"Yearly"}>Yearly</MenuItem>
                    </Select>
                  </ThemeProvider>
                  {errors.salaryPeriod && (
                    <FormHelperText
                      sx={{ color: "#d32f2f", fontWeight: "bold" }}
                    >
                      {errors.salaryPeriod}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid size={12}>
                <ThemeProvider theme={menuTheme}>
                  <Autocomplete
                    id="autocomplete-company-select"
                    options={companies}
                    getOptionLabel={(option) => `${option.name}`}
                    value={selectedCompany}
                    onChange={(event, newValue) => {
                      handleCompanyChange(event, newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Company *"
                        error={!!errors.company}
                        helperText={errors.company || ""}
                      />
                    )}
                  />
                </ThemeProvider>
              </Grid>
              <Grid size={12}>
                <ThemeProvider theme={menuTheme}>
                  <Autocomplete
                    id="autocomplete-category-select"
                    options={categories}
                    getOptionLabel={(option) => `${option.name}`}
                    value={selectedCategory}
                    onChange={(event, newValue) => {
                      handleCategoryChange(event, newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Category *"
                        error={!!errors.category}
                        helperText={errors.category || ""}
                      />
                    )}
                  />
                </ThemeProvider>
              </Grid>
              <Grid size={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      minDateTime={now}
                      label="Deadline *"
                      value={formData.deadline}
                      onChange={handleDateChange}
                      required
                      slotProps={{
                        textField: {
                          error: !!errors.deadline,
                          helperText: errors.deadline,
                        },
                      }}
                    />
                </LocalizationProvider>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
