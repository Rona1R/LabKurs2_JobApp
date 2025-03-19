import React from "react";
import { Typography, Box} from "@mui/material";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import "../../../styles/crud.css";
import { useEffect } from "react";
import { JobTagService } from "api/sevices/JobTagService";
import { useNotification } from "hooks/useNotification";
const jobTagService = new JobTagService();

export default function DeleteJobTag({ jobTagId, handleClose ,refresh}) {
  const [jobTag,setJobTag] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const { showNotification } = useNotification();   

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await jobTagService.getById(jobTagId);
        setJobTag(response.data);
      } catch (err) {
        console.log(err);
        handleClose();
      }
    };

    fetchData();
  }, [jobTagId, handleClose]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await jobTagService.delete(jobTagId); 
      refresh();
      showNotification("success","Tag was successfully removed!");
      handleClose();
    } catch (err) {
      showNotification("error","An Unexpected Error Occurred!");
      handleClose();
    }
    setLoading(false);
  };
  return (
    <>
      <Typography variant="h5">
        Are you sure that you want to remove the Tag{" "}
        <span style={{ fontWeight: "bold", color: "black" }}>
          "{jobTag.tag}"{" "}
        </span>
        from{" "}
        <span style={{ fontWeight: "bold", color: "black" }}>
          "{jobTag.job}" ?
        </span>
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end" ,marginTop:"20px"}}>
        <Button onClick={handleClose} className="crud-cancel">
          <FontAwesomeIcon icon={faXmark} style={{ marginRight: "10px" }} />
          Cancel
        </Button>
        <Button
          className="crud-confirm"
          onClick={handleDelete}
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
            <FontAwesomeIcon
              icon={faCheckCircle}
              style={{ marginRight: "10px" }}
            />
          )}
          Yes, I'm Sure
        </Button>
      </Box>
    </>
  );
}
