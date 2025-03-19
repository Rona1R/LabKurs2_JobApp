import * as React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../styles/crud.css";
import { TextField, Box, ThemeProvider, Autocomplete } from "@mui/material";
import formTheme from "../../styles/formTheme";
import Grid from "@mui/material/Grid2";
import { DepartamentService } from "api/sevices/DepartamentService";
import { EmployeeService } from "api/sevices/EmployerService";
import menuTheme from "../../styles/menuTheme";
import Spinner from "react-bootstrap/Spinner";
import { useNotification } from "hooks/useNotification";
const departamentService = new DepartamentService();
const employerService = new EmployeeService();

export default function UpdateEmployer(props) {
  const [formData, setFormData] = React.useState({
    userId: null,
    departamentId: null,
    name: "",
    lastName: "",
  });
  const [departamentError, setDepartamentError] = React.useState("");
  const [departaments, setDepartaments] = React.useState([]);
  const [selectedDepartament, setSelectedDepartament] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const { handleClose } = props;
  const { showNotification } = useNotification();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await employerService.getById(props.id);
        setFormData(response.data);

        const depResponse = await departamentService.getById(
          response.data.departamentId
        );
        setSelectedDepartament(depResponse.data);
      } catch (err) {
        console.log(err);
        handleClose();
      }
    };

    fetchData();
  }, [props.id,handleClose]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const depResponse = await departamentService.getAll();
        setDepartaments(depResponse.data);
      } catch (err) {
        console.log(err);
        handleClose();
      }
    };
    fetchData();
  }, [handleClose]);

  const handleDepartamentChange = (event, newValue) => {
    if (newValue) {
      setSelectedDepartament(newValue);
      setFormData({ ...formData, departamentId: newValue.id });
      setDepartamentError("");
    }
  };
  const validate = () => {
    if (!formData.departamentId) {
      setDepartamentError("You must select Departament !");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    console.log(selectedDepartament);
    console.log(formData);
    const isValid = validate();
    if (isValid) {
      try {
        await employerService.update(props.id, formData);
        props.refresh();
        showNotification("success","Employer was successfully updated!")
        handleClose();
      } catch (err) {
        showNotification("error","An Unexpected Error Occurred while Revoking Role!")
        console.log(err);
        handleClose();
      }
    }
    setLoading(false);
  };
  return (
    <>
      <Modal show={true} onHide={handleClose} centered className="crud-modal">
        <Modal.Header closeButton>
          <Modal.Title> Update Employer </Modal.Title>
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
                    <TextField
                      required
                      disabled
                      label="Employer (Read Only)"
                      variant="outlined"
                      value={formData.name + " " + formData.lastName}
                    />
                  </Grid>
                  <Grid size={12}>
                    <Autocomplete
                      id="autocomplete-departament-select"
                      options={departaments}
                      getOptionLabel={(option) => `${option.name}`}
                      value={selectedDepartament}
                      onChange={(event, newValue) => {
                        handleDepartamentChange(event, newValue);
                      }}
                      // isOptionEqualToValue={(option, value) => option.id === value.id}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Departament *"
                          error={!!departamentError}
                          helperText={departamentError || ""}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </ThemeProvider>
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
