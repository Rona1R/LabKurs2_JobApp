
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

export default function OpenToList({ options }) {
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center" mb={2}> 
      {options.map((option, index) => (
        option.description && (
          <Card
            key={index}
            variant="outlined"
            sx={{
              width: { xs: "100%", md: "350px" },
              my: 2,
              boxShadow: "0 4px 8px rgba(90, 86, 136, 0.24)",
              border:"none",
              borderRadius: 3,
              p: 4,
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
              },
              backgroundColor: "rgba(138, 144, 255, 0.08)",
              mx: 2, 
            }}
          >
            <CardContent
              sx={{height:"100%"}}
            >
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: "bold",
                  fontSize:"1.6rem",
                  color: "rgba(28, 11, 95, 0.95)",
                  marginBottom: 2,
                }}
              >
                {option.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  lineHeight: 1.5,
                  fontWeight: "bold",
                  color: "rgba(52, 51, 54, 0.98)"
                }}
              >
                {option.description}
              </Typography>
            </CardContent>
          </Card>
        )
      ))}
    </Box>
  );
}

