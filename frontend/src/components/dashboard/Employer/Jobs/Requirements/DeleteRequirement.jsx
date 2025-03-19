import { Typography, Box } from "@mui/material";
import { RequirementService } from "api/sevices/RequirementService";
import { useState, useEffect } from "react";
import { Spinner, Button } from "react-bootstrap";
import "../../../styles/crud.css";
import { useNotification } from "hooks/useNotification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
const requirementService = new RequirementService();

export default function DeleteRequirement({
  requirementId,
  handleClose,
  refresh,
}) {
  const [requirement, setRequirement] = useState({
    description: "",
    jobId: null,
  });
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await requirementService.getById(requirementId);
        setRequirement(response.data);
      } catch (err) {
        console.log(err);
        handleClose();
      }
    };

    fetchData();
  }, [requirementId, handleClose]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await requirementService.delete(requirementId);
      refresh();
      showNotification("success", "Requirement was successfully deleted!");
      handleClose();
    } catch (err) {
      showNotification("error", "An Unexpected Error Occurred!");
      handleClose();
    }
    setLoading(false);
  };

  return (
    <>
      <Typography variant="h5">
        Are you sure that you want to remove the requirement{" "}
        <span style={{ fontWeight: "bold", color: "black" }}>
          "{requirement.description}"{" "}
        </span> ?
      </Typography>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}
      >
        <Button onClick={handleClose} className="crud-cancel">
          <FontAwesomeIcon icon={faXmark} style={{ marginRight: "10px" }} />
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          className="crud-confirm"
          disabled={loading || requirement.description.trim() === ""}
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
      </Box>
    </>
  );
}
