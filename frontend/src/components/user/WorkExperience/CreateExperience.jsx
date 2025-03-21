import * as React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../dashboard/styles/crud.css";
import { TextField, Box, ThemeProvider, Autocomplete } from "@mui/material";
import formTheme from "components/dashboard/styles/formTheme";
import { CompanyService } from "api/sevices/CompanyService";
import Grid from "@mui/material/Grid2";
import { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import menuTheme from "components/dashboard/styles/menuTheme";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ExperienceService } from "api/sevices/ExperienceService";
import dayjs from "dayjs";
import { useNotification } from "hooks/useNotification";
const companyService = new CompanyService();
const experienceService = new ExperienceService();

export default function CreateExperience(props) {
  const [formData, setFormData] = React.useState({
    userId: props.userId,
    companyId: null,
    manualCompanyName: "",
    jobTitle: "",
    description: "",
    startDate: null,
    endDate: null,
  });
  const [selectedCompany, setSelectedCompany] = React.useState(null);
  const [companies, setCompanies] = React.useState([]);
  const [jobError, setJobError] = React.useState("");
  const [companyError, setCompanyError] = React.useState("");
  const [startDateError, setStartDateError] = React.useState("");
  const [endDateError, setEndDateError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { handleClose } = props;
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await companyService.getAll();
        setCompanies(response.data);
      } catch (err) {
        console.log(err);
        handleClose();
      }
    };

    fetchData();
  }, [handleClose]);

  const handleCompanyChange = (event, newValue) => {
    if (newValue) {
      setSelectedCompany(newValue);
      setFormData({
        ...formData,
        companyId: newValue.id,
        manualCompanyName: "",
      });
      setCompanyError("");
    } else {
      setSelectedCompany(null);
      setCompanyError("");
      setFormData({ ...formData, companyId: null });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (newDate) => {
    setStartDateError("");
    setFormData({ ...formData, startDate: newDate });
  };

  const handleEndDateChange = (newDate) => {
    setEndDateError("");
    setFormData({ ...formData, endDate: newDate });
  };

  const validate = () => {
    if (formData.manualCompanyName === "" && formData.companyId === null) {
      setCompanyError(
        "A Company must be selected.If you don't find it in the options please enter name manually below!!"
      );
      return false;
    }

    if (formData.jobTitle.trim() === "") {
      setJobError("Job Title must be provided !");
      return false;
    }

    if (formData.startDate === null || isNaN(formData.startDate)) {
      setStartDateError("Start Date is not valid !");
      return false;
    }

    if (formData.endDate != null && isNaN(formData.endDate)) {
      setEndDateError("End Date is not valid !");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    const isValid = validate();

    if (isValid) {
      console.log(formData);
      const formattedStartDate = formData.startDate
        ? dayjs(formData.startDate).format("YYYY-MM-DD")
        : null;
      const formattedEndDate = formData.endDate
        ? dayjs(formData.endDate).format("YYYY-MM-DD")
        : null;
      const data = {
        ...formData,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      };
      try {
        await experienceService.create(data);
        props.refresh();
        showNotification("success","Experience was successfully created!");
      } catch (err) {
        showNotification("error","An Unexpected Error Occurred!");
      }
      handleClose();
    }
    setLoading(false);
  };
  return (
    <>
      <Modal show={true} onHide={handleClose} centered className="crud-modal">
        <Modal.Header closeButton>
          <Modal.Title> Add Experience </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ThemeProvider theme={formTheme}>
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { width: "100%" } }}
            >
              <Grid container spacing={3}>
                <Grid size={12}>
                  <ThemeProvider theme={menuTheme}>
                    <Autocomplete
                      id="autocomplete-company-select"
                      disabled={formData.manualCompanyName !== ""}
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
                          error={!!companyError}
                          helperText={
                            companyError ||
                            "If your company is not listed, please enter it below."
                          }
                        />
                      )}
                    />
                  </ThemeProvider>
                </Grid>
                <Grid size={12}>
                  <TextField
                    id="company-name"
                    disabled={formData.companyId != null}
                    name="manualCompanyName"
                    label="Company Name"
                    variant="outlined"
                    value={formData.manualCompanyName}
                    helperText={
                      "Enter your company name if it's not in the dropdown above."
                    }
                    onChange={(e) => {
                      setCompanyError("");
                      setFormData({ ...formData, companyId: null });
                      setSelectedCompany(null);
                      handleChange(e);
                    }}
                  />
                </Grid>{" "}
                <Grid size={12}>
                  <TextField
                    required
                    name="jobTitle"
                    label="Job Title"
                    variant="outlined"
                    value={formData.jobTitle}
                    error={!!jobError}
                    helperText={jobError}
                    onChange={(e) => {
                      handleChange(e);
                      setJobError("");
                    }}
                  />
                </Grid>
                <Grid size={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Start Date *"
                      value={formData.startDate}
                      onChange={handleDateChange}
                      required
                      //   error={!!startDateError}
                      //   helperText={startDateError}
                      slotProps={{
                        textField: {
                          error: !!startDateError,
                          helperText: startDateError,
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid size={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="End Date"
                      value={formData.endDate}
                      onChange={handleEndDateChange}
                      slotProps={{
                        textField: {
                          error: !!endDateError,
                          helperText:
                            endDateError ||
                            " If Ongoing, leave this field blank",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid size={12}>
                  <TextField
                    required
                    name="description"
                    label="Description"
                    variant="outlined"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    rows={5}
                  />
                </Grid>
              </Grid>
            </Box>
          </ThemeProvider>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit} className="crud-submit"  disabled={loading}>
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                style={{ marginRight: "10px" }}
              />
            ) : (
              <>Submit</>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
