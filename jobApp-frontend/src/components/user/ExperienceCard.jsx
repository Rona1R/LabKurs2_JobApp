import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import EditDeleteMenu from "./EditDeleteMenu";

export default function ExperienceCard({
  id,
  jobTitle,
  company,
  description,
  startDate,
  endDate,
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
        backgroundColor: "#151034",
        height: "100%",
        color: "#ffffff",
        borderRadius: "12px",
        textAlign: "center",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        padding: "20px",
      }}
    >
      <CardContent>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {editable && (
            <EditDeleteMenu
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              iconColor={"hsl(210, 100%, 80%)"}
            />
          )}
        </div>
        <Typography
          variant="h4"
          component="div"
          sx={{ color: "hsl(210, 100%, 80%)", fontWeight: "bold" }}
        >
          {jobTitle}
        </Typography>
        <Typography
          gutterBottom
          mt={1}
          sx={{ color: "hsl(211, 46.30%, 86.90%)" }}
        >
          {company}
        </Typography>
        <Typography variant="h6">
          {format(new Date(startDate).toLocaleDateString(), "MMM yyyy")} -{" "}
          {endDate === null? "Present" : format(new Date(endDate).toLocaleDateString(), "MMM yyyy")}
        </Typography>
        <Typography
          variant="h6"
          mt={3}
          sx={{ color: "hsl(211, 46.30%, 86.90%)", fontWeight: "bold" }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
