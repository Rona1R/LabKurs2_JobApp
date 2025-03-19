import React from "react";
import { Typography } from "@mui/material";
import EmployersTable from "components/dashboard/Admin/Employers/EmployersTable.";
export default function Employers() {
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
        Employers
      </Typography>
      <EmployersTable />
    </>
  );
}
