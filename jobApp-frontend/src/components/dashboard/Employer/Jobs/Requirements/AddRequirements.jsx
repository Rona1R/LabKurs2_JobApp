import { TextField, Box, ThemeProvider, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import RequirementList from "./RequirementList";
import formTheme from "../../../../../components/dashboard/styles/formTheme";
import "../CreateJob/style/tagSelection.css";

export default function AddRequirements({
  selectedRequirement,
  handleChange,
  addedRequirements,
  addRequirement,
  removeRequirement,
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
            label="Description"
            variant="outlined"
            value={selectedRequirement.description}
            onChange={handleChange}
          />
        </Box>
      </ThemeProvider>

      {selectedRequirement.description && selectedRequirement.description.trim() !== "" && (
        <div className="d-flex justify-content-end w-100 mb-3">
          <Button
            variant="contained"
            className="add-tag-button"
            onClick={addRequirement}
          >
            <FontAwesomeIcon icon={faPlus} style={{ paddingRight: "5px" }} />
            Add Requirement
          </Button>
        </div>
      )}

      <RequirementList
        requirements={addedRequirements}
        removeFromList={removeRequirement}
      />
    </>
  );
}
