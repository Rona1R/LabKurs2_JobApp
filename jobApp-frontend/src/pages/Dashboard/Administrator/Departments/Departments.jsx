import React from "react";
import DepartamentsTable from "src/components/dashboard/Admin/Departaments/DepartamentsTable";
import { Typography } from "@mui/material";

export default function Departaments() {
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
        Departaments
      </Typography>

      <DepartamentsTable/>
    </>
  );
}