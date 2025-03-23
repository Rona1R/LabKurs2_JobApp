import * as React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../styles/crud.css";
import {
  TextField,
  Box,
  ThemeProvider,
  Autocomplete
} from "@mui/material";
import formTheme from "../../styles/formTheme";
import { CompanyService } from "../../../../api/sevices/CompanyService";
import Grid from "@mui/material/Grid2";
import { Form } from "react-bootstrap";
import { useEffect } from "react";
import { EmployeeService } from "../../../../api/sevices/EmployerService";
import { FileService } from "../../../../api/sevices/FileService";
import Spinner from "react-bootstrap/Spinner";
import menuTheme from "../../styles/menuTheme";
import { useNotification } from "../../../../hooks/useNotification";
const companyService = new CompanyService();
const employerService = new EmployeeService();
const fileService = new FileService();

export default function UpdateCompany(props) {
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    logo: "",
    employerId: null,
  });
  const [selectedEmployer, setSelectedEmployer] = React.useState(null);
  const [employers, setEmployers] = React.useState([]);
  const [imageFile, setImageFile] = React.useState(null);
  const [nameError, setNameError] = React.useState("");
  const [descriptionError, setDescriptionError] = React.useState("");
  const [logoError, setLogoError] = React.useState("");
  const [employerError, setEmployerError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { handleClose} = props;
  const { showNotification } = useNotification();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await companyService.getById(props.id);
        setFormData(response.data);

        const employeeResponse = await employerService.getById(
          response.data.employerId
        );
        console.log(employeeResponse.data);
        setSelectedEmployer(employeeResponse.data);
      } catch (err) {
        handleClose();
        console.log(err);
      }
    };

    fetchData();
  }, [props.id,handleClose]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await employerService.getAll();
        setEmployers(response.data);
      } catch (err) {
        console.log(err);
        handleClose();
      }
    };

    fetchData();
  }, [handleClose]);

  const handleEmployerChange = (event, newValue) => {
    if (newValue) {
      setSelectedEmployer(newValue);
      setFormData({ ...formData, employerId: newValue.id });
      setEmployerError("");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogo = (event) => {
    setLogoError("");
    setImageFile(event.target.files[0]);
  };

  const validate = () => {
    if (formData.name.trim() === "") {
      setNameError("Name can not be empty !");
      return false;
    }
    if (formData.description.trim() === "") {
      setDescriptionError("Description can not be empty !");
      return false;
    }
    if (!formData.employerId) {
      setEmployerError("Employer must be selected!");
      return false;
    }

    return true;
  };

  const validateName = async () => {
    try {
      const nameValid = await companyService.validateOnUpdate(
        props.id,
        formData.name
      );
      if (!nameValid.data) {
        setNameError("This company name is taken!");
        return false;
      }
      return true;
    } catch (err) {
      showNotification("error","An Unexptected Error Occurred!")
      props.handleClose();
      console.log(err);
      return false;
    }
  };

  const uploadImage = async (fileData) => {
    try {
      await fileService.delete(formData.logo, "image");
      const image = await fileService.create(fileData, "image");
      return image.data.fileUrl;
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setLogoError(err.response.data);
      } else {
        showNotification("error","An Unexpected Error occurred while uploading Image!!")
        props.handleClose();
        console.log("An Unexpected Error while uploading image");
        console.log(err);
      }
      return null;
    }
  };

  const updateCompany = async (data) => {
    try {
      await companyService.update(props.id, data);
      props.refresh();
      showNotification("success","Company was successfully updated!!")
      props.handleClose();
    } catch (err) {
      showNotification("error","An Unexptected Error Occurred!")
      props.handleClose();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const isValid = validate();

    if (isValid) {
      const valid = await validateName();
      if (!valid) {
        setLoading(false);
        return;
      }
      if (imageFile) {
        const fileData = new FormData();
        fileData.append("file", imageFile);
        const image = await uploadImage(fileData);
        if (!image) {
          setLoading(false);
          return;
        }
        const data = {
          ...formData,
          logo: image,
        };
        await updateCompany(data);
      } else {
        //without logo update
        await updateCompany(formData);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Modal
        show={true}
        onHide={props.handleClose}
        centered
        className="crud-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title> Update Company </Modal.Title>
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
                    label="Name"
                    variant="outlined"
                    value={formData.name}
                    error={!!nameError}
                    helperText={nameError}
                    onChange={(e) => {
                      handleChange(e);
                      setNameError("");
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
                    error={!!descriptionError}
                    helperText={descriptionError}
                    onChange={(e) => {
                      handleChange(e);
                      setDescriptionError("");
                    }}
                    multiline
                    rows={5}
                  />
                </Grid>
                <Grid size={12} sx={{ marginBottom: 3 }}>
                  <Form.Label className="logo-label">
                    Upload New Logo
                  </Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    className="image-uploader"
                    isInvalid={!!logoError}
                    onChange={handleLogo}
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
                    {logoError}
                  </Form.Control.Feedback>
                </Grid>
                <Grid size={12}>
                  <ThemeProvider theme={menuTheme}>
                    <Autocomplete
                      id="autocomplete-employer-select"
                      options={employers}
                      getOptionLabel={(option) =>
                        `${option.name} ${option.lastName} - ${option.email}`
                      }
                      value={selectedEmployer}
                      onChange={(event, newValue) => {
                        handleEmployerChange(event, newValue);
                      }}
                      // isOptionEqualToValue={(option, value) => option.id === value.id}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Employer *"
                          error={!!employerError}
                          helperText={employerError || ""}
                        />
                      )}
                    />
                  </ThemeProvider>
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
