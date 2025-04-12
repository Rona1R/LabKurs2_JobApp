import Skill from "../Skill";
import { IconButton } from "@mui/material";
import { useState } from "react";
import Loading from "src/components/common/Loading";
import UpdateSkill from "./UpdateSkill";
import DeleteSkill from "./DeleteSkill";
import NoDataYet from "../../../components/common/NoDataYet";
import AddIcon from "@mui/icons-material/Add";
import AddSkills from "./AddSkills";

export default function Skills({ userProfile, refresh, loading, editable }) {
  const [selected, setSelected] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  return (
    <>
      {showCreate && (
        <AddSkills
          userProfile={userProfile}
          handleClose={() => setShowCreate(false)}
          refresh={refresh}
        />
      )}

      {showEdit && (
        <UpdateSkill
          selected={selected}
          userProfile={userProfile}
          handleClose={() => setShowEdit(false)}
          refresh={refresh}
        />
      )}

      {showDelete && (
        <DeleteSkill
          selected={selected}
          userProfile={userProfile}
          handleClose={() => setShowDelete(false)}
          refresh={refresh}
        />
      )}
      <div className="d-flex flex-wrap gap-3">
        {loading ? (
          <Loading />
        ) : userProfile.skills.length > 0 ? (
          userProfile.skills.map((skill, index) => (
            <Skill
              key={index}
              skill={skill}
              editable={editable}
              setSelected={setSelected}
              showEdit={setShowEdit}
              showDelete={setShowDelete}
            />
          ))
        ) : (
          <NoDataYet message={"Skills haven't been listed yet"} />
        )}

        {editable && (
          <IconButton
            sx={{ color: "hsl(218, 94.40%, 21.20%)" }}
            onClick={() => setShowCreate(true)}
          >
            <AddIcon sx={{ fontSize: "2em" }} />
          </IconButton>
        )}
      </div>
    </>
  );
}
