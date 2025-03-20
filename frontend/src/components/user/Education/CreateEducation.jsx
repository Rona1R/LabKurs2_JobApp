import * as React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../dashboard/styles/crud.css";
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
import formTheme from "components/dashboard/styles/formTheme";
import Grid from "@mui/material/Grid2";
import { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import menuTheme from "components/dashboard/styles/menuTheme";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { InstitutionService } from "api/sevices/InstitutionService";
import { EducationService } from "api/sevices/EducationService";
import { useNotification } from "hooks/useNotification";
const institutionService = new InstitutionService();
const educationService = new EducationService();

export default function CreateEducation(props) {
  const [formData, setFormData] = React.useState({
    userId: props.userId,
    institutionId: null,
    manualInstitutionName: "",
    degree: "",
    fieldOfStudy: "",
    description: "",
    grade: 0,
    startDate: null,
    endDate: null,
  });
  const [selectedInstitution, setSelectedInstitution] = React.useState(null);
  const [institutions, setInstitutions] = React.useState([]);
  const [degreeError, setDegreeError] = React.useState("");
  const [institutionError, setInstitutionError] = React.useState("");
  const [fieldOfStudyError, setFieldOfStudyError] = React.useState("");
  const [gradeError, setGradeError] = React.useState("");
  const [startDateError, setStartDateError] = React.useState("");
  const [endDateError, setEndDateError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { handleClose } = props;
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await institutionService.getAll();
        setInstitutions(response.data);
      } catch (err) {
        console.log(err);
        handleClose();
      }
    };

    fetchData();
  }, [handleClose]);

  const handleInstitutionChange = (event, newValue) => {
    if (newValue) {
      setSelectedInstitution(newValue);
      setFormData({
        ...formData,
        institutionId: newValue.id,
        manualInstitutionName: "",
      });
      setInstitutionError("");
    } else {
      setSelectedInstitution(null);
      setInstitutionError("");
      setFormData({ ...formData, institutionId: null });
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
    if (
      formData.manualInstitutionName.trim() === "" &&
      formData.institutionId === null
    ) {
      setInstitutionError(
        "A Institutionust be selected.If you don't find it in the options please enter name manually below!!"
      );
      return false;
    }

    if (formData.degree.trim() === "") {
      setDegreeError("Degree type must be provided !");
      return false;
    }

    if (formData.fieldOfStudy.trim() === "") {
      setFieldOfStudyError("Degree type must be provided !");
      return false;
    }

    if (isNaN(formData.grade) || formData.grade === "") {
      setGradeError("Grade is not valid!");
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
      //   console.log(data);
      try {
        await educationService.create(data);
        props.refresh();
        showNotification("success","Education was successfully added!");
      } catch (err) {
        showNotification("error","An Unexpected Error occurred!");
      }
      handleClose();
    }
    setLoading(false);
  };
  return (
    <>
      <Modal show={true} onHide={handleClose} centered className="crud-modal">
        <Modal.Header closeButton>
          <Modal.Title> Add Education </Modal.Title>
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
                      id="autocomplete-institution-select"
                      disabled={formData.manualInstitutionName !== ""}
                      options={institutions}
                      getOptionLabel={(option) => `${option.name}`}
                      value={selectedInstitution}
                      onChange={(event, newValue) => {
                        handleInstitutionChange(event, newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Institute *"
                          error={!!institutionError}
                          helperText={
                            institutionError ||
                            "If your institution is not listed, please enter it below."
                          }
                        />
                      )}
                    />
                  </ThemeProvider>
                </Grid>
                <Grid size={12}>
                  <TextField
                    id="institution-name"
                    disabled={formData.institutionId != null}
                    name="manualInstitutionName"
                    label="Institution Name"
                    variant="outlined"
                    value={formData.manualInstitutionName}
                    helperText={
                      "Enter your institution name if it's not in the dropdown above."
                    }
                    onChange={(e) => {
                      setInstitutionError("");
                      setFormData({ ...formData, institutionId: null });
                      setSelectedInstitution(null);
                      handleChange(e);
                    }}
                  />
                </Grid>{" "}
                <Grid size={12}>
                  <FormControl fullWidth>
                    <ThemeProvider theme={menuTheme}>
                      <InputLabel id="demo-simple-select-label">
                        Degree *
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="degree"
                        value={formData.degree}
                        label="degree *"
                        onChange={(e) => {
                          setDegreeError("");
                          handleChange(e);
                        }}
                      >
                        <MenuItem value={"High School"}>High School</MenuItem>
                        <MenuItem value={"Bachelor"}>Bachelor</MenuItem>
                        <MenuItem value={"Master"}>Master</MenuItem>
                        <MenuItem value={"Doctorate"}>Doctorate</MenuItem>
                      </Select>
                    </ThemeProvider>
                    {degreeError && (
                      <FormHelperText
                        sx={{ color: "#d32f2f", fontWeight: "bold" }}
                      >
                        {degreeError}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid size={6}>
                  <TextField
                    required
                    name="fieldOfStudy"
                    label="Field of Study"
                    variant="outlined"
                    value={formData.fieldOfStudy}
                    error={!!fieldOfStudyError}
                    helperText={fieldOfStudyError}
                    onChange={(e) => {
                      handleChange(e);
                      setFieldOfStudyError("");
                    }}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    type="number"
                    name="grade"
                    label="Grade"
                    variant="outlined"
                    slotProps={{
                      htmlInput: {
                        min: 0,
                      },
                    }}
                    value={formData.grade}
                    error={!!gradeError}
                    helperText={gradeError}
                    onChange={(e) => {
                      handleChange(e);
                      setGradeError("");
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
                    name="description"
                    label="Description"
                    variant="outlined"
                    value={formData.description}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    multiline
                    rows={5}
                  />
                </Grid>
              </Grid>
            </Box>
          </ThemeProvider>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit} className="crud-submit" disabled={loading}>
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
