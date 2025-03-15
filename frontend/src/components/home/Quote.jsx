import * as React from "react";
import Box from "@mui/material/Box";
import { Card, CardContent, Typography } from "@mui/material";

export default function Quote() {
  return (
    <Box sx={{ background: "linear-gradient(white 50%, #0A0529 50%)", py: 4 }}>
      <Card
        sx={{
          width: "350px", 
          height: "700px", 
          margin: "0 auto",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
          borderRadius: "40px",
          position: "relative",
          backgroundColor: "#000", 
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "120px",
            height: "20px",
            backgroundColor: "#333",
            borderRadius: "15px",
            position: "absolute",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: "120px",
            right: "-10px",
            width: "5px",
            height: "60px",
            backgroundColor: "#555",
            borderRadius: "2px",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "200px",
            right: "-10px",
            width: "5px",
            height: "40px",
            backgroundColor: "#555",
            borderRadius: "2px",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "150px",
            left: "-10px",
            width: "5px",
            height: "80px",
            backgroundColor: "#555",
            borderRadius: "2px",
          }}
        />
        <Box
          sx={{
            width: "300px",
            height: "600px",
            margin: "auto",
            marginTop: "60px",
            borderRadius: "30px",
            backgroundColor: "#fff",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <CardContent>
            <Typography
              variant="h3"
              sx={{
                padding: "40px 20px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              <span style={{ color: "#0A0529" }}>Shape Your </span>
              <span style={{ color: "hsl(210, 100%, 80%" }}>
                Career With Us
              </span>
            </Typography>
          </CardContent>
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60px",
            height: "10px",
            backgroundColor: "#333",
            borderRadius: "5px",
          }}
        />
      </Card>
    </Box>
  );
}
