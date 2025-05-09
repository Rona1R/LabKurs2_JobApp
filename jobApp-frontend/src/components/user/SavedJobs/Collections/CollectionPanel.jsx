import { Box, Button, Typography } from "@mui/material";
// import CustomButton from "src/components/common/ui/CustomButton";
// import AddIcon from "@mui/icons-material/Add";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

export default function CollectionPanel({collectionName,nrOfPosts}) {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#0A0529",
          py: 6,
          display: "flex",
          justifyContent: "space-between",
          px: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BookmarkBorderIcon
            sx={{ color: "#e8f0fe", mr: 3, fontSize: {xs:"2.5em",md:"4em"} }}
          />
          <Box>
            <Typography
              sx={{ fontWeight: "bold", color: "#e8f0fe", textAlign: "start",fontSize: {xs:"1.5em",md:"2.5em"}}}
            >
              {collectionName}
            </Typography>
            <Typography
              sx={{
                color: "#e8f0fe",
                textAlign: "start",
                fontWeight: "bold",
                fontSize: {xs:"1em",md:"1.5em"} 
              }}
            >
              {nrOfPosts} {nrOfPosts === 1 ? "Saved Post" : "Saved Posts"}
            </Typography>
          </Box>
        </Box>
        {/* <CustomButton>
          <AddIcon sx={{ mr: 1 }} />
          Add Posts
        </CustomButton> */}
      </Box>
      <Button
        onClick={() => navigate("/savedJobs")}
        sx={{
          textTransform: "none",
          mt: 2,
          display: "flex",
          mr: "0 auto",
          ml: 3,
        }}
      >
        <ArrowBack sx={{ mr: 1, fontSize: "2em", color: "#0A0529" }} />

        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "#0A0529", textAlign: "start" }}
        >
          Back To Saved Posts
        </Typography>
      </Button>
    </>
  );
}
