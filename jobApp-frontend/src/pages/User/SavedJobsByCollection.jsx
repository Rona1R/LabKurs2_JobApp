import { useParams } from "react-router-dom";
import { SavedJobCollectionService } from "src/api/sevices/SavedJobCollectionService";
import { useState, useEffect } from "react";
import Loading from "src/components/common/Loading";
import NoDataYet from "src/components/common/NoDataYet";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SavedJobCard from "src/components/user/SavedJobs/SavedJobCard";
import CollectionPanel from "src/components/user/SavedJobs/Collections/CollectionPanel";
import AddToCollectionModal from "src/components/jobs/SaveJob/AddToCollectionModal";
import CreateCollection from "src/components/user/SavedJobs/Collections/CreateCollection";
import { SavedJobService } from "src/api/sevices/SavedJobService";
import { useNotification } from "src/hooks/useNotification";
const savedJobCollectionService = new SavedJobCollectionService();
const savedJobService = new SavedJobService();

export default function SavedJobsByCollection() {
  const { id } = useParams();
  const [collection, setCollection] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);
  const [refreshKey, setRefreshKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAddToCollection, setShowAddToCollection] = useState(false);
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [createCollectionRefreshKey, setCreateCollectionRefreshKey] =
    useState("");
  const [savedJobToMove, setSavedToMove] = useState(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await savedJobCollectionService.getPostsByCollection(
          id
        );
        console.log(response.data);
        setCollection(response.data.name);
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

  const moveToCollection = (jobId) => {
    setShowAddToCollection(true);
    setSavedToMove(jobId);
  };

  const removeFromCollection = async (savedJobId) => {
    try{
      const response = await savedJobService.removeFromCollection(savedJobId);
      showNotification("success",response.data);
      setRefreshKey(Date.now());
    }catch(err){
      showNotification("error","Something went wrong !");
    }
  }; 

  return (
    <>
      {showCreateCollection && (
        <CreateCollection
          handleClose={() => setShowCreateCollection(false)}
          refresh={() => setCreateCollectionRefreshKey(Date.now())}
        />
      )}
      {showAddToCollection && !showCreateCollection && (
        <AddToCollectionModal
          jobId={savedJobToMove}
          refreshKey={createCollectionRefreshKey}
          handleClose={() => { setShowAddToCollection(false); setRefreshKey(Date.now()); }}
          setShowCreateCollection={setShowCreateCollection}
        />
      )}

      <Box>
        <CollectionPanel
          collectionName={collection}
          nrOfPosts={savedJobs?.length}
        />
        {loading ? (
          <Box sx={{ my: 30 }}>
            <Loading />
          </Box>
        ) : savedJobs.length === 0 ? (
          <Box sx={{ my: 30 }}>
            <NoDataYet message={"No saved jobs in this collection yet !"} />
          </Box>
        ) : (
          <Box sx={{ mx: { xs: 2, md: 5, lg: 15 }}}>
            <Grid container spacing={6} my={8} justifyContent={"center"}>
              {savedJobs.map((posting, index) => (
                <Grid size={{ xs: 12, md: 6, xl: 4 }} key={index}>
                  <SavedJobCard
                    savedJobId={posting.savedJobId}
                    id={posting.id}
                    title={posting.title}
                    city={posting.city}
                    timeLeft={posting.daysLeft}
                    companyLogo={posting.companyLogo}
                    category={posting.category}
                    employmentType={posting.employmentType}
                    moveToCollection={moveToCollection}
                    removeFromCollection={removeFromCollection}
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
