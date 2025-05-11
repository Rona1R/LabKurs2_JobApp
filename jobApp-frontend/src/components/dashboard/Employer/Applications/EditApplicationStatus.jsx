import * as React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../styles/crud.css";
import Grid from "@mui/material/Grid2";
import {
  TextField,
  Box,
  ThemeProvider,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
} from "@mui/material";
import formTheme from "../../styles/formTheme";
import menuTheme from "../../styles/menuTheme";
import { JobApplicationService } from "src/api/sevices/JobApplicationService";
import { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useNotification } from "src/hooks/useNotification";
const applicationService = new JobApplicationService();

export default function EditApplicationStatus({ id, handleClose, refresh }) {
  const [formData, setFormData] = React.useState({
    applicantId: null,
    jobId: null,
    resumeUrl: "",
    applicationStatus: "",
    applicantName: "",
    applicantLastName: "",
    applicantEmail: "",
    jobName: "",
  });
  const [errors, setErrors] = React.useState({
    applicantId: "",
    jobId: "",
    resumeUrl: "",
    applicationStatus: "",
  });
  const [loading, setLoading] = React.useState(false);
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await applicationService.getById(id);
        setFormData(response.data);
      } catch (err) {
        console.log(err);
        handleClose();
      }
    };

    fetchData();
  }, [id, handleClose]);

  const handleChange = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!formData.applicantId) {
      setErrors({ ...errors, applicantId: "Applicant id is missing !" });
      return false;
    }

    if (!formData.jobId) {
      setErrors({ ...errors, jobId: "Job id is missing !" });
      return false;
    }

    if (!formData.resumeUrl.trim() === "") {
      setErrors({ ...errors, resumeUrl: "Resume is missing !" });
      return false;
    }

    if (!formData.applicationStatus.trim() === "") {
      setErrors({
        ...errors,
        applicationStatus: "Application Status is required!",
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
        await applicationService.update(id, formData);
        refresh();
        showNotification("success", "Application was successfully updated");
        handleClose();
      } catch (err) {
        showNotification("error", "An Unexpected Error Occurred!");
        handleClose();
        console.log(err);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Modal show={true} onHide={handleClose} centered className="crud-modal">
        <Modal.Header closeButton>
          <Modal.Title> Update Application Status </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ThemeProvider theme={formTheme}>
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { mb: 3, width: "100%" } }}
            >
              <Grid container spacing={2}>
                <Grid size={12}>
                  <TextField
                    required
                    label="Applicant Name"
                    variant="outlined"
                    value={formData.applicantName}
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    required
                    label="Applicant Last Name"
                    variant="outlined"
                    value={formData.applicantLastName}
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    required
                    label="Applicant Email"
                    variant="outlined"
                    value={formData.applicantEmail}
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    required
                    label="Job Posting"
                    variant="outlined"
                    value={formData.jobName}
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                  />
                </Grid>
                <Grid size={12}>
                  <FormControl fullWidth>
                    <ThemeProvider theme={menuTheme}>
                      <InputLabel id="demo-employment-select-label">
                        Employment Type *
                      </InputLabel>
                      <Select
                        labelId="demo-employment-select-label"
                        id="demo-employment-select"
                        name="applicationStatus"
                        value={formData.applicationStatus}
                        label="Application Status*"
                        onChange={handleChange}
                      >
                        <MenuItem value={"Pending"}>Pending</MenuItem>
                        <MenuItem value={"Approved"}>Approved</MenuItem>
                        <MenuItem value={"InReview"}>In Review</MenuItem>
                        <MenuItem value={"Withdrawn"}>Withdrawn</MenuItem>
                      </Select>
                    </ThemeProvider>
                    {errors.applicationStatus && (
                      <FormHelperText
                        sx={{ color: "#d32f2f", fontWeight: "bold" }}
                      >
                        {errors.applicationStatus}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
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
