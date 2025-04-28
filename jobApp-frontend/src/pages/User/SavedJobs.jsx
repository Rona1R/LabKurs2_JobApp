import { useEffect, useState } from "react";
import CustomTabPanel from "src/components/user/SavedJobs/CustomTabPanel";
import { Box } from "@mui/material";
import { SavedJobService } from "src/api/sevices/SavedJobService";
import { useAuth } from "src/context/AuthContext";
import Grid from "@mui/material/Grid2";
import SavedJobCard from "src/components/user/SavedJobs/SavedJobCard";
import Loading from "src/components/common/Loading";
import NoDataYet from "src/components/common/NoDataYet";
const savedJobService = new SavedJobService();

export default function SavedJobs() {
  const { user } = useAuth();
  const userId = user?.nameid;
  const [savedJobs, setSavedJobs] = useState([]);
  const [refreshKey, setRefreshKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Saved Posts");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await savedJobService.getSavedJobsByUser(7);
        console.log(response.data);
        setSavedJobs(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshKey]);

  return (
    <>
      <Box sx={{ backgroundColor: "#0A0529", height: "170px" }} />
      <Box sx={{ mt: -10, px: { xs: 2, md: 10 } }}>
        <CustomTabPanel activeTab={activeTab} setActiveTab={setActiveTab} />
      </Box>
      <Box sx={{ pt: 10 }}>
        {loading ? (
          <Box sx={{ my: 30 }}>
            <Loading />
          </Box>
        ) : savedJobs.length === 0 ? (
          <Box sx={{ my: 30 }}>
            <NoDataYet message={"No saved jobs yet !"} />
          </Box>
        ) : (
          <Box sx={{ mx: { xs: 2, md: 5, lg: 15 } }}>
            <Grid container spacing={6} my={8} justifyContent={"center"}>
              {savedJobs.map((posting, index) => (
                <Grid size={{ xs: 12, md: 6, xl: 4 }} key={index}>
                  <SavedJobCard
                    savedJobId={posting.id}
                    id={posting.job.id}
                    title={posting.job.title}
                    city={posting.job.city}
                    timeLeft={posting.job.daysLeft}
                    companyLogo={posting.job.companyLogo}
                    category={posting.job.category}
                    employmentType={posting.job.employmentType}
                    setRefreshKey={setRefreshKey} 
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </>
  );
}
