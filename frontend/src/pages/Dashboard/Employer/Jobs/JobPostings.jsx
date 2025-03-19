import React from "react";
import { Typography } from "@mui/material";
import JobsTable from "components/dashboard/Employer/Jobs/JobsTable";

export default function JobPostings() {
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
        Job Postings
      </Typography>
      <JobsTable/>
    </>
  );
}
