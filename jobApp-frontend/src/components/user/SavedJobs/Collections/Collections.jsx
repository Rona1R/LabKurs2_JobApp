import { useEffect, useState } from "react";
import { SavedJobCollectionService } from "src/api/sevices/SavedJobCollectionService";
import { Box } from "@mui/material";
import { useAuth } from "src/context/AuthContext";
import Loading from "src/components/common/Loading";
import NoDataYet from "src/components/common/NoDataYet";
import CustomButton from "src/components/common/ui/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import CreateCollection from "./CreateCollection";
import CollectionCard from "./CollectionCard";
import Grid from "@mui/material/Grid2";
import UpdateCollection from "./UpdateCollection";
import DeleteCollection from "./DeleteCollection";
const savedJobCollectionService = new SavedJobCollectionService();

export default function Collections() {
  const { user } = useAuth();
  const userId = user?.nameid;
  const [collections, setCollections] = useState([]);
  const [refreshKey, setRefreshKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await savedJobCollectionService.getCollectionsByUser(
          userId
        );
        console.log(response.data);
        setCollections(response.data);
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
      {showCreateCollection && (
        <CreateCollection
          handleClose={() => setShowCreateCollection(false)}
          refresh={() => setRefreshKey(Date.now())}
        />
      )}

      {showEdit && selected && 
        <UpdateCollection
          id={selected}
          handleClose={() => setShowEdit(false)}
          refresh={() => setRefreshKey(Date.now())}
        />
      }

      {showDelete && selected &&       
        <DeleteCollection
          id={selected}
          handleClose={() => setShowDelete(false)}
          refresh={() => setRefreshKey(Date.now())}
        />
      }

      <Box sx={{ my: 10 }}>
        {loading ? (
          <Box sx={{ my: 30 }}>
            <Loading />
          </Box>
        ) : collections.length === 0 ? (
          <Box sx={{ my: 30 }}>
            <NoDataYet
              message={
                "Create a new collection with your favorite postings. Your collections appear here."
              }
            />
            <CustomButton handleClick={() => setShowCreateCollection(true)}>
              <Box sx={{ py: 1 }}>
                <AddIcon sx={{ mr: 1 }} />
                Create a new collection
              </Box>
            </CustomButton>
          </Box>
        ) : (
          <Box sx={{ mx: { xs: 2, md: 5, lg: 30 } }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
              <CustomButton handleClick={() => setShowCreateCollection(true)}>
                <Box sx={{ py: 1 }}>
                  <AddIcon sx={{ mr: 1 }} />
                  Create a new collection
                </Box>
              </CustomButton>
            </Box>
            <Grid container spacing={4} mb={4} justifyContent={"center"}>
              {collections.map((collection) => (
                <Grid
                  size={{ md: 6, xl: 4 }}
                  sx={{ width: "100%" }}
                  key={collection.id}
                >
                  <CollectionCard
                    key={collection.id}
                    id={collection.id}
                    name={collection.name}
                    postCount={collection.postCount}
                    setSelected={setSelected}
                    showEdit={setShowEdit}
                    showDelete={setShowDelete}
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
