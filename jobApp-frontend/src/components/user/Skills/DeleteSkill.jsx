import * as React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../dashboard/styles/crud.css";
import { Box, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import Spinner from "react-bootstrap/Spinner";
import { useNotification } from "src/hooks/useNotification";
import { UserProfileService } from "src/api/sevices/UserProfileService";
const userProfileService = new UserProfileService();

export default function DeleteSkill({
  selected,
  userProfile,
  handleClose,
  refresh,
}) {
  const [loading, setLoading] = React.useState(false);
  const { showNotification } = useNotification();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const filteredSkills = userProfile.skills.filter(
        (skill) => skill !== selected
      );

      const updatedProfile = {
        ...userProfile,
        skills: filteredSkills,
      };

      await userProfileService.update(userProfile.userId, updatedProfile);
      refresh();
      showNotification("success", "Skill was successfully updated!");
      handleClose();
    } catch (err) {
      console.log(err);
      showNotification("error", "An Unexptected Error Occurred!");
      handleClose();
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
              {/* "{selected}" ? */}
            </span>
          </Typography>
        </Modal.Body>
        <Modal.Footer>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleClose} className="crud-cancel">
              <FontAwesomeIcon icon={faXmark} style={{ marginRight: "10px" }} />
              Cancel
            </Button>
            <Button
              className="crud-confirm"
              onClick={handleDelete}
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
