import {
  TextField,
  Box,
  ThemeProvider,
  Autocomplete,
  Button,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import menuTheme from "../../../../../components/dashboard/styles/menuTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./style/tagSelection.css";
import JobTag from "../Details/JobTag";

export default function TagSelection({
  tags,
  selectedTag,
  handleTagChange,
  addedTags,
  addTag,
  removeTag
}) {
  return (
    <Box component="form" sx={{ "& .MuiTextField-root": { width: "100%" } }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <ThemeProvider theme={menuTheme}>
            <Autocomplete
              id="autocomplete-tags-select"
              options={tags}
              getOptionLabel={(option) => `${option.name}`}
              value={selectedTag}
              onChange={(event, newValue) => {
                handleTagChange(event, newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Tags"
                  //   error={!!tagError}
                  //   helperText={tagError || ""}
                />
              )}
            />
          </ThemeProvider>
        </Grid>
        {selectedTag && (
          <div className="d-flex justify-content-end w-100 mb-3">
            <Button
              variant="contained"
              className="add-tag-button"
              onClick={addTag}
            >
              <FontAwesomeIcon icon={faPlus} style={{ paddingRight: "5px" }} />
              Add Tag
            </Button>
          </div>
        )}
      </Grid>
      <Stack
        direction="row"
        spacing={1}
        gap={1}
        alignItems={"center"}
        flexWrap={"wrap"}
        marginTop={2}
        marginBottom={2}
      >
        {addedTags.map((tag, index) => (
                              // id qe e ka tag ne Tags (nliste)
          <JobTag key={index} id={tag.id} label={tag.name} editable={true} handleDelete={removeTag}/>
        ))}
      </Stack>
    </Box>
  );
}
