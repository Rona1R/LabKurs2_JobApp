import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Divider,
  Stack,
  Button,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArticleIcon from "@mui/icons-material/Article";
import Grid from "@mui/material/Grid2";
import Tag from "src/components/jobs/Tag";
import JobDetailsList from "src/components/jobs/JobDetails/JobDeatilsList";

export default function JobDetails() {
  const { id } = useParams();
  const [expanded, setExpanded] = useState(false);

  const fullText = `As a Frontend Developer, you will be responsible for implementing
visual elements that users see and interact with in a web application. You will work closely with designers and backend
developers to build efficient, scalable, and high-quality user interfaces. You will also be responsible for ensuring the
technical feasibility of UI/UX designs and optimizing applications for maximum speed and high efficiency results. You will be tasked
with optimizing designs, performance, and usability of the application, in order to deliver high quality products to our customers.`;

  const tags = [
    {
      id: 7,
      name: "finance",
    },
    {
      id: 6,
      name: "hiring-now",
    },
    {
      id: 5,
      name: "job-opening",
    },
    {
      id: 4,
      name: "developer",
    },
    {
      id: 3,
      name: "UI/UX",
    },
    {
      id: 2,
      name: "software engineering",
    },
    {
      id: 1,
      name: "remote",
    },
  ];
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
                  my: 1,
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
                  color: "rgb(15, 18, 93)",
                  mb: 2,
                  textAlign: "start",
                }}
              >
                Example Company
              </Typography>
              <Typography
                variant="body2"
                component="div"
                sx={{
                  color: "#333333",
                  fontSize: "1em",
                  mb: 1,
                  fontWeight: "bold",
                  textAlign: "start",
                }}
              >
                (600 - 800 EUR) Monthly
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ borderWidth: "2px", width: "100%" }} />
          <Box sx={{ mx: 2 }}>
            <Stack direction="row" gap={2} mt={4} flexWrap={"wrap"}>
              {tags.map((tag) => (
                <Tag key={tag.id} id={tag.id} label={tag.name} />
              ))}
            </Stack>
            <Box
              sx={{
                display: "flex",
                flexWrap: { xs: "wrap", md: "nowrap" },
                alignItems: "center",
                gap: 4,
                mt: 4,
              }}
            >
              <Grid
                container
                spacing={5}
                alignItems={"center"}
                sx={{
                  py: 8,
                  px: 3,
                  width: { md: "50%" },
                  backgroundColor: "#f8f9ff",
                  borderRadius: "20px",
                }}
              >
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontWeight: 700,
                      color: "#0A0833",
                      display: "flex",
                      alignItems: "center",
                      textAlign: "start",
                    }}
                  >
                    <PlaceIcon
                      sx={{ fontSize: "1.3em", mr: 2, color: "#777" }}
                    />
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
                      textAlign: "start",
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
                      textAlign: "start",
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
                      textAlign: "start",
                    }}
                  >
                    <ArticleIcon
                      sx={{ fontSize: "1.3em", mr: 2, color: "#777" }}
                    />
                    Full-Time
                  </Typography>
                </Grid>
              </Grid>
              <Box
                sx={{
                  width: { md: "50%" },
                  maxHeight: "250px",
                  overflowY: "auto",
                  py: 1,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: "#333333",
                    textAlign: "start",
                    display: expanded ? "block" : "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: expanded ? "unset" : 6,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {fullText}
                </Typography>
              </Box>
            </Box>
            <Typography
              variant="body2"
              component="div"
              sx={{
                color: "#0A0833",
                cursor: "pointer",
                textDecoration: "underline",
                width: "fit-content",
                fontWeight: 700,
                marginLeft: "auto",
                mt: 1,
                mr: 4,
                "&:hover": { color: "#1d2188" },
              }}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "See Less" : "See More"}
            </Typography>
            <Grid
              container
              spacing={6}
              mt={4}
              justifyContent={"center"}
              sx={{
                backgroundColor: "#f8f9ff",
                borderRadius: "20px",
                px: 5,
                py: 3,
              }}
            >
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <JobDetailsList
                  items={[
                    "Experience with React, Angular, or Vue.js",
                    "Proficient in HTML, CSS, and JavaScript",
                    "Familiarity with RESTful APIs and web services",
                    "Strong understanding of responsive design principles",
                    "Experience with version control systems (e.g., Git)",
                    "Ability to work collaboratively in a team environment",
                    "Excellent problem-solving skills and attention to detail",
                  ]}
                  title="Responsibilities"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <JobDetailsList
                  items={[
                    "Experience with React, Angular, or Vue.js",
                    "Proficient in HTML, CSS, and JavaScript",
                    "Familiarity with RESTful APIs and web services",
                    "Strong understanding of responsive design principles",
                    "Experience with version control systems (e.g., Git)",
                  ]}
                  title="Required Skills"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <JobDetailsList
                  items={[
                    "Experience with React, Angular, or Vue.js",
                    "Proficient in HTML, CSS, and JavaScript",
                    "Familiarity with RESTful APIs and web services",
                    "Strong understanding of responsive design principles",
                    "Experience with version control systems (e.g., Git)",
                    "Ability to work collaboratively in a team environment",
                    "Excellent problem-solving skills and attention to detail",
                  ]}
                  title="Optional / Nice to have Skills"
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end",gap:2,mt:5}}>
              <Button
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  backgroundColor: "rgba(247, 247, 255, 0.92)",
                  color: "rgb(31, 35, 88)",
                  borderRadius: "20px",
                  px: 6,
                  py: 2,
                  fontSize: "1.5em",
                  "&:hover": {
                    backgroundColor: "rgba(226, 226, 255, 0.92)"
                  }
                }}
              >
                Back To Jobs
              </Button>
              <Button
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  backgroundColor: "rgba(51, 56, 145, 0.86)",
                  color: "rgba(239, 239, 250, 0.93)",
                  borderRadius: "20px",
                  px: 6,
                  py: 2,
                  fontSize: "1.5em",
                  "&:hover": {
                    backgroundColor: "rgb(15, 18, 93)",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                  }
                }}
              >
                Apply Now
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
