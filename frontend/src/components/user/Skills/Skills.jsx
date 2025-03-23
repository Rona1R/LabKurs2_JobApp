import Skill from "../Skill";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { SkillService } from "api/sevices/SkillService";
import Loading from "components/common/Loading";
import CreateSkill from "./CreateSkill";
import NoDataYet from "components/common/NoDataYet";
import AddIcon from '@mui/icons-material/Add';
const skillService = new SkillService();

export default function Skills(props) {
  const [selected, setSelected] = useState(null);
  const [userSkills, setUserSkills] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [refreshKey, setRefreshKey] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await skillService.getByUser(props.userId);
        setUserSkills(response.data);
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
        <CreateSkill
          userId={props.userId}
          handleClose={() => setShowCreate(false)}
          refresh={() => setRefreshKey(Date.now())}
        />
      )}

      <div className="tw-flex tw-gap-3 tw-flex-wrap">
        {loading ? (
          <Loading />
        ) : ( 

          userSkills.length> 0 ? 
          userSkills.map((skill, index) => (
            <Skill
              key={index}
              skill={skill.name}
              id={skill.id}
              editable={true}
              setSelected={setSelected}
              showEdit={setShowEdit}
              showDelete={setShowDelete}
            />
          )) : <NoDataYet message={"Skills haven't been listed yet"}/>
        )}
        <IconButton
          sx={{ color: "hsl(218, 94.40%, 21.20%)" }}    
          onClick={() => setShowCreate(true)}
        >
          <AddIcon sx={{fontSize:"2em"}}/>
        </IconButton>
      </div>
    </>
  );
}
