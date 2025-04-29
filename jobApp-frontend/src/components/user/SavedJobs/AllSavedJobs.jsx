import { Box } from "@mui/material";
import SavedJobCard from "src/components/user/SavedJobs/SavedJobCard";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { SavedJobService } from "src/api/sevices/SavedJobService";
import { useAuth } from "src/context/AuthContext";
import Loading from "src/components/common/Loading";
import NoDataYet from "src/components/common/NoDataYet";
const savedJobService = new SavedJobService();

export default function AllSavedJobs() {
  const { user } = useAuth();
  const userId = user?.nameid;
  const [savedJobs, setSavedJobs] = useState([]);
  const [refreshKey, setRefreshKey] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await savedJobService.getSavedJobsByUser(userId);
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
      <Box sx={{my:15}}>
        {loading ? (
          <Box sx={{ my: 30 }}>
            <Loading />
          </Box>
        ) : savedJobs.length === 0 ? (
          <Box sx={{ my: 30 }}>
            <NoDataYet message={"No saved jobs yet !"} />
          </Box>
        ) : (
        <Box sx={{ mx: {xs:2, md: 5, lg: 30 }} }>
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