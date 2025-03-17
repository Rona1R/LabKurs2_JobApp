import React from "react";
import CategoriesTable from "components/dashboard/Admin/Categories/CategoriesTable";
import { Typography } from "@mui/material";

export default function Categories() {
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
        Categories
      </Typography>

      <CategoriesTable />
    </>
  );
}
