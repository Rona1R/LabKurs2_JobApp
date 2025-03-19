import * as React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../styles/crud.css";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import { EmployeeService } from "api/sevices/EmployerService";
import { UserRoleService } from "api/sevices/UserRoleService";
import Spinner from "react-bootstrap/Spinner"; 
import { useNotification } from "hooks/useNotification";
const employerService = new EmployeeService();
const userRoleService = new UserRoleService();

export default function DeleteEmployer(props) {
  const [formData, setFormData] = React.useState({
    name: "",
    lastName: "",
  });
  const { handleClose} = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await employerService.getById(props.id);
        setFormData(response.data);
      } catch (err) {
        console.log(err);
        handleClose();
      }
    };

    fetchData();
  }, [props.id,handleClose]);

  const revokeEmployerRole = async () => {
    try {
      const response = await userRoleService.delete(
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
        showNotification("error","An Unexpected Error Occurred while Revoking Role!")
      }
      handleClose();
      return null;
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    const response = await revokeEmployerRole();
    if (!response) {
        setIsLoading(false);
        return;
    }

    try {
      await employerService.delete(props.id);
      props.refresh();
      showNotification("success","Employer was successfully removed !");
      props.handleClose();
    } catch (err) {
      showNotification("error","An Unexpected Error Occurred!")
      props.handleClose();
    }
    setIsLoading(false);
  };

  return (
    <>
      <Modal show={true} onHide={handleClose} centered className="crud-modal">
        <Modal.Header closeButton>
          <Modal.Title> Delete Employer </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Typography variant="h5">
            Are you sure that you want to remove Employer{" "}
            <span style={{ fontWeight: "bold", color: "black" }}>
              "{formData.name} {formData.lastName} " ?
            </span>{" "}
            <br />
            <span
              style={{
                fontSize: "15px",
                color: "darkslategray",
                fontWeight: "bold",
              }}
            >
              (This action does not delete user account!)
            </span>
          </Typography>
        </Modal.Body>
        <Modal.Footer>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleClose} className="crud-cancel">
              <FontAwesomeIcon icon={faXmark} style={{ marginRight: "10px" }} />
              Cancel
            </Button>
            <Button className="crud-confirm" onClick={handleDelete} disabled={isLoading}>
              {isLoading ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" style={{ marginRight: "10px" }} />
              ) : (
                <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: "10px" }} />
              )}
              Yes, I'm Sure
            </Button>
          </Box>
        </Modal.Footer>
      </Modal>
    </>
  );
}
