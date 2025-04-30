import { useParams } from "react-router-dom";
import { SavedJobCollectionService } from "src/api/sevices/SavedJobCollectionService";
import { useState, useEffect } from "react";
import Loading from "src/components/common/Loading";
import NoDataYet from "src/components/common/NoDataYet";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SavedJobCard from "src/components/user/SavedJobs/SavedJobCard";
import CollectionPanel from "src/components/user/SavedJobs/Collections/CollectionPanel";
const savedJobCollectionService = new SavedJobCollectionService();

export default function SavedJobsByCollection() {
  const { id } = useParams();
  const [savedJobs, setSavedJobs] = useState([]);
  const [refreshKey, setRefreshKey] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await savedJobCollectionService.getPostsByCollection(
          id
        );
        console.log(response.data);
        setSavedJobs(response.data.savedPosts);
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
    <Box>
      <CollectionPanel/>
      {loading ? (
        <Box sx={{ my: 30 }}>
          <Loading />
        </Box>
      ) : savedJobs.length === 0 ? (
        <Box sx={{ my: 30 }}>
          <NoDataYet message={"No saved jobs in this collection yet !"} />
        </Box>
      ) : (
        <Box sx={{ mx: { xs: 2, md: 5, lg: 30 } }}>
          <Grid container spacing={6} my={8} justifyContent={"center"}>
            {savedJobs.map((posting, index) => (
              <Grid size={{ xs: 12, md: 6, xl: 4 }} key={index}>
                <SavedJobCard
                  savedJobId={posting.id}
                  id={posting.id}
                  title={posting.title}
                  city={posting.city}
                  timeLeft={posting.daysLeft}
                  companyLogo={posting.companyLogo}
                  category={posting.category}
                  employmentType={posting.employmentType}
                  setRefreshKey={setRefreshKey}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}
