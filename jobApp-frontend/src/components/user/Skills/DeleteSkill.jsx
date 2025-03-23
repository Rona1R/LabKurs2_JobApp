import * as React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../dashboard/styles/crud.css";
import { Box, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import Spinner from "react-bootstrap/Spinner";
import { SkillService } from "../../../api/sevices/SkillService";
import { useNotification } from "../../../hooks/useNotification";
const skillService = new SkillService();

export default function DeleteSkill(props) {
  const [selectedSkill, setSelectedSkill] = React.useState({
    name: "",
    userId: null,
  });
  const { handleClose } = props;
  const [loading, setLoading] = React.useState(false);
  const { showNotification } = useNotification();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await skillService.getById(props.id);
        setSelectedSkill(response.data);
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
      await skillService.delete(props.id);
      props.refresh();
      showNotification("success","Skill was successfully deleted!");
      props.handleClose();
    } catch (err) {
      showNotification("error","An Unexptected Error Occurred!");;
      props.handleClose();
    }

    setLoading(false);
  };

  return (
    <>
      <Modal show={true} onHide={handleClose} centered className="crud-modal">
        <Modal.Header closeButton>
          <Modal.Title> Delete Skill </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Typography variant="h5">
            Are you sure that you want to delete the Skill{" "}
            <span style={{ fontWeight: "bold", color: "black" }}>
              "{selectedSkill.name}" ?
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
