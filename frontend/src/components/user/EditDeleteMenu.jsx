import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function EditDeleteMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenEdit = () => {
    setAnchorEl(null);
    setTimeout(() => { // qe mos mu freeze ekrani kur tqelet modal tjeter
      props.handleEdit();
    }, 200);
  }

  const handleOpenDelete = () => {
    setAnchorEl(null);
    setTimeout(() => {
      props.handleDelete();
    }, 200);
  }
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon sx={{ color: props.iconColor}} />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleOpenEdit} sx={{ fontWeight: "bold" }}>
          <FontAwesomeIcon icon={faPen} style={{ marginRight: "8px" }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleOpenDelete} sx={{ fontWeight: "bold" }}>
          <FontAwesomeIcon icon={faTrash} style={{ marginRight: "8px",color:"darkred"}} />
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}

export default EditDeleteMenu;
