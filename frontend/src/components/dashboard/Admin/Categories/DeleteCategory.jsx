import * as React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../styles/crud.css";
import { CategoryService } from "api/sevices/CategoryService";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import Spinner from "react-bootstrap/Spinner";
import { useNotification } from "hooks/useNotification";
const categoryService = new CategoryService();

export default function DeleteCategory(props) {
  const [formData, setFormData] = React.useState({
    name: "",
  });
  const { handleClose} = props;
  const [loading, setLoading] = React.useState(false);
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categoryService.getById(props.id);
        setFormData(response.data);
      } catch (err) {
        console.log(err);
        handleClose();
      }
    };

    fetchData();
  }, [props.id,handleClose]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await categoryService.delete(props.id);
      props.refresh();
      showNotification("success","Category was successfully deleted!");
      props.handleClose();
    } catch (err) {
      showNotification("error","An Unexpected Error Occurred!");
      props.handleClose();
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
          <Modal.Title> Delete Category </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Typography variant="h5">
            Are you sure that you want to delete the Category{" "}
            <span style={{ fontWeight: "bold", color: "black" }}>
              "{formData.name}" ?
            </span>
          </Typography>
        </Modal.Body>
        <Modal.Footer>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={props.handleClose} className="crud-cancel">
              <FontAwesomeIcon icon={faXmark} style={{ marginRight: "10px" }} />
              Cancel
            </Button>
            <Button className="crud-confirm" onClick={handleDelete} disabled={loading}>
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
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  style={{ marginRight: "10px" }}
                />
              )}
              Yes, I'm Sure
            </Button>
          </Box>
        </Modal.Footer>
      </Modal>
    </>
  );
}
