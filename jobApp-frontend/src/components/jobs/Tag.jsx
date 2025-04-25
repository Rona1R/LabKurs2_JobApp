import Chip from "@mui/material/Chip";
import { Link } from "react-router-dom";
export default function Tag({ label, id }) {
  return (
    <Link
        to={`/jobPostings/tag/${id}`} 
    >
        <Chip
        label={`# ${label}`}
        sx={{
            "& .MuiChip-label": {
            fontWeight: "bold",
            color: "#333333",
            fontSize: "larger",
            },
        }}
        />
    </Link>
  );
}
