import { TextField, Box, ThemeProvider, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import formTheme from "src/components/dashboard/styles/formTheme";
import "../../CreateJob/style/tagSelection.css";
import DetailsList from "../DetailsList";

export default function AddNiceToHaveSkills({
  addedOptionalSkills,
  addOptionalSkill,
  selectedOptionalSkill,
  handleChange,
  removeOptionalSkill,
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
            label="Nice to have Skill"
            variant="outlined"
            value={selectedOptionalSkill}
            onChange={handleChange}
          />
        </Box>
      </ThemeProvider>

      {selectedOptionalSkill && selectedOptionalSkill.trim() !== "" && (
        <div className="d-flex justify-content-end w-100 mb-3">
          <Button
            variant="contained"
            className="add-tag-button"
            onClick={addOptionalSkill}
          >
            <FontAwesomeIcon icon={faPlus} style={{ paddingRight: "5px" }} />
            Add 'Nice to have/optional' Skill
          </Button>
        </div>
      )}
      {
        <DetailsList
          listItems={addedOptionalSkills}
          handleDelete={removeOptionalSkill}
          noData = "No optional skills are listed"
        />
      }
    </>
    )
}