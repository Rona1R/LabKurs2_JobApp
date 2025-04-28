import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ArticleIcon from "@mui/icons-material/Article";
import { useNavigate } from "react-router-dom";
import { SavedJobService } from "src/api/sevices/SavedJobService";
import { useNotification } from "src/hooks/useNotification";
const savedJobService = new SavedJobService();

export default function SavedJobCard({
  savedJobId,
  id,
  title,
  city,
  timeLeft,
  companyLogo,
  category,
  employmentType,
  setRefreshKey
}) {
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleUnsaveJob = async () => {
    try {
      await savedJobService.unsaveJob(savedJobId);
      setRefreshKey(Date.now());
      showNotification("success","Job unsaved successfully!");
    } catch (error) {
      showNotification("error","Something went wrong while unsaving the job!");    
    }
  };

  return (
    <Card
      sx={{
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff",
        position: "relative",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          height: 200,
          maxWidth: 350,
          objectFit: "contain",
        }}
        image={`${import.meta.env.VITE_IMAGE_PATH}/${companyLogo}`}
        alt="Company Logo"
        onClick={() => {
          navigate(`/jobPostings/job/${id}`);
        }}
      />
      <IconButton
        sx={{
          position: "absolute",
          top: 10,
          right: 10
        }}
        onClick={handleUnsaveJob}
      >
        <FavoriteIcon
          sx={{
            color: "rgba(255, 4, 117, 0.75)",
            fontSize: "1.8em",
            "&:hover": {
              color: "#ff4081",
            },
          }}
        />
      </IconButton>
      <CardContent
        sx={{
          width: "100%",
        }}
        onClick={() => {
          navigate(`/jobPostings/job/${id}`);
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: 700, color: "#0A0833", my: 4 }}
          noWrap
        >
          {title}
        </Typography>

        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <PlaceIcon sx={{ fontSize: 18, color: "#777" }} />
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", color: "#777", fontSize: 18 }}
              >
                {city}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <AccessTimeIcon sx={{ fontSize: 18, color: "#777" }} />
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", color: "#777", fontSize: 18 }}
              >
                {timeLeft}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ borderColor: "#0A0529", my: 3 }} />
          <Box
            sx={{
              mx: 4,
              backgroundColor: "#f8f9ff",
              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Stack
              spacing={1.5}
              sx={{
                margin: "0 auto",
                width: "80%",
                padding: 2,
              }}
            >
              <Typography
                variant="body2"
                noWrap
                sx={{
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "rgba(6, 14, 76, 0.88)",
                  textAlign: "start",
                }}
              >
                <BusinessCenterIcon sx={{ mr: 3, fontSize: 22 }} />
                {category}
              </Typography>
              <Typography
                variant="body2"
                noWrap
                sx={{
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "rgba(5, 9, 35, 0.88)",
                  textAlign: "start",
                }}
              >
                <ArticleIcon sx={{ mr: 3, fontSize: 22 }} />
                {employmentType}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
