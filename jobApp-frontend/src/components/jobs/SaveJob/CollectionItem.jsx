import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import {Typography,Button } from "@mui/material";

export default function CollectionItem({id,collectionName,handleAddToCollection}) {
  return (
    <Button
      onClick={()=>handleAddToCollection(id)}
      sx={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        fontSize: "1.1em",
        textTransform:"none",
        backgroundColor: "#e8f0fe",
        color: "hsl(218, 94.40%, 21.20%)",
        px:2,
        py:2,
        borderRadius: 4,
        "&:hover": {
          backgroundColor: "hsl(218, 100.00%, 89.80%)",
        },
      }}
    >
      <BookmarkBorderIcon
        sx={{ color: "hsl(218, 94.40%, 21.20%)",fontSize: "1.5em",mr:1 }}
      />
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "1.2em",
          color: "hsl(218, 94.40%, 21.20%)",
          backgroundColor: "inherit",
          border: "none",
        }}
      >
        {collectionName}
      </Typography>
    </Button>
  );
}
