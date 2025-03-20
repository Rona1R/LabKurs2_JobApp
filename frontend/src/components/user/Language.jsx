import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import EditDeleteMenu from "./EditDeleteMenu";

export default function Language({
  name,
  level,
  id,
  editable,
  setSelected,
  showEdit,
  showDelete,
}) {

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
    <ListItem sx={{p:2}}>
      <ListItemText primary={`${name} - ${level}`} />
      {editable && (
        <EditDeleteMenu
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          iconColor={"#0A0529"}
        />
      )}
    </ListItem>
  );
}
