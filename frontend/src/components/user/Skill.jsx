import React from "react";
import EditDeleteMenu from "./EditDeleteMenu";

function Skill({ id, skill, editable, showEdit, showDelete, setSelected }) {

  const handleEdit = () => {
    // open edit modal
    setSelected(id);
    showEdit(true);
  };

  const handleDelete = () => {
    // open delete modal;
    setSelected(id);
    showDelete(true);
  };

  return (
    <div
      className={`tw-rounded-sm tw-bg-blue-100 tw-pl-10 tw-pr-3 tw-py-2 tw-text-xl tw-font-bold tw-text-blue-800 tw-flex tw-justify-between tw-items-center`}
    >
      {skill}
      {
        editable && 

        <EditDeleteMenu
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          iconColor={"hsl(218, 94.40%, 21.20%)"}
          />

      }
    </div>
  );
}

export default Skill;
