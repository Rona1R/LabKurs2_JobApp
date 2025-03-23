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
    <div className="d-flex justify-content-between align-items-center px-3 py-2 mb-2 rounded" style={{ 
      backgroundColor: '#e8f0fe', 
      borderColor: '#89aede', 
      color: '#2a3f5f' 
    }}>
      <span className="fw-bold fs-5" style={{color:"#333699"}}>{skill}</span>
      {editable && (
        <EditDeleteMenu
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          iconColor="hsl(218, 94.40%, 21.20%)"
        />
      )}
    </div>
  );
}

export default Skill;
