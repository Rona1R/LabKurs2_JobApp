import React from "react";
import { Typography } from "@mui/material";
import ApplicationsTable from "src/components/dashboard/Employer/Applications/ApplicationsTable";

export default function Applications() {
  return (
    <>
      <Typography
        variant="h4"
        mt={5}
        sx={{
          fontWeight: "bold",
          color: "#0A0529",
        }}
      >
        Applications
      </Typography>
      <ApplicationsTable/>
    </>
  );
}