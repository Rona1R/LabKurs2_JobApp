import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "../../../dashboard/styles/crud.css";
import { TextField, Box, ThemeProvider } from "@mui/material";
import formTheme from "src/components/dashboard/styles/formTheme";
import Spinner from "react-bootstrap/Spinner";
import { useNotification } from "src/hooks/useNotification";
import { SavedJobCollectionService } from "src/api/sevices/SavedJobCollectionService";
import { useAuth } from "src/context/AuthContext";
const savedJobCollectionService = new SavedJobCollectionService();

export default function UpdateCollection({ id,handleClose,refresh }) {
  const { user } = useAuth();
  const userId = user?.nameid;
  const [formData, setFormData] = useState({
    name: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await savedJobCollectionService.getById(id);
        setFormData(response.data);
      } catch (err) {
        console.log(err);
        handleClose();
      }
    };

    fetchData();
  }, [id, handleClose]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (formData.name.trim() === "") {
      setError("Name can not be empty !");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    const isValid = validate();
    if (isValid) {
      setLoading(true);
      try {
        const updatedCollection = {
          ...formData,
          userId: userId,
        };
        await savedJobCollectionService.update(id,updatedCollection);
        refresh();

        showNotification("success", "Collection was successfully updated!");
        handleClose();
      } catch (err) {
        showNotification("error", "An Unexpected Error occurred!");
        handleClose();
        console.log("An Unexpected Error occurred");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Modal show={true} onHide={handleClose} centered className="crud-modal">
        <Modal.Header closeButton>
          <Modal.Title> Update Collection </Modal.Title>
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
                value={formData.name}
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
