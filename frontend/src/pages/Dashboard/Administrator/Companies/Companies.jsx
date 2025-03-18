import React from "react";
import { Typography } from "@mui/material";
import CompaniesTable from "components/dashboard/Admin/Companies/CompaniesTable";

export default function Companies() {
  return (
    <>
      <Typography
        variant="h4"
        mt={5}
        sx = {{
            fontWeight:"bold",
            color:"#0A0529"
        }}
      >
        Companies
      </Typography>

      <CompaniesTable />
    </>
  );
}
