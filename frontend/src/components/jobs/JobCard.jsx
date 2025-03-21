import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function JobCard({title,city,timeLeft,companyLogo}) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        boxShadow: "0 4px 6px rgba(39, 38, 38, 0.1)",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        transition: "box-shadow 0.3s",
        "&:hover": {
          boxShadow: "0 4px 6px rgba(3, 3, 53, 0.23)",
        },
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: 151,
          objectFit: "contain",
          height: 151,
          margin: "auto",
        }}
        image={`${process.env.REACT_APP_IMAGE_PATH }/${companyLogo}`}
        alt="Company Logo"
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          minWidth:0
        }}
      >
        <Typography
          component="div"
          variant="h5"
          noWrap
          sx={{ fontWeight: "bold", color: "#0A0833",width:"100%"}}
        >
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Box sx={{ mr: 2 }}>
            <PlaceIcon sx={{ color: "#0A0833" }} />
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ color: "text.secondary", fontWeight: "bold" }}
            >
              {city}
            </Typography>
          </Box>
          <Box>
            <AccessTimeIcon sx={{ color: "#0A0833" }} />
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ color: "text.secondary", fontWeight: "bold" }}
            >
              {timeLeft}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
