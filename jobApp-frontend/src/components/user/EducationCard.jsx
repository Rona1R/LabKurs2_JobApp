import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { format } from "date-fns"; // Make sure date-fns is installed for date formatting
import EditDeleteMenu from "./EditDeleteMenu";

function EducationCard({
  id,
  institution,
  field,
  degree,
  avgGrade,
  startDate,
  endDate,
  description,
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
    <Card
      sx={{
        backgroundColor: "hsla(218, 82.60%, 59.40%, 0.10)",
        borderRadius: "12px",
        textAlign: "center",
        boxShadow: "0px 4px 10px rgba(243, 243, 243, 0.25)",
        height: "100%",
        padding: "20px",
      }}
    >
      <CardContent>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {editable && (
            <EditDeleteMenu
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              iconColor={"hsl(218, 94.40%, 21.20%)"}
            />
          )}
        </div>
        <Typography
          variant="h4"
          component="div"
          sx={{ color: "hsl(218, 94.40%, 21.20%)", fontWeight: "bold" }} // Slightly darker blue for heading
        >
          {field} 
        </Typography>
        <Typography
          component="div"
          gutterBottom
          mt={1}
          sx={{ color: "hsl(218, 16.50%, 42.70%)" ,fontWeight:"bold"}}
        >
          {institution} , {degree} Degree <br/> {avgGrade!==0 && `Grade : ${avgGrade}`}
        </Typography>
        <Typography variant="h6" sx={{ color: "hsl(218, 90%, 20%)" }}>
          {format(new Date(startDate), "MMM yyyy")} -{" "}
          {endDate === null? "Present" : format(new Date(endDate).toLocaleDateString(), "MMM yyyy")}
        </Typography>
        <Typography
          variant="h6"
          mt={3}
          sx={{ color: "hsl(218, 94.40%, 21.20%)", fontWeight: "bold" }} // Ensuring readability and emphasis
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default EducationCard;
