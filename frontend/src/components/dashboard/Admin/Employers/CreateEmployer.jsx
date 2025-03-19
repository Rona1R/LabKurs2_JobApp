import * as React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../styles/crud.css";
import {
  TextField,
  Box,
  ThemeProvider,
  Autocomplete,
} from "@mui/material";
import formTheme from "../../styles/formTheme";
import Grid from "@mui/material/Grid2";
import { UserService } from "api/sevices/UserService";
import { DepartamentService } from "api/sevices/DepartamentService";
import { UserRoleService } from "api/sevices/UserRoleService";
import { EmployeeService } from "api/sevices/EmployerService";
import Spinner from "react-bootstrap/Spinner";
import menuTheme from "../../styles/menuTheme";
import { useNotification } from "hooks/useNotification";
const userService = new UserService();
const departamentService = new DepartamentService();
const userRoleService = new UserRoleService();
const employerService = new EmployeeService();

export default function CreateEmployer(props) {
  const [formData, setFormData] = React.useState({
    userId: null,
    departamentId: null,
  });
  const [userError, setUserError] = React.useState("");
  const [departamentError, setDepartamentError] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [departaments, setDepartaments] = React.useState([]);
  const [selectedDepartament, setSelectedDepartament] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const { handleClose } = props;
  const { showNotification } = useNotification();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userService.getAll();
        setUsers(response.data);

        const depResponse = await departamentService.getAll();
        setDepartaments(depResponse.data);
      } catch (err) {
        console.log(err);
        handleClose();
      }
    };
    fetchData();
  }, [handleClose]);

  const handleUserChange = (event, newValue) => {
    if (newValue) {
      setSelectedUser(newValue);
      setFormData({ ...formData, userId: newValue.id });
      setUserError("");
    }
  };

  const handleDepartamentChange = (event, newValue) => {
    if (newValue) {
      setSelectedDepartament(newValue);
      setFormData({ ...formData, departamentId: newValue.id });
      setDepartamentError("");
    }
  };
  const validate = () => {
    if (!formData.userId) {
      setUserError("You must select User !");
      return false;
    }

    if (!formData.departamentId) {
      setDepartamentError("You must select Departament !");
      return false;
    }

    return true;
  };

  const addEmployerRole = async () => {
    try {
      const response = await userRoleService.create(
        formData.userId,
        "Employer"
      );
      return response.data;
    } catch (err) {
      if (
        err.response &&
        (err.response.status === 404 || err.response.status === 400)
      ) {
        showNotification("error",err.response.data);
      } else {
        console.log(err);
        showNotification("error","An Unexptected Error Occurred with Role Creation!")
      }
      handleClose();
      return null;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    console.log(selectedUser);
    console.log(selectedDepartament);
    console.log(formData);
    const isValid = validate();
    if (isValid) {
      const response = await addEmployerRole();
      if (!response) {
        setLoading(false);
        return;
      }

      // role successfully added --> create Employer Entity :

      try {
        await employerService.create(formData);
        props.refresh();
        showNotification("success","Employer was successfully created!")
        handleClose();
      } catch (err) {
        showNotification("error","An Unexptected Error Occurred!")
        handleClose();
      }
    }

    setLoading(false);
  };
  return (
    <>
      <Modal show={true} onHide={handleClose} centered className="crud-modal">
        <Modal.Header closeButton>
          <Modal.Title> Create Employer </Modal.Title>
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
                    <Autocomplete
                      id="autocomplete-employer-select"
                      options={users}
                      getOptionLabel={(option) =>
                        `${option.name} ${option.lastName} - ${option.email}`
                      }
                      value={selectedUser}
                      onChange={(event, newValue) => {
                        handleUserChange(event, newValue);
                      }}
                      // isOptionEqualToValue={(option, value) => option.id === value.id}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="User *"
                          error={!!userError}
                          helperText={userError || ""}
                        />
                      )}
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
