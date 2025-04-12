import React from "react";
import { Alert as MuiAlert } from "@mui/material";

export default function Alert({ message, type = "error" }) {
  if (!message) return null;

return (
    <MuiAlert
        severity={type}
        style={{
            margin: "10px 0",
            fontWeight: "bold",
            backgroundColor: "rgba(255, 0, 0, 0.1)"
        }}
    >
        {message}
    </MuiAlert>
);
}
