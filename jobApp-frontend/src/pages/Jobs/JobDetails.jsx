import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Divider,
  Stack,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArticleIcon from "@mui/icons-material/Article";
import Grid from "@mui/material/Grid2";

export default function JobDetails() {
  const { id } = useParams();

  return (
    <>
      <Box sx={{ backgroundColor: "#0A0529", height: "300px" }} />
      {/* Details for job : {id} */}
      <Card
        sx={{
          borderRadius: 5,
          boxShadow: "5px 5px 25px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s, box-shadow 0.3s",
          mx: { xs: 3, lg: 25 },
          mt: -20,
          mb: 10,
        }}
      >
        <CardContent sx={{ width: "100%" }}>
          <Box
            sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
          >
            <CardMedia
              component="img"
              sx={{
                height: 200,
                maxWidth: 350,
                objectFit: "contain",
                margin: "0 auto",
              }}
              image={`/images/logo-comany.webp`}
              alt="Company Logo"
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                px: 3,
                width: "100%",
              }}
            >
              <Typography
                variant="h4"
                component="div"
                sx={{
                  fontWeight: 700,
                  color: "#0A0833",
                  my: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: "start",
                }}
              >
                Senior Software Engineer
                <IconButton>
                  <FavoriteIcon
                    sx={{ color: "rgba(29, 33, 136, 0.75)", fontSize: "1.8em" }}
                  />
                </IconButton>
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 700,
                  color: "#0A0833",
                  mb: 1,
                  textAlign: "start",
                }}
              >
                Example Company
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ borderWidth: "2px", width: "100%" }} />
            <Grid container spacing={4} alignItems={"center"} sx={{py:3,px:2,my:4,width:{md:"50%"},backgroundColor:"#f8f9ff",borderRadius:"20px"}}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 700,
                    color: "#0A0833",
                    display: "flex",
                    alignItems: "center",
                    textAlign:"start"
                  }}
                >
                  <PlaceIcon sx={{ fontSize: "1.3em", mr: 2, color: "#777" }} />
                  Kosovo, Pristina
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 700,
                    color: "#0A0833",
                    display: "flex",
                    alignItems: "center",
                    textAlign:"start"
                  }}
                >
                  <BusinessCenterIcon
                    sx={{ fontSize: "1.3em", mr: 2, color: "#777" }}
                  />
                  Information Technology
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 700,
                    color: "#0A0833",
                    display: "flex",
                    alignItems: "center",
                    textAlign:"start"
                  }}
                >
                  <AccessTimeIcon
                    sx={{ fontSize: "1.3em", mr: 2, color: "#777" }}
                  />
                  2 days left
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 700,
                    color: "#0A0833",
                    display: "flex",
                    alignItems: "center",
                    textAlign:"start"
                  }}
                >
                  <ArticleIcon
                    sx={{ fontSize: "1.3em", mr: 2, color: "#777" }}
                  />
                  Full-Time
                </Typography>
              </Grid>
            </Grid>
        </CardContent>
      </Card>
    </>
  );
}
