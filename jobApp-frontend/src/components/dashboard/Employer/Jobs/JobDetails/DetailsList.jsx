import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  TextField,
} from "@mui/material";
import NoDataYet from "src/components/common/NoDataYet";
import "../../../styles/table.css";
import { styled } from "@mui/material/styles";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Input from "@mui/material/Input";
import { useState } from "react";

const CustomListItem = styled(ListItem)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  backgroundColor: "rgba(245, 246, 254, 0.59)",
  color: "#333",
  borderRadius: "20px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  padding: theme.spacing(2),
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 6px 10px rgba(0,0,0,0.15)",
  },
}));

const CustomListItemText = styled(ListItemText)(({}) => ({
  "& .MuiListItemText-primary": {
    fontSize: "larger",
  },
}));

const StyledInput = styled(Input)({
  fontSize: 'larger',
  fontWeight: 'bold',
  color:"#333"
});

export default function DetailsList({
  listItems,
  handleEdit,
  handleDelete,
  noData,
}) {
  const [editIndex, setEditIndex] = useState(-1);
  const [editText, setEditText] = useState("");

  const handleStartEdit = (item, index) => {
    setEditText(item); 
    setEditIndex(index); 
  };

  const handleSaveEdit = (index) => {
    handleEdit(editText, index); 
    setEditIndex(-1); 
  };
  return (
    <>
      {listItems.length > 0 ? (
        <List>
          {listItems.map((item, index) => (
            <CustomListItem key={index}>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                <Box sx={{ marginLeft: "auto" }}>
                  {editIndex === index ? (
                    <>
                      <IconButton onClick={()=>setEditIndex(-1)}>
                        <i className="fa-solid fa-xmark"></i>
                      </IconButton>
                      <IconButton onClick={() => handleSaveEdit(index)}>
                        <i
                          className="fa-solid fa-check"
                          style={{ color: "green" }}
                        ></i>
                      </IconButton>
                    </>
                  ) : (
                    <>
                      {handleEdit && 
                      <IconButton onClick={() => handleStartEdit(item, index)}>
                        <i
                          className="fa-solid fa-pen-to-square"
                          style={{ color: "#0A0529", fontSize: "15px" }}
                        ></i>
                      </IconButton>
                      }
                      <IconButton onClick={() => handleDelete(item)}>
                        <i
                          className="fa-solid fa-trash"
                          style={{
                            color: "rgb(169, 71, 71)",
                            fontSize: "15px",
                          }}
                        ></i>
                      </IconButton>
                    </>
                  )}
                  {/* {handleEdit && (
                    <IconButton
                      sx={{ fontSize: "15px" }}
                      onClick={() => handleEdit(item)}
                    >
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
                  )} */}
                </Box>
                <Box display="flex" gap={1}>
                  <ArrowRightIcon sx={{ fontSize: "35px", color: "#1e1b46" }} />
                  {editIndex === index ? (
                    <StyledInput
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      fullWidth
                    />
                  ) : (
                    <CustomListItemText primary={item} />
                  )}
                  {/* <ArrowRightIcon sx={{ fontSize: "35px", color: "#1e1b46" }} />
                  <CustomListItemText primary={item} /> */}
                </Box>
              </Box>
            </CustomListItem>
          ))}
        </List>
      ) : (
        <NoDataYet message={noData} />
      )}
    </>
  );
}
