import { TextField, Box, ThemeProvider, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import formTheme from "src/components/dashboard/styles/formTheme";
import "../../CreateJob/style/tagSelection.css";
import DetailsList from "../DetailsList";

export default function AddRequiredSkills({
  addedSkills,
  addSkill,
  selectedSkill,
  handleChange,
  removeSkill,
  handleEdit
}) {
  return (
    <>
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
            <FontAwesomeIcon icon={faPlus} style={{ paddingRight: "5px" }} />
            Add Skill
          </Button>
        </div>
      )}
      {
        <DetailsList
          listItems={addedSkills}
          handleDelete={removeSkill}
          noData = "No skills are listed"
          handleEdit={handleEdit}
        />
      }
    </>
    )
}