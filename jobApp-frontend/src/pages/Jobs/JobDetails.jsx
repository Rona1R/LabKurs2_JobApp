import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
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
import { JobService } from "src/api/sevices/JobService";
import Loading from "src/components/common/Loading";
import JobCard from "src/components/jobs/JobCard";
import { useAuth } from "src/context/AuthContext";
import { SavedJobService } from "src/api/sevices/SavedJobService";
import SavedSnackbar from "src/components/jobs/SaveJob/SavedSnackbar";
import AddToCollectionModal from "src/components/jobs/SaveJob/AddToCollectionModal";
import CreateCollection from "src/components/user/SavedJobs/Collections/CreateCollection";
import CreateApplication from "src/components/jobs/JobApplications/CreateApplication";
import { useNotification } from "src/hooks/useNotification";
import { JobApplicationService } from "src/api/sevices/JobApplicationService";
const jobService = new JobService();
const savedJobService = new SavedJobService();
const jobApplicationService = new JobApplicationService();

export default function JobDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const userId = user?.nameid;
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [recommandations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const [isDeadlinePassed,setIsDeadlinePassed] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showAddToCollectionModal, setShowAddToCollectionalModal] =
    useState(false);
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [collectionsRefreshKey, setCollectionsRefreshKey] = useState("");
  const [showApply, setShowApply] = useState(false);
  const { showNotification } = useNotification();
  const descriptionRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobResponse, recommandationsResponse] = await Promise.all([
          jobService.getDetails(id),
          jobService.getSimilarPostings(id),
        ]);
        setData(jobResponse.data);
        setIsDeadlinePassed(new Date(jobResponse.data.job.deadline + "Z") < new Date());
        setRecommendations(recommandationsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const [savedResponse,appliedResponse] = await Promise.all([
            await savedJobService.isJobSaved(userId, id),
            await jobApplicationService.hasApplied(userId,id)
          ])
          setIsSaved(savedResponse.data);
          setHasApplied(appliedResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId, id]);

  useEffect(() => {
    const el = descriptionRef.current;
    if (el) {
      setShowToggle(el.scrollHeight > el.offsetHeight);
    }
  }, [data?.job.description]);

  const handleSaveJob = async () => {
    if (userId) {
      setIsSaved(true);
      try{
        const response = await savedJobService.create({
          userId : userId,
          jobId: id
        })
        console.log("Job that was just saved : ");
        console.log(response);
        setShowSnackbar(true);
      }catch(err){
        showNotification("error","An unexpected error occurred!");
        setIsSaved(false);
      }
      console.log("Attempting to save job.");
    }else{
      navigate("/LogIn");
    }
  };

  const handleUnSaveJob = async () => {
    setIsSaved(false);
    try{
      await savedJobService.unsaveJobByUserAndJob(userId,id);
      showNotification("success","Job was successfully unsaved!");
    }catch(err){
      showNotification("error","An unexpected error occurred!");
      setIsSaved(true);
    }
  };

  const handleShowApply = () => {
    if(userId){
      setShowApply(true);
    }else{
      navigate("/LogIn");
    }
  }

  return (
    <>
      <SavedSnackbar
        open={showSnackbar}
        setOpen={setShowSnackbar}
        handleCollection={() => setShowAddToCollectionalModal(true)}
      />

      {showCreateCollection && (
        <CreateCollection
          handleClose={() => setShowCreateCollection(false)}
          refresh={() => setCollectionsRefreshKey(Date.now())}
        />
      )}
      {showAddToCollectionModal && !showCreateCollection && (
        <AddToCollectionModal
          jobId={id}
          refreshKey={collectionsRefreshKey}
          handleClose={() => setShowAddToCollectionalModal(false)}
          setShowCreateCollection={setShowCreateCollection}
        />
      )}

      {
        showApply && 
        <CreateApplication 
          applicantId={userId}
          applicantName={user.sub}
          applicantEmail={user.email}
          setHasApplied={setHasApplied}
          jobId={id}
          handleClose={()=>setShowApply(false)}
        />
      }

      <Box sx={{ backgroundColor: "#0A0529", height: "300px" }} />
      {loading ? (
        <Box sx={{ my: 30 }}>
          <Loading />
        </Box>
      ) : (
        <>
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
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: 200,
                    maxWidth: 350,
                    objectFit: "contain",
                    margin: "0 auto",
                  }}
                  image={`${import.meta.env.VITE_IMAGE_PATH}/${
                    data?.job.companyLogo
                  }`}
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
                    {data?.job.title}
                    {isSaved ? (
                      <IconButton onClick={handleUnSaveJob}>
                        <FavoriteIcon
                          sx={{
                            color: "rgba(255, 4, 117, 0.75)",
                            fontSize: "1.8em",
                          }}
                        />
                      </IconButton>
                    ) : (
                      <IconButton onClick={handleSaveJob}>
                        <FavoriteBorderIcon
                          sx={{
                            color: "rgba(46, 34, 40, 0.75)",
                            fontSize: "1.8em",
                          }}
                        />
                      </IconButton>
                    )}
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
                    {data?.job.company}
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
                    ({data?.job.payRange}) {data?.job.salaryPeriod}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ borderWidth: "2px", width: "100%" }} />
              <Box sx={{ mx: 2 }}>
                {data?.tags.length > 0 && (
                  <Stack direction="row" gap={2} mt={4} flexWrap={"wrap"}>
                    {data?.tags.map((tag) => (
                      <Tag key={tag.id} id={tag.id} label={tag.name} />
                    ))}
                  </Stack>
                )}
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
                        {data?.job.city}, {data?.job.country.label}
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
                        {data?.job.category}
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
                        {data?.job.daysLeft}
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
                        {data?.job.employmentType}
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
                      ref={descriptionRef}
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
                      {data?.job.description}
                    </Typography>
                  </Box>
                </Box>
                {showToggle && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#0A0833",
                      cursor: "pointer",
                      textDecoration: "underline",
                      width: "fit-content",
                      fontWeight: 700,
                      ml: "auto",
                      mt: 1,
                      mr: 4,
                      "&:hover": { color: "#1d2188" },
                    }}
                    onClick={() => setExpanded(!expanded)}
                  >
                    {expanded ? "See Less" : "See More"}
                  </Typography>
                )}
                {(data?.niceToHaveSkills.length > 0 ||
                  data?.requiredSkills.length > 0 ||
                  data?.requirements.length > 0) && (
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
                    {data?.requirements.length > 0 && (
                      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                        <JobDetailsList
                          items={data?.requirements}
                          title="Requierements"
                        />
                      </Grid>
                    )}
                    {data?.requiredSkills.length > 0 && (
                      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                        <JobDetailsList
                          items={data?.requiredSkills}
                          title="Required Skills"
                        />
                      </Grid>
                    )}
                    {data?.niceToHaveSkills.length > 0 && (
                      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                        <JobDetailsList
                          items={data?.niceToHaveSkills}
                          title="Optional / Nice to have Skills"
                        />
                      </Grid>
                    )}
                  </Grid>
                )}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column-reverse", md: "row" },
                    justifyContent: "flex-end",
                    gap: 2,
                    mt: 5,
                  }}
                >
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
                        backgroundColor: "rgba(226, 226, 255, 0.92)",
                      },
                    }}
                    onClick={() => navigate("/jobPostings")}
                  >
                    Back To Jobs
                  </Button>
                  <Button
                    disabled={isDeadlinePassed || hasApplied}
                    onClick={handleShowApply}
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
                      },
                      "&:disabled": {
                        backgroundColor: "rgba(15, 18, 93, 0.61)",
                        color: "rgba(239, 239, 250, 0.68)",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    {isDeadlinePassed ? "Deadline Passed" : hasApplied ? "Already Applied" :"Apply Now"}
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
          {recommandations.length > 0 && (
            <Box
              sx={{
                backgroundColor: "#f8f9ff",
                borderRadius: "50px",
                py: 1,
                boxShadow: "5px 5px 25px rgba(0, 0, 0, 0.11)",
              }}
            >
              <Box sx={{ mx: { xs: 3, lg: 25 }, mt: 6 }}>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{
                    fontWeight: 700,
                    color: "#0A0833",
                    mb: 3,
                  }}
                >
                  You might also like
                </Typography>
                <Grid container spacing={6} mb={15} justifyContent={"center"}>
                  {recommandations.map((posting, index) => (
                    <Grid size={{ xs: 12, md: 6, xl: 4 }} key={index}>
                      <JobCard
                        id={posting.id}
                        title={posting.title}
                        city={posting.city}
                        timeLeft={posting.daysLeft}
                        companyLogo={posting.companyLogo}
                        category={posting.category}
                        employmentType={posting.employmentType}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          )}
        </>
      )}
    </>
  );
}
