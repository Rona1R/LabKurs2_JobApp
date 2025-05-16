import React from "react";
import { Typography } from "@mui/material";
import Interviews from "src/components/dashboard/Employer/Interviews/Interviews";

export default function InterviewsByEmployer() {
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
        Interviews
      </Typography>
      <Interviews/>
    </>
  );
}
