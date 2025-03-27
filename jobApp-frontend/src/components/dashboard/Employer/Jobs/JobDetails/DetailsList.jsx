import { List, ListItem, ListItemText, IconButton, Box } from "@mui/material";
import NoDataYet from "src/components/common/NoDataYet";
import "../../../styles/table.css";

export default function DetailsList({
  listItems,
  handleEdit,
  handleDelete,
  noData
//   removeFromList,
}) {
  return (
    <>
      {listItems.length > 0 ? (
        <List>
          {listItems.map((item, index) => (
            <ListItem
              key={index}
              sx={{ mb: 3, backgroundColor: "#f5f5f5", borderRadius: "20px" }}
            >
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                <Box sx={{ marginLeft: "auto" }}>
                  {handleEdit && (
                    <IconButton sx={{ fontSize: "15px" }} onClick={()=>handleEdit(item)}>
                      <i
                        className="fa-solid fa-pen-to-square"
                        style={{ color: "#0A0529" }}
                      ></i>
                    </IconButton>
                  )}

                  {handleDelete && ( 
                    <IconButton
                      sx={{ fontSize: "15px" }}
                      onClick={() => handleDelete(item)}
                    >
                      <i
                        className="fa-solid fa-trash"
                        style={{ color: "rgb(169, 71, 71)" }}
                      ></i>
                    </IconButton>
                  )}
                </Box>
                <ListItemText primary={item} />
              </Box>
            </ListItem>
          ))}
        </List>
      ) : (
        <NoDataYet message={noData} />
      )}
    </>
  );
}
