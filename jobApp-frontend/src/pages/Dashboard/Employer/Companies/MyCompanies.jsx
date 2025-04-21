import React from "react";
import { Typography } from "@mui/material";
import CompaniesByEmployer from "src/components/dashboard/Employer/Companies/CompaniesByEmployer";

export default function MyCompanies() {
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
        My Companies
      </Typography>
      <CompaniesByEmployer/>
    </>
  );
}
