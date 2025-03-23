import React from "react";
import { Typography } from "@mui/material";
import UsersTable from "../../../../components/dashboard/Admin/Users/UsersTable";

export default function Users() {
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
        All Users
      </Typography>
      <UsersTable />
    </>
  );
}
