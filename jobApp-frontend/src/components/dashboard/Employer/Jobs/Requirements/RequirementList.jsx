import { List, ListItem, ListItemText, IconButton, Box } from "@mui/material";
import NoDataYet from "../../../../../components/common/NoDataYet";
import "../../../styles/table.css";

export default function RequirementList({
  requirements,
  handleEdit,
  handleDelete,
  removeFromList,
}) {
  return (
    <>
      {requirements.length > 0 ? (
        <List>
          {requirements.map((req, index) => (
            <ListItem
              key={index}
              sx={{ mb: 3, backgroundColor: "#f5f5f5", borderRadius: "20px" }}
            >
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                <Box sx={{ marginLeft: "auto" }}>
                  {handleEdit && (
                    <IconButton sx={{ fontSize: "15px" }} onClick={()=>handleEdit(req.id)}>
                      <i
                        className="fa-solid fa-pen-to-square"
                        style={{ color: "#0A0529" }}
                      ></i>
                    </IconButton>
                  )}

                  {handleDelete && ( // deletion from Database
                    <IconButton
                      sx={{ fontSize: "15px" }}
                      onClick={() => handleDelete(req.id)}
                    >
                      <i
                        className="fa-solid fa-trash"
                        style={{ color: "rgb(169, 71, 71)" }}
                      ></i>
                    </IconButton>
                  )}

                  {removeFromList && ( // removal from selection list 
                    <IconButton
                      sx={{ fontSize: "15px" }}
                      onClick={() => removeFromList(req.description)}
                    >
                      <i
                        className="fa-solid fa-x"
                      ></i>
                    </IconButton>
                  )}
                </Box>
                <ListItemText primary={req.description} />
              </Box>
            </ListItem>
          ))}
        </List>
      ) : (
        <NoDataYet message="No requirements listed" />
      )}

      {/* <Box sx={{ display: "flex" }}>
        <IconButton sx={{ color: "#1e1b46", marginLeft: "auto" }}>
          <AddIcon sx={{ fontSize: "1.5em" }} />
        </IconButton>
      </Box> */}
    </>
  );
}
