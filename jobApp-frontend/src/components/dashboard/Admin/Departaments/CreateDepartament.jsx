import * as React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../styles/crud.css";
import { TextField, Box, ThemeProvider } from "@mui/material";
import formTheme from "../../styles/formTheme";
import { DepartamentService } from "../../../../api/sevices/DepartamentService";
import Spinner from "react-bootstrap/Spinner";
import { useNotification } from "../../../../hooks/useNotification";
const departamentService = new DepartamentService();

export default function CreateDepartament(props) {
  const [formData, setFormData] = React.useState({
    name: "",
    description:""
  });
  const [nameError, setNameError] = React.useState("");
  const [descriptionError, setDescriptionError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const {showNotification} = useNotification();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    const isValid = validate();
    if (isValid) {
      try {
        const response = await departamentService.create(formData);
        console.log("Response" + response);
        props.refresh();

        showNotification("success","Departament was successfully created!");
        props.handleClose();
      } catch (err) {
        if (err.response && err.response.status === 400) {
          setError(err.response.data);
        } else {
          showNotification("error","An Unexpected Error occurred!");
          props.handleClose();
          console.log("An Unexpected Error occurred");
        }
      }
      // console.log("Form data was submitted !");
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
          <Modal.Title> Create Departament</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ThemeProvider theme={formTheme}>
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { mb: 3, width: "100%" } }}
            >
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
                  setError("");
                }}
              />
            </Box>
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { mb: 3, width: "100%" } }}
            >
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
                  setError("");
                }}
              />
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
              <>
                Submit
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
