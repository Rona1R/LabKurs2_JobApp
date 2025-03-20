import * as React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../dashboard/styles/crud.css";
import {
  TextField,
  Box,
  ThemeProvider,
  Autocomplete,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
} from "@mui/material";
import formTheme from "components/dashboard/styles/formTheme";
import Grid from "@mui/material/Grid2";
import { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import menuTheme from "components/dashboard/styles/menuTheme";
import { LanguageService } from "api/sevices/LanguageService";
import { UserLanguageService } from "api/sevices/UserLanguageService";
import { useNotification } from "hooks/useNotification";
const languageService = new LanguageService();
const userLanguageService = new UserLanguageService();

export default function AddLanguage(props) {
  const [formData, setFormData] = React.useState({
    userId: props.userId,
    languageId: null, // "" -> nese e kisha bo me select pa autocomplete
    proficiencyLevel: "",
  });
  const [selectedLanguage, setSelectedLanguage] = React.useState(null);
  const [languages, setLanguages] = React.useState([]);
  const [languageError, setLanguageError] = React.useState("");
  const [proficiencyError, setProficiencyError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { handleClose } = props;
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await languageService.getAll();
        setLanguages(response.data);
      } catch (err) {
        console.log(err);
        handleClose();
      }
    };

    fetchData();
  }, [handleClose]);

  const handleLanguageChange = (event, newValue) => {
    if (newValue) {
      setSelectedLanguage(newValue);
      setFormData({ ...formData, languageId: newValue.id });
      setLanguageError("");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if(formData.languageId == null){
        setLanguageError("Language must be selected!");
        return false;
    }

    if(formData.proficiencyLevel.trim() === ""){
        setProficiencyError("Proficiency Level must be selected!");
        return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    const isValid = validate();

    if (isValid) {
    //   console.log(formData);
        try {
          await userLanguageService.create(formData);
          props.refresh();
          showNotification("success","Language was successfully added!");
        } catch (err) {
          showNotification("error","An Unexpected Error Occurred!");
        }
        handleClose();
    }
    setLoading(false);
  };
  return (
    <>
      <Modal show={true} onHide={handleClose} centered className="crud-modal">
        <Modal.Header closeButton>
          <Modal.Title> Add Language </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ThemeProvider theme={formTheme}>
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { width: "100%" } }}
            >
              <Grid container spacing={3}>
                <Grid size={12}>
                  <ThemeProvider theme={menuTheme}>
                    <Autocomplete
                      id="autocomplete-language-select"
                      options={languages}
                      getOptionLabel={(option) => `${option.name}`}
                      value={selectedLanguage}
                      onChange={(event, newValue) => {
                        handleLanguageChange(event, newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Language *"
                          error={!!languageError}
                          helperText={languageError || ""}
                        />
                      )}
                    />
                  </ThemeProvider>
                  {/* <FormControl fullWidth>
                    
                    // NESE E KISHA BO ME DROPDOWN PA AUTOCOMPLETE !!
                    <ThemeProvider theme={menuTheme}>
                      <InputLabel id="demo-simple-select-label">
                        Language *
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="languageId"
                        value={formData.languageId}
                        label="Language *"
                        onChange={(e) => {
                        setProficiencyError("");
                          handleChange(e);
                        }}
                      >
                        {languages.map((language) => (
                          <MenuItem value={language.id} key={language.id}>
                            {language.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </ThemeProvider>
                  </FormControl> */}
                </Grid>
                <Grid size={12}>
                  <FormControl fullWidth>
                    <ThemeProvider theme={menuTheme}>
                      <InputLabel id="demo-simple-select-label">
                        Proficiency Level *
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="proficiencyLevel"
                        value={formData.proficiencyLevel}
                        label="Proficiency Level *"
                        onChange={(e) => {
                          setProficiencyError("");
                          handleChange(e);
                        }}
                      >
                        <MenuItem value={"Elementary proficiency"}>
                          Elementary proficiency
                        </MenuItem>
                        <MenuItem value={"Limited working proficiency"}>
                          Limited working proficiency
                        </MenuItem>
                        <MenuItem value={"Professional working proficiency"}>
                          Professional working proficiency
                        </MenuItem>
                        <MenuItem
                          value={"Full professional working proficiency"}
                        >
                          Full professional working proficiency
                        </MenuItem>
                        <MenuItem value={"Native or bilingual proficiency"}>
                          Native or bilingual proficiency
                        </MenuItem>
                      </Select>
                    </ThemeProvider>
                    {proficiencyError && (
                      <FormHelperText
                        sx={{ color: "#d32f2f", fontWeight: "bold" }}
                      >
                        {proficiencyError}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </ThemeProvider>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit} className="crud-submit" disabled={loading}>
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
