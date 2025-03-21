import React, { useState } from "react";
import { Button, Box, Avatar, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import "./styles/ProfilePictureUpload.css";
import RemoveProfilePic from "./RemoveProfilePic";

function ProfilePictureUpload(props) {
  const [showRemove, setShowRemove] = useState(false);

  const handleRemove = () => {
    setShowRemove(true);
  };

  return (
    <>
      {showRemove && (
        <RemoveProfilePic
          handleClose={() => setShowRemove(false)}
          user = {props.user}
          userId = {props.userId}
          refresh={props.refresh}
        />
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        my={4}
      >
        {props.showRemove ? (
          <Tooltip
            title="Click to remove picture"
            enterDelay={500}
            leaveDelay={200}
          >
            <Box>
              <Avatar
                src={props.image || "/default-avatar.png"}
                alt="Profile"
                sx={{ width: 100, height: 100, margin: 2, cursor: "pointer" }}
                onClick={handleRemove}
              />
            </Box>
          </Tooltip>
        ) : (
          <Avatar
            src={props.image || "/default-avatar.png"}
            alt="Profile"
            sx={{ width: 100, height: 100, margin: 2, cursor: "pointer" }}
          />
        )}
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="upload-button-file"
          type="file"
          onChange={props.handleUpload}
          disabled={props.disabledButton}
        />
        <label htmlFor="upload-button-file">
          <Button
            component="span"
            className={`upload-picture ${
              props.disabledButton ? "upload-disabled" : ""
            }`}
            disabled={props.disabledButton}
          >
            Upload New Picture
            <FontAwesomeIcon
              icon={faPaperclip}
              style={{ marginLeft: "10px" }}
            />
          </Button>
        </label>
      </Box>
    </>
  );
}

export default ProfilePictureUpload;
