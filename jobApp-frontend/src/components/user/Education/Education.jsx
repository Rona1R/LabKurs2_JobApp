import Grid from "@mui/material/Grid2";
import EducationCard from "../EducationCard";
import { IconButton, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { EducationService } from "../../../api/sevices/EducationService";
import { useEffect } from "react";
import Loading from "../../../components/common/Loading";
import NoDataYet from "../../../components/common/NoDataYet";
import CreateEducation from "./CreateEducation";
import UpdateEducation from "./UpdateEducation";
import DeleteEducation from "./DeleteEducation";
const educationService = new EducationService();

export default function Education(props) {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState("");
  const [selected, setSelected] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  //  nese personi qe po e kyqr profilin e vet osht logged in cards mi pas opsionet per edit/delete
  // nese dikush tjt po ja kqyr profilin, eddit/delete/add sduhet me ju shfaq

  // modals per educ card te selektum , per edit, delete kan mu shfaq ktu si modals - si te dashboard cruds
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await educationService.getByUser(props.userId);
        setEducations(response.data);
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
        <CreateEducation
          userId={props.userId}
          handleClose={() => setShowCreate(false)}
          refresh={() => setRefreshKey(Date.now())}
        />
      )}

      {showEdit && selected && (
        <UpdateEducation
          id={selected}
          handleClose={() => setShowEdit(false)}
          refresh={() => setRefreshKey(Date.now())}
        />
      )}

      {showDelete && selected && (
        <DeleteEducation
          id={selected}
          handleClose={() => setShowDelete(false)}
          refresh={() => setRefreshKey(Date.now())}
        />
      )}

      <div style={{ margin: "0px 30px" }}>
        {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
        <Typography
          variant="h4"
          sx={{
            color: "#151034",
            fontWeight: "bold",
            marginBottom: "1em",
            marginTop: "1em",
          }}
        >
          Education
          <IconButton
            sx={{ mx: 1, color: "hsl(218, 94.40%, 21.20%)" }}
            onClick={() => setShowCreate(true)}
          >
            <AddIcon sx={{ fontSize: "2em" }} />
          </IconButton>
        </Typography>
        {loading ? (
          <div style={{ marginTop: "150px", marginBottom: "150px" }}>
            <Loading />
          </div>
        ) : educations.length === 0 ? (
          <div className="mt-5 mb-5">
            <NoDataYet message={"Education has not been listed yet"} />
          </div>
        ) : (
          <Grid container spacing={4} mb={4} justifyContent={"center"}>
            {educations.map((education) => (
              <Grid
                size={{ md: 6, xl: 4 }}
                sx={{ width: "100%" }}
                key={education.id}
              >
                <EducationCard
                  institution={
                    education.institutionName || education.manualInstitutionName
                  }
                  degree={education.degree}
                  avgGrade={education.grade}
                  description={education.description}
                  field={education.fieldOfStudy}
                  startDate={education.startDate}
                  endDate={education.endDate}
                  editable={true}
                  id={education.id}
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
