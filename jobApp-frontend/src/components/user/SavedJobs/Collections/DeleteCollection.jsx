import Modal from "react-bootstrap/Modal";
import "../../../dashboard/styles/crud.css";
import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import Spinner from "react-bootstrap/Spinner";
import { useNotification } from "src/hooks/useNotification";
import { SavedJobCollectionService } from "src/api/sevices/SavedJobCollectionService";
const savedJobCollectionService = new SavedJobCollectionService();

export default function DeleteCollection({ id, handleClose, refresh }) {
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await savedJobCollectionService.delete(id);
      refresh();
      showNotification("success", "Collection was successfully deleted!");
      handleClose();
    } catch (err) {
      showNotification("error", "An Unexpected Error Occurred!");
      handleClose();
    }
    setLoading(false);
  };

  return (
    <>
      <Modal show={true} onHide={handleClose} centered className="crud-modal">
        <Modal.Header closeButton>
          <Modal.Title> Delete Collection </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Typography variant="h6" sx={{fontWeight:"bold"}}>
            Your posts will still be saved in 'Saved Jobs'
          </Typography>
        </Modal.Body>
        <Modal.Footer>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Button
              onClick={handleClose}
              sx={{
                backgroundColor: "rgba(108, 109, 109, 0.92)",
                color: "#fff",
                width: "100%",
                p:1,
                textTransform: "none",
                fontSize:"18px",
                "&:hover": {
                  backgroundColor: "#5a6268",
                },
              }}
            >
              <FontAwesomeIcon icon={faXmark} style={{ marginRight: "10px" }} />
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={loading}
              sx={{
                backgroundColor: "#0A0529",
                color: "#fff",
                width: "100%",
                p:1,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#070616",
                },
                fontSize:"18px",
              }}
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
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  style={{ marginRight: "10px" }}
                />
              )}
              Remove
            </Button>
          </Box>
        </Modal.Footer>
      </Modal>
    </>
  );
}
