import * as React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../styles/crud.css";
import { TextField, Box, ThemeProvider } from "@mui/material";
import formTheme from "../../styles/formTheme";
import { InstitutionService } from "../../../../api/sevices/InstitutionService";
import { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useNotification } from "../../../../hooks/useNotification";
const institutionService = new InstitutionService();

export default function UpdateInstitutions(props) {
  const [formData, setFormData] = React.useState({
    name: "",
    type: "",
  });
  const [nameError, setNameError] = React.useState("");
  const [typeError, setTypeError] = React.useState("");
  const { handleClose } = props;
  const [loading, setLoading] = React.useState(false);
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await institutionService.getById(props.id);
        setFormData(response.data);
      } catch (err) {
        console.log(err);
        handleClose();
      }
    };

    fetchData();
  }, [props.id /*, setNotification*/, handleClose]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (formData.name.trim() === "") {
      setNameError("Name can not be empty !");
      return false;
    }
    if (formData.type.trim() === "") {
      setDescriptionError("Type can not be empty !");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    const isValid = validate();
    if (isValid) {
      try {
        const response = await institutionService.update(props.id, formData);
        console.log("Response" + response);
        props.refresh();
        showNotification("success", "Institution was successfully updated");
        props.handleClose();
      } catch (err) {
        if (err.response && err.response.status === 400) {
          setNameError(err.response.data);
        } else {
          showNotification("error", "An Unexpected Error Occurred!");
          props.handleClose();
          console.log("An Unexpected Error occurred");
        }
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
          <Modal.Title> Update Institution </Modal.Title>
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
                  setNameError("");
                }}
              />
            </Box>
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { mb: 3, width: "100%" } }}
            >
              <TextField
                required
                name="type"
                label="Type"
                variant="outlined"
                value={formData.type}
                error={!!typeError}
                helperText={typeError}
                onChange={(e) => {
                  handleChange(e);
                  setTypeError("");
                }}
              />
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
