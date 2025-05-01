import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { TextField, Box, ThemeProvider } from "@mui/material";
import Spinner from "react-bootstrap/Spinner";
import "../../dashboard/styles/crud.css";
import { useNotification } from "src/hooks/useNotification";
import { SavedJobCollectionService } from "src/api/sevices/SavedJobCollectionService";
import { useAuth } from "src/context/AuthContext";
import CustomButton from "src/components/common/ui/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import CollectionItem from "./CollectionItem";
import NoDataYet from "src/components/common/NoDataYet";
import { SavedJobService } from "src/api/sevices/SavedJobService";
const savedJobCollectionService = new SavedJobCollectionService();
const savedJobService = new SavedJobService();

export default function AddToCollectionModal({
  jobId,
  refreshKey,
  handleClose,
  setShowCreateCollection,
}) {
  const { user } = useAuth();
  const userId = user?.nameid;
  const [collections, setCollections] = useState([]);
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await savedJobCollectionService.getCollectionsByUser(
          userId
        );
        console.log(response.data);
        setCollections(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [refreshKey]);

  const handleAddToCollection = async (collectionId) => {
    try {
      const response = await savedJobService.addToCollection(
        userId,
        jobId,
        collectionId
      );
      showNotification("success", response.data);
    } catch (err) {
      showNotification("error", "Something went wrong");
    } finally {
      handleClose();
    }
  };

  return (
    <Modal show={true} onHide={handleClose} className="crud-modal" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add To Collection</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CustomButton handleClick={() => setShowCreateCollection(true)}>
            <AddIcon sx={{ mr: 1 }} />
            Create Collection
          </CustomButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 3,
            pb: 3,
          }}
        >
          {collections.length === 0 ? (
            <div
              className="d-flex justify-content-center align-items-center p-3 text-muted fw-bold text-center"
              style={{ fontSize: "20px" }}
            >
              Create a new collection with your favorite postings. Your
              collections appear here.
            </div>
          ) : (
            collections.map((collection, index) => (
              <CollectionItem
                key={index}
                id={collection.id}
                handleAddToCollection={handleAddToCollection}
                collectionName={collection.name}
              />
            ))
          )}
        </Box>
      </Modal.Body>
    </Modal>
  );
}
