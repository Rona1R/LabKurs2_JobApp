import Grid from "@mui/material/Grid2";
import ExperienceCard from "../ExperienceCard";
import { IconButton, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { ExperienceService } from "../../../api/sevices/ExperienceService";
import Loading from "../../../components/common/Loading";
import NoDataYet from "../../../components/common/NoDataYet";
import CreateExperience from "./CreateExperience";
import UpdateExperience from "./UpdateExperience";
import DeleteExperience from "./DeleteExperience";
const experienceService = new ExperienceService();

export default function Experience(props) {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await experienceService.getByUser(props.userId);
        setExperiences(response.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [props.userId, refreshKey]);

  return (
    <>
      {showCreate && (
        <CreateExperience
          userId={props.userId}
          handleClose={() => setShowCreate(false)}
          refresh={() => setRefreshKey(Date.now())}
        />
      )}

      {showEdit && selected && (
        <UpdateExperience
          id={selected}
          handleClose={() => setShowEdit(false)}
          refresh={() => setRefreshKey(Date.now())}
        />
      )}

      {showDelete && selected && (
        <DeleteExperience
          id={selected}
          handleClose={() => setShowDelete(false)}
          refresh={() => setRefreshKey(Date.now())}
        />
      )
      }
      <div className="mx-sm-5">
        <Typography
          variant="h4"
          sx={{
            color: "#151034",
            fontWeight: "bold",
            marginBottom: "1em",
            marginTop: "1em",
          }}
        >
          Experiences
          <IconButton
            sx={{ mx:1,color: "hsl(218, 94.40%, 21.20%)" }} 
            onClick={() => setShowCreate(true)}
          >
            <AddIcon sx={{fontSize:"2em"}}/>
          </IconButton>
        </Typography>
        {loading ? (
          <div style={{ marginTop: "150px", marginBottom: "150px" }}>
            <Loading />
          </div>
        ) : experiences.length === 0 ? (
          <div className="mt-5 mb-5">
            <NoDataYet message={"No Experience has been listed yet"} />
          </div>
        ) : (
          <Grid container spacing={4} mb={4} justifyContent={"center"}>
            {experiences.map((experience) => (
              <Grid
                size={{ md: 6, xl: 4 }}
                key={experience.id}
                sx={{ width: "100%" }}
              >
                <ExperienceCard
                  jobTitle={experience.jobTitle}
                  company={
                    experience.companyName || experience.manualCompanyName
                  }
                  description={experience.description}
                  startDate={experience.startDate}
                  endDate={experience.endDate}
                  id={experience.id}
                  editable={true}
                  setSelected={setSelected}
                  showEdit={setShowEdit}
                  showDelete={setShowDelete}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </>
  );
}
