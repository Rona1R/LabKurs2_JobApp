import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../styles/crud.css";
import {
  TextField,
  Box,
  ThemeProvider,
  Autocomplete,
  FormControl,
  FormHelperText,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import formTheme from "../../styles/formTheme";
import menuTheme from "../../styles/menuTheme";
import Grid from "@mui/material/Grid2";
import Spinner from "react-bootstrap/Spinner";
import { useNotification } from "src/hooks/useNotification";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";
import { JobApplicationService } from "src/api/sevices/JobApplicationService";
import { JobService } from "src/api/sevices/JobService";
import { InterviewService } from "src/api/sevices/InterviewService";
const applicationService = new JobApplicationService();
const jobPostingsService = new JobService();
const interviewService = new InterviewService();
dayjs.extend(advancedFormat);

export default function CreateInterview({
  userId,
  selectedDate,
  handleClose,
  refresh,
}) {
  const now = dayjs();
  const [formData, setFormData] = useState({
    applicationId: null,
    duration: "",
    interviewMode: "",
  });
  const [errors, setErrors] = useState({
    application: "",
    duration: "",
    interviewMode: "",
  });
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [postings, setPostings] = useState([]);
  const [selectedPosting, setSelectedPosting] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await jobPostingsService.getByEmployer(userId);
        setPostings(response.data);
      } catch (err) {
        console.log(err);
        handleClose();
      }
    };
    fetchData();
  }, [handleClose]);

  const handleJobChange = async (event, newValue) => {
    if (newValue) {
      setSelectedApplication(null);
      setSelectedPosting(newValue);
      try {
        const response = await applicationService.getByJob(newValue.id);
        setApplications(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleApplicationChange = (event, newValue) => {
    if (newValue) {
      setSelectedApplication(newValue);
      setFormData({ ...formData, applicationId: newValue.id });
      setErrors({ ...errors, application: "" });
    }
  };

  const handleChange = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!formData.applicationId) {
      setErrors({
        ...errors,
        application: "Application must be selected to schedule interview",
      });
      return false;
    }
    if (!formData.duration || String(formData.duration).trim() === "") {
      setErrors({
        ...errors,
        duration: "Interview duration must be selected",
      });
      return false;
    }
    if (formData.interviewMode.trim() === "") {
      setErrors({
        ...errors,
        interviewMode: "Interview mode must be selected",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    const isValid = validate();
    if (isValid) {
      try {
        const data = {
          ...formData,
          scheduledAt: new Date(selectedDate).toISOString(),
        };
        await interviewService.create(data);
        refresh();
        showNotification("success", "Interview was successfully scheduled!");
        handleClose();
      } catch (err) {
        showNotification("error", "An Unexpected Error occurred!");
        handleClose();
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Modal show={true} onHide={handleClose} centered className="crud-modal">
        <Modal.Header closeButton>
          <Modal.Title> Create Interview </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ThemeProvider theme={formTheme}>
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { mb: 3, width: "100%" } }}
            >
              <ThemeProvider theme={menuTheme}>
                <Grid container spacing={2}>
                  <Grid size={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        minDateTime={now}
                        label="Start Time *"
                        value={dayjs(selectedDate)}
                        disabled
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid size={12}>
                    <Autocomplete
                      id="autocomplete-application-select"
                      options={postings}
                      getOptionLabel={(option) =>
                        `${option.title} - ${option.location}`
                      }
                      value={selectedPosting}
                      onChange={(event, newValue) => {
                        handleJobChange(event, newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Job Posting*" />
                      )}
                    />
                  </Grid>
                  <Grid size={12}>
                    <Autocomplete
                      id="autocomplete-application-select"
                      disabled={!selectedPosting}
                      options={applications}
                      getOptionLabel={(option) =>
                        `${option.applicant.name} ${option.applicant.lastName} - ${option.applicant.email}`
                      }
                      value={selectedApplication}
                      onChange={(event, newValue) => {
                        handleApplicationChange(event, newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Application *"
                          error={!!errors.application}
                          helperText={errors.application || ""}
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <ThemeProvider theme={menuTheme}>
                        <InputLabel id="demo-employment-select-label">
                          Duaration *
                        </InputLabel>
                        <Select
                          labelId="duration-select-label"
                          id="duration-select"
                          name="duration"
                          value={formData.duration}
                          label="Duration *"
                          onChange={handleChange}
                        >
                          <MenuItem value={"00:30:00"}>30 minutes </MenuItem>
                          <MenuItem value={"01:00:00"}>1 Hour </MenuItem>
                          <MenuItem value={"01:30:00"}>
                            1 Hour & 30 Minutes{" "}
                          </MenuItem>
                        </Select>
                      </ThemeProvider>
                      {errors.duration && (
                        <FormHelperText
                          sx={{ color: "#d32f2f", fontWeight: "bold" }}
                        >
                          {errors.duration}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <ThemeProvider theme={menuTheme}>
                        <InputLabel id="demo-employment-select-label">
                          Interview Mode *
                        </InputLabel>
                        <Select
                          labelId="interviewMode-select-label"
                          id="interviewMode-select"
                          name="interviewMode"
                          value={formData.interviewMode}
                          label="Interview Mode *"
                          onChange={handleChange}
                        >
                          <MenuItem value={"Remote"}>Remote </MenuItem>
                          <MenuItem value={"OnSite"}>On Site </MenuItem>
                        </Select>
                      </ThemeProvider>
                      {errors.interviewMode && (
                        <FormHelperText
                          sx={{ color: "#d32f2f", fontWeight: "bold" }}
                        >
                          {errors.interviewMode}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </ThemeProvider>
            </Box>
          </ThemeProvider>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleSubmit}
            className="crud-submit"
            disabled={loading}
          >
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
