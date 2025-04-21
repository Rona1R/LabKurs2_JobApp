import React from "react";
import InstitutionsTable from "src/components/dashboard/Admin/Institutions/InstitutionsTable";
import { Typography } from "@mui/material";

export default function Institutions() {
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
        Institutions
      </Typography>

      <InstitutionsTable/>
    </>
  );
}