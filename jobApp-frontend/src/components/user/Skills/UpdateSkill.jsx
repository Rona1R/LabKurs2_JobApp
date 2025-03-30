import * as React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../dashboard/styles/crud.css";
import { TextField, Box, ThemeProvider } from "@mui/material";
import formTheme from "src/components/dashboard/styles/formTheme";
import Spinner from "react-bootstrap/Spinner";
import { useNotification } from "src/hooks/useNotification";
import { UserProfileService } from "src/api/sevices/UserProfileService";

const userProfileService = new UserProfileService();

export default function UpdateSkill({
  selected,
  userProfile,
  handleClose,
  refresh,
}) {
  const [skillToUpdate, setSkillToUpdate] = React.useState(selected);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { showNotification } = useNotification();

  const handleChange = (e) => {
    setSkillToUpdate(e.target.value);
  };

  const validate = () => {
    if (skillToUpdate.trim() === "") {
      setError("Skill can not be empty !");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    const isValid = validate();
    if (isValid) {
      try {
        const index = userProfile.skills.findIndex(
          (skill) => skill === selected
        );
        if (index !== -1) {
          const updatedSkills = [
            ...userProfile.skills.slice(0, index),
            skillToUpdate,
            ...userProfile.skills.slice(index + 1),
          ];

          const profile = {
            ...userProfile,
            skills: updatedSkills,
          };

          await userProfileService.update(userProfile.userId,profile);
        }
        refresh();
        showNotification("success", "Skill was successfully updated!");
        handleClose();
      } catch (err) {
        console.log(err);
        showNotification("error", "An Unexpected Error Occurred!");
        handleClose();
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Modal show={true} onHide={handleClose} centered className="crud-modal">
        <Modal.Header closeButton>
          <Modal.Title> Update Skill </Modal.Title>
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
                value={skillToUpdate}
                error={!!error}
                helperText={error}
                onChange={(e) => {
                  handleChange(e);
                  setError("");
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
