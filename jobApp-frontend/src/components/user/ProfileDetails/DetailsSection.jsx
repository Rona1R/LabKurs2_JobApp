import { Box, IconButton } from "@mui/material";
import OpenToModal from "./OpenToSection/OpenToModal";
import { useState } from "react";
import { Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function DetailsSection({ profileDetails, refresh }) {
  const [showOpenTo, setShowOpenTo] = useState(false);

  return (
    <>
      {showOpenTo && (
        <OpenToModal
          handleClose={() => setShowOpenTo(false)}
          profileDetails={profileDetails}
          refresh={refresh}
        />
      )}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography
          variant="h4"
          sx={{
            color: "#151034",
            fontWeight: "bold",
            marginBottom: "1em",
            marginTop: "1em",
          }}
        >
          Open To
          <IconButton
            sx={{ mx: 1, color: "hsl(218, 94.40%, 21.20%)" }}
            onClick={() => setShowOpenTo(true)}
          >
            <AddIcon sx={{ fontSize: "2em" }} />
          </IconButton>
        </Typography>
      </Box>
    </>
  );
}
