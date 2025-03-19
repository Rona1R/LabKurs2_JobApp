import { Typography, IconButton, Box, Button } from "@mui/material";
import { Spinner } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import { JobTagService } from "api/sevices/JobTagService";
import { TagService } from "api/sevices/TagService";
import { useEffect } from "react";
import * as React from "react";
import Modal from "react-bootstrap/Modal";
import Stack from "@mui/material/Stack";
import JobTag from "./JobTag";
import NoDataYet from "components/common/NoDataYet";
import TagSelection from "../CreateJob/TagSelection";
import { ArrowBack } from "@mui/icons-material";
import { useNotification } from "hooks/useNotification";
import DeleteJobTag from "./DeleteJobTag";
import Loading from "components/common/Loading";
const jobTagService = new JobTagService();
const tagService = new TagService();

export default function JobDetails(props) {
  const [tags, setTags] = React.useState([]);
  const [tagsToSelect, setTagsToSelect] = React.useState([]);
  const [selectedTag, setSelectedTag] = React.useState(null);
  const [addedTags, setAddedTags] = React.useState([]);
  const [loadingTags, setLoadingTags] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [showTagSelection, setShowTagSelection] = React.useState(false);
  const [refreshKey, setRefreshKey] = React.useState("");
  const [showDelete, setShowDelete] = React.useState(false);
  const [tagToDelete, setTagToDelete] = React.useState(null);
  const { showNotification } = useNotification();
  const { handleClose } = props;

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await jobTagService.getTagsByJob(props.id);
        setTags(response.data);
      } catch (err) {
        console.log(err);
        handleClose();
      } finally {
        setLoadingTags(false);
      }
    };

    fetchData();
  }, [props.id, handleClose, refreshKey]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await tagService.getAll();
        setTagsToSelect(response.data);
      } catch (err) {
        console.log(err);
        handleClose();
      }
    };

    fetchData();
  }, [handleClose]);

  const handleTagChange = (event, newValue) => {
    setSelectedTag(newValue);
  };

  const handleAddTag = () => {
    if (selectedTag) {
      setAddedTags([...addedTags, selectedTag]);
      setSelectedTag(null);
    }
  };

  // remove tag nga tagselection lista (nfront)
  const handleRemoveTag = (tagId) => {
    setAddedTags(addedTags.filter((t) => t.id !== tagId));
  };

  // me remove JobTag nga Databaza
  const handleJobTagDelete = (id) => {
    setTagToDelete(id);
    setShowDelete(true);
  };

  // shtimi i tags te reja ne databaze
  const handleSubmit = async () => {
    setLoading(true);
    const formattedTags = addedTags.map((tag) => ({
      jobId: props.id,
      tagId: tag.id,
    }));
    try {
      await jobTagService.addJobTags(formattedTags);
      setLoading(false);
      setRefreshKey(Date.now());
      showNotification("success", "Tags were successfully added!");
      setShowTagSelection(false);
      // handleClose();
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
            {" "}
            {showDelete
              ? "Delete Tag"
              : showTagSelection
              ? "Add Tags"
              : "Job Details"}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showDelete ? (
            <DeleteJobTag
              jobTagId={tagToDelete}
              handleClose={() => setShowDelete(false)}
              refresh={() => setRefreshKey(Date.now())}
            />
          ) : (
            <>
              {showTagSelection ? (
                <>
                  <TagSelection
                    tags={tagsToSelect}
                    selectedTag={selectedTag}
                    handleTagChange={handleTagChange}
                    addedTags={addedTags}
                    addTag={handleAddTag}
                    removeTag={handleRemoveTag}
                  />
                  <div className="d-flex justify-content-between">
                    <IconButton onClick={() => setShowTagSelection(false)}>
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
                      disabled={loading || addedTags.length === 0}
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
              ) : loadingTags ? (
                <div className="d-flex justify-content-center">
                  <Loading />
                </div>
              ) : ( 
                tags.length === 0 ?
                <NoDataYet message = "No tags were added yet"/>
                :
                  <Stack
                    direction="row"
                    spacing={1}
                    gap={1}
                    alignItems={"center"}
                    flexWrap={"wrap"}
                  >
                    <Typography
                      variant="p"
                      sx={{
                        color: "#333333",
                        fontWeight: "bold",
                        marginBottom: "1em",
                        fontSize: "30px",
                        textJustify: "center",
                      }}
                    >
                      Tags :
                    </Typography>
                    {tags.map((tag, index) => (
                      <JobTag
                        key={index}
                        id={tag.id}
                        label={tag.tag}
                        editable={true}
                        handleDelete={handleJobTagDelete}
                      />
                    ))}
                  </Stack>
              )}
              {!showTagSelection && (
                <Box sx={{ display: "flex" }}>
                  <IconButton
                    sx={{ color: "#1e1b46", marginLeft: "auto" }}
                    onClick={() => setShowTagSelection(true)}
                  >
                    <AddIcon sx={{ fontSize: "1.5em" }} />
                  </IconButton>
                </Box>
              )}
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
