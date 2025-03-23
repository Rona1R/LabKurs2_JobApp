import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import RequirementList from "./RequirementList";
import { RequirementService } from "../../../../../api/sevices/RequirementService";
import AddRequirements from "./AddRequirements";
import { Box, IconButton, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Spinner } from "react-bootstrap";
import "../CreateJob/style/tagSelection.css";
import { useNotification } from "../../../../../hooks/useNotification";
import Loading from "../../../../../components/common/Loading";
import UpdateRequirement from "./UpdateRequirement";
import DeleteRequirement from "./DeleteRequirement";
const requirementService = new RequirementService();

export default function JobRquirements(props) {
  const [requirements, setRequirements] = useState([]);
  const [showAddRequirements, setShowAddRequirements] = useState(false);
  const [requirementToAdd, setRequirementToAdd] = useState({
    description: "",
    jobId: props.id,
  });
  const [addedRequirements, setAddedRequirements] = useState([]);
  const [loadingRequirements, setLoadingRequirements] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState("");
  const [selected, setSelected] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const { showNotification } = useNotification();
  const { handleClose } = props;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await requirementService.getByJob(props.id);
        setRequirements(response.data);
      } catch (err) {
        console.log(err);
        handleClose();
      } finally {
        setLoadingRequirements(false);
      }
    };

    fetchData();
  }, [props.id, handleClose, refreshKey]);

  const handleEdit = (id) => {
    setSelected(id);
    setShowEdit(true);
  };

  const handleDelete = (id) => {
    setSelected(id);
    setShowDelete(true);
  };

  const handleAddRequirement = () => {
    setAddedRequirements([...addedRequirements, requirementToAdd]);
    setRequirementToAdd({ ...requirementToAdd, description: "" });
  };

  const handleRemoveRequirement = (description) => {
    setAddedRequirements(
      addedRequirements.filter((req) => req.description !== description)
    );
  };

  const handleChange = (e) => {
    setRequirementToAdd({ ...requirementToAdd, description: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await requirementService.createRequirements(addedRequirements);
      setLoading(false);
      setRefreshKey(Date.now());
      showNotification("success", "Requirements were successfully added!");
      setShowAddRequirements(false);
    } catch (err) {
      console.log(err);
      showNotification("error", "An Unexpected Error Occurred!");
      handleClose();
    }
  };
  return (
    <>
      <Modal show={true} onHide={handleClose} centered className="crud-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            {showEdit
              ? "Edit Requirement"
              : showDelete
              ? "Delete Requirement"
              : showAddRequirements
              ? "Add Requirements"
              : "Requirements"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showEdit && selected && (
            <UpdateRequirement
              requirementId={selected}
              handleClose={() => setShowEdit(false)}
              refresh={() => setRefreshKey(Date.now())}
            />
          )}

          {showDelete&& selected && (
            <DeleteRequirement
              requirementId={selected}
              handleClose={() => setShowDelete(false)}
              refresh={() => setRefreshKey(Date.now())}
            />
          )}

          {!showAddRequirements && !showEdit && !showDelete && (
            <>
              {loadingRequirements ? (
                <div className="d-flex justify-content-center">
                  <Loading />
                </div>
              ) : (
                <>
                  <RequirementList
                    requirements={requirements}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                  <Box sx={{ display: "flex" }}>
                    <IconButton
                      sx={{ color: "#1e1b46", marginLeft: "auto" }}
                      onClick={() => setShowAddRequirements(true)}
                    >
                      <AddIcon sx={{ fontSize: "1.5em" }} />
                    </IconButton>
                  </Box>
                </>
              )}
            </>
          )}

          {showAddRequirements && (
            <>
              <AddRequirements
                selectedRequirement={requirementToAdd}
                handleChange={handleChange}
                addedRequirements={addedRequirements}
                addRequirement={handleAddRequirement}
                removeRequirement={handleRemoveRequirement}
              />
              <div className="d-flex justify-content-between">
                <IconButton onClick={() => setShowAddRequirements(false)}>
                  <ArrowBack
                    sx={{
                      fontSize: "1.5em",
                      color: "#1e1b46",
                    }}
                  />
                </IconButton>
                <Button
                  onClick={handleSubmit}
                  className="submit-tags-button"
                  disabled={loading || addedRequirements.length === 0}
                  sx={{
                    backgroundColor: "#0A0529",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold",
                    opacity: loading ? 0.5 : 1,
                    "&:hover": {
                      backgroundColor: "#070616",
                    },
                    "&:disabled": {
                      backgroundColor: "#0a0529bc",
                      color: "#FFFFFF99",
                    },
                  }}
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
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
