import * as React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../dashboard/styles/crud.css";
import { Box, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import Spinner from "react-bootstrap/Spinner";
import { FileService } from "../../../api/sevices/FileService";
import { UserService } from "../../../api/sevices/UserService";
import { useNotification } from "../../../hooks/useNotification";
const fileService = new FileService();
const userService = new UserService();

export default function RemoveProfilePic(props) {
  const { handleClose } = props;
  const [loading,setLoading] = React.useState(false);
  const { showNotification } = useNotification();

  const handleDelete = async() => {
    setLoading(true);
    try{
        await fileService.delete(props.user.profilePic.split("/").pop(),"image");
        await updateUser();
        handleClose();
    }catch(err){
        showNotification("error","An Unexpected Error Occurred while deleting image!");
        handleClose();
    }
  
    setLoading(false);
  }

  const updateUser = async() => {
    try{
        const data = {
            ...props.user,
            profilePic:""
        }
        await userService.update(props.userId,data);
        props.refresh();
        showNotification("success","Profile Picture was successfully deleted!");
    }catch(err){
        console.log(err);
        showNotification("error","An Unexpected Error Occurred while updating!");
        handleClose();
    }
  }

  return (
    <>
      <Modal
        show={true}
        onHide={handleClose}
        centered
        className="crud-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title> Remove Profile Picture </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Typography variant="h5">
            Are you sure you want to remove your profile picture?
          </Typography>
        </Modal.Body>
        <Modal.Footer>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleClose} className="crud-cancel">
              <FontAwesomeIcon icon={faXmark} style={{ marginRight: "10px" }} />
              Cancel
            </Button>
            <Button className="crud-confirm" onClick={handleDelete}>
            {loading ? (
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
