import { useParams } from "react-router-dom";
import { Card, CardContent, CardMedia } from "@mui/material";

export default function JobDetails() {
  const { id } = useParams();

  return (
    <div style={{ paddingTop: "20px" }}>
      Details for job : {id}
      <Card
        sx={{
          borderRadius:5,
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s, box-shadow 0.3s",
          px:3,
          mx:{xs:3,lg:25}
        }}
      >
        <CardMedia
          component="img"
          sx={{
            height: 200,
            maxWidth: 350,
            objectFit: "contain",
          }}
          image={`/images/logo-comany.webp`}
          alt="Company Logo"
        />
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
