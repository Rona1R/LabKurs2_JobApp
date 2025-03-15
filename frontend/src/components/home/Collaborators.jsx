import { Typography, CardMedia, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Carousel } from "react-bootstrap";
import "./styles/Collaborators.css";

export default function Collaborators() {
  // Sample data for companies
  const companies = [
    { id: 1, title: "Amazon", image: "/images/amazon-logo-transparent.webp" },
    { id: 2, title: "Netflix", image: "/images/netflix-logo.webp" },
    { id: 3, title: "Google", image: "/images/google-logo.jpg" },
    { id: 4, title: "TikTok", image: "/images/tiktok-logo.png" },
    { id: 5, title: "Slack", image: "/images/slack-logo.jpg" },
    { id: 6, title: "Amazon", image: "/images/amazon-logo-transparent.webp" },
    { id: 7, title: "Netflix", image: "/images/netflix-logo.webp" },
    { id: 8, title: "Google", image: "/images/google-logo.jpg" },
    { id: 9, title: "TikTok", image: "/images/tiktok-logo.png" },
    { id: 10, title: "Slack", image: "/images/slack-logo.jpg" },
  ];

  return (
    <Box sx={{ mb: 15, mt: 15 ,ml:5,mr:5}}>
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          color: "#0A0529",
          textAlign: "center",
          mb: 4,
        }}
      >
        Companies That Work With Us
      </Typography>
      <Carousel className={`custom-carousel ${companies.length<=5 ? 'hide-button':''}`}>
        {companies.map((company, index) => {
          // Start a new Carousel Item every 5 companies
          if (index % 5 === 0) {
            const items = companies.slice(index, index + 5);
            return (
              <Carousel.Item key={index}>
                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  {items.map((item) => (
                    <Grid  size={{ xs:12 ,sm:6, md:4, lg:2.4}} key={item.id}>
                      <CardMedia
                        component="img"
                        alt={item.title}
                        image={item.image}
                        sx={{
                          height: 140,
                          width: 250,
                          margin: "0 auto",
                          objectFit: "contain",
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Carousel.Item>
            );
          }
          return null;
        })}
      </Carousel>
    </Box>
  );
}
