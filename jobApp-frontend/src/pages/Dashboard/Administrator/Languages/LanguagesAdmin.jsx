import React from "react";
import { Typography } from "@mui/material";
import LanguagesTable from "src/components/dashboard/Admin/Languages/LanguagesTable";
export default function LanguagesAdmin() {
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
            Languages
          </Typography>
          <LanguagesTable />
        </>
      
  );
}