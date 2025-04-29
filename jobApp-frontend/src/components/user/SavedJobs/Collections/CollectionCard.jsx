import EditDeleteMenu from "../../EditDeleteMenu";
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function CollectionCard({ id, name, postCount,setSelected, showEdit, showDelete }) {
  const handleEdit = () => {
    setSelected(id);
    showEdit(true);
  };

  const handleDelete = () => {
    setSelected(id);
    showDelete(true);
  };

  return (
    <Card
      sx={{
        backgroundColor: "#e8f0fe",
        borderRadius: "12px",
        textAlign: "center",
        boxShadow: "0px 4px 10px rgba(243, 243, 243, 0.25)",
        height: "100%",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <CardContent>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <EditDeleteMenu
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            iconColor={"hsl(218, 94.40%, 21.20%)"}
          />
        </div>
        <Box sx={{ m: 5 }}>
          <Typography
            variant="h4"
            component="div"
            sx={{
              color: "hsl(218, 94.40%, 21.20%)",
              fontWeight: "bold",
              mb: 3,
            }}
          >
            {name}
          </Typography>
          <Typography
            component="div"
            variant="h5"
            mt={1}
            sx={{ color: "hsl(218, 94.40%, 21.20%)", fontWeight: "bold" }}
          >
            {postCount} {postCount === 1 ? "Saved Post" : "Saved Posts"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
