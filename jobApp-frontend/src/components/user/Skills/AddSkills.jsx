import { TextField, Box, ThemeProvider } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import formTheme from "src/components/dashboard/styles/formTheme";
import "../../dashboard/Employer/Jobs/CreateJob/style/tagSelection.css";
import DetailsList from "src/components/dashboard/Employer/Jobs/JobDetails/DetailsList";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import {Button} from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { UserProfileService } from "src/api/sevices/UserProfileService";
import { useNotification } from "src/hooks/useNotification";
const userProfileService = new UserProfileService();

export default function AddSkills({ userProfile,refresh,handleClose }) {
  const [addedSkills, setAddedSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [loading,setLoading] = useState(false);
  const { showNotification } = useNotification();

  const addSkill = () => {
    setAddedSkills([...addedSkills,selectedSkill]);
    setSelectedSkill("");
  }

  const handleChange = (e) => {
    setSelectedSkill(e.target.value);
  }

  const removeSkill = (skill) => {
    setAddedSkills(addedSkills.filter(s => s !== skill));
  }
  
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const profile = {
        ...userProfile,
        skills: [...userProfile.skills,...addedSkills]
      }
      console.log(profile);
      await userProfileService.update(userProfile.userId, profile);
      showNotification("success", "Your profile was successfully updated!");
      handleClose();
      refresh();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <Modal show={true} onHide={handleClose} centered className="crud-modal">
        <Modal.Header closeButton>
          <Modal.Title> Add Skills </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ThemeProvider theme={formTheme}>
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { mb: 3, width: "100%" } }}
            >
              <TextField
                required
                label="Skill"
                variant="outlined"
                value={selectedSkill}
                onChange={handleChange}
              />
            </Box>
          </ThemeProvider>

          {selectedSkill && selectedSkill.trim() !== "" && (
            <div className="d-flex justify-content-end w-100 mb-3">
              <Button
                variant="contained"
                className="add-tag-button"
                onClick={addSkill}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  style={{ paddingRight: "5px" }}
                />
                Add Skill
              </Button>
            </div>
          )}
          {
            <DetailsList
              listItems={addedSkills}
              handleDelete={removeSkill}
              noData="No skills are listed"
            />
          }
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
              <> Save Changes </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
