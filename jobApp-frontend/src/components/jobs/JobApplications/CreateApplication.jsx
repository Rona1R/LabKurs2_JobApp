import * as React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../../components/dashboard/styles/crud.css";
import { TextField, Box, ThemeProvider} from "@mui/material";
import Grid from "@mui/material/Grid2";
import formTheme from "src/components/dashboard/styles/formTheme";
import { Form } from "react-bootstrap";
import { FileService } from "src/api/sevices/FileService";
import Spinner from "react-bootstrap/Spinner";
import { useNotification } from "src/hooks/useNotification";
import { JobApplicationService } from "src/api/sevices/JobApplicationService";
const jobApplicationService = new JobApplicationService();
const fileService = new FileService();

export default function CreateApplication({
  applicantId,
  applicantName,
  applicantLastName,
  applicantEmail,
  jobId,
  handleClose,
}) {
  const [formData, setFormData] = React.useState({
    jobId: jobId,
    applicantId: applicantId,
  });
  const [file, setFile] = React.useState(null);
  const [fileError, setFileError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { showNotification } = useNotification();

  const handleFile = (event) => {
    setFileError("");
    setFile(event.target.files[0]);
  };

  const validate = () => {
    if (!file) {
      setFileError("No File uploaded !");
      return false;
    }
    return true;
  };

  const uploadFile = async (fileData) => {
    try {
      const image = await fileService.create(fileData, "document");
      return image.data.fileUrl;
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setFileError(err.response.data);
      } else {
        showNotification(
          "error",
          "An Unexptected Error Occurred while uploading document!"
        );
        handleClose();
        console.log(err);
      }
      return null;
    }
  };

  const createApplication = async (data) => {
    try {
      await jobApplicationService.create(data);
      showNotification("success", "Application was successfully submitted !");
      handleClose();
    } catch (err) {
      showNotification("error", "An Unexptected Error Occurred!");
      handleClose();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const isValid = validate();

    if (isValid) {
      const fileData = new FormData();
      fileData.append("file", file);
      const uploadedDoc = await uploadFile(fileData);
      if (!uploadedDoc) {
        setLoading(false);
        return;
      }
      const data = {
        ...formData,
        resumeUrl: uploadedDoc,
      };
      await createApplication(data);
    }
    setLoading(false);
  };

  return (
    <>
      <Modal show={true} onHide={handleClose} centered className="crud-modal">
        <Modal.Header closeButton>
          <Modal.Title> Apply To Job </Modal.Title>
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
                    name="name"
                    label="Read Only"
                    variant="outlined"
                    value={applicantName}
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
                    name="email"
                    label="Read Only"
                    variant="outlined"
                    value={applicantEmail}
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                  />
                </Grid>
                <Grid size={12} sx={{ marginBottom: 3 }}>
                  <Form.Label className="logo-label">Upload CV/Resume *</Form.Label>
                  <Form.Control
                    type="file"
                    accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
                    className="image-uploader"
                    isInvalid={!!fileError}
                    onChange={handleFile}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    style={{
                      color: " #d32f2f",
                      fontSize: "0.75rem",
                      fontWeight: 400,
                      marginLeft: "15px",
                      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    }}
                  >
                    {fileError}
                  </Form.Control.Feedback>
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
