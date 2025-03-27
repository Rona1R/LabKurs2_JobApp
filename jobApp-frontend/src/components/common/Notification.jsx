import React from "react";
import { Snackbar, SnackbarContent } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import "./styles/Notification.css";

export default function Notification(props) {
  const icon =
    props.messagetype === "success" ? faCheckCircle : faExclamationTriangle;
  const color = props.messagetype === "success" ? "#C4D7C2" : "#FFE5E5";
  const letterColor = props.messagetype === "success" ? "#066628" : "#670806";

  const content = (
    <SnackbarContent
      style={{ backgroundColor: color, color: letterColor }}
      className="custom-snackbar-content"
      message={
        <span style={{ display: "flex", alignItems: "center" }}>
          <FontAwesomeIcon icon={icon} style={{ marginRight: 10 }} />
          {props.message}
        </span>
      }
    />
  );
  return (
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.isOpen}
        onClose={props.handleClose}
        autoHideDuration={2000}
      >
        {content}
      </Snackbar>
    )
}
