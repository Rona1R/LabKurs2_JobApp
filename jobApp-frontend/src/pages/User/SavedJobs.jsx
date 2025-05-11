import { useState } from "react";
import CustomTabPanel from "src/components/user/SavedJobs/CustomTabPanel";
import { Box } from "@mui/material";
import AllSavedJobs from "src/components/user/SavedJobs/AllSavedJobs";
import Collections from "src/components/user/SavedJobs/Collections/Collections";

export default function SavedJobs() {
  const [activeTab, setActiveTab] = useState("Saved Posts");

  return (
    <>
      <Box sx={{ backgroundColor: "#0A0529", height: "170px" }} />
      <Box sx={{ mt: -10, px: { xs: 2, md: 10 } }}>
        <CustomTabPanel activeTab={activeTab} setActiveTab={setActiveTab} />
      </Box>
      {
        activeTab === 'Saved Posts' ? 
        <AllSavedJobs />:
        <Collections />
      }
    </>
  );
}
