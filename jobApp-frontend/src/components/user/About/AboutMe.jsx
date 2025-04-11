import { IconButton, Typography } from "@mui/material";
import ModeIcon from '@mui/icons-material/Mode';
import EditAboutMe from "./EditAboutMe";
import { useState } from "react";
import Loading from "../../../components/common/Loading";
import NoDataYet from "../../../components/common/NoDataYet";

export default function AboutMe({userData,refresh,isLoading,editable}) {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <>
      {showEdit && (
        <EditAboutMe
          user={userData}
          refresh={refresh}
          handleClose={() => setShowEdit(false)}
        />
      )}

      <div style={{ width: "70%", margin: "0 auto", padding: "90px 0px" }}>
        <Typography
          variant="h4"
          sx={{ color: "#151034", fontWeight: "bold", marginBottom: "1em" }}
        >
          About Me
          {editable && (
            <IconButton sx={{ marginLeft: "10px", color: "hsl(218, 94.40%, 21.20%)"  }} onClick={() => setShowEdit(true)}>
              <ModeIcon sx={{fontSize:"1.5em"}}/>
            </IconButton>
          )}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: { md: "2em" },
            color: "#555555",
            fontWeight: "bold",
            padding: "20px 0px",
          }}
        >
          {
             isLoading ? <Loading/> : (userData.aboutMe? 
              userData.aboutMe : <NoDataYet message={"No Description added, yet"}/>
             )
          }
        </Typography>
      </div>
    </>
  );
}
