import { TextField, Box, ThemeProvider, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import formTheme from "src/components/dashboard/styles/formTheme";
import "../../CreateJob/style/tagSelection.css";
import DetailsList from "../DetailsList";

export default function AddRequirements({
  addedRequirements,
  addRequirement,
  selectedRequirement,
  handleChange,
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
            label="Requirement"
            variant="outlined"
            value={selectedRequirement}
            onChange={handleChange}
          />
        </Box>
      </ThemeProvider>

      {selectedRequirement && selectedRequirement.trim() !== "" && (
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
      {
        <DetailsList
          listItems={addedRequirements}
          handleDelete={removeRequirement}
          noData="No requirements listed"
        />
      }
    </>
  );
}
