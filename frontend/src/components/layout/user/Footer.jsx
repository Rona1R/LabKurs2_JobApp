import React from "react";
import { Box, Typography, Link } from "@mui/material";
import Grid from "@mui/material/Grid2";
import "./style/Footer.css";

const Footer = () => {
  return (
    <Box
      sx={{ backgroundColor: "#0A0529", color: "#ffffff", py: 15 }}
      className="custom-footer"
    >
      <Grid
        container
        spacing = {8}
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", mb: 3 }}
            className="section-title"
          >
            Quick Links
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box>
              <Link
                href="/"
                color="inherit"
                underline="none"
                sx={{
                  display: "block",
                  mb: 1,
                  fontSize: "1.8rem",
                  fontWeight: "500",
                  textAlign: "start",
                }}
              >
                Home
              </Link>
              <Link
                href="/services"
                color="inherit"
                underline="none"
                sx={{
                  display: "block",
                  mb: 1,
                  fontSize: "1.8rem",
                  fontWeight: "500",
                  textAlign: "start",
                }}
              >
                Services
              </Link>
              <Link
                href="/about"
                color="inherit"
                underline="none"
                sx={{
                  display: "block",
                  mb: 1,
                  fontSize: "1.8rem",
                  fontWeight: "500",
                  textAlign: "start",
                }}
              >
                About
              </Link>
              <Link
                href="/contact"
                color="inherit"
                underline="none"
                sx={{
                  display: "block",
                  mb: 1,
                  fontSize: "1.8rem",
                  fontWeight: "500",
                  textAlign: "start",
                }}
              >
                Contact
              </Link>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", mb: 3 }}
            className="section-title"
          >
            Contact Us
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box>
              <Typography
                variant="body1"
                color="#CCCCCC"
                sx={{ mb: 3, fontSize: "1.3rem" }}
                className="footer-contact"
              >
                <i className="fa-solid fa-envelope footer-icon"></i>
                jobplatform@gmail.com
              </Typography>
              <Typography
                variant="body1"
                color="#CCCCCC"
                sx={{ mb: 3, fontSize: "1.3rem" }}
                className="footer-contact"
              >
                <i className="fa-solid fa-phone footer-icon"></i>
                +1 (555) 123-4567
              </Typography>
              <Typography
                variant="body1"
                color="#CCCCCC"
                sx={{ fontSize: "1.3rem" }}
                className="footer-contact"
              >
                <i className="fa-solid fa-location-dot footer-icon"></i>
                123 Main Street, City, Country
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", mb: 3 }}
            className="section-title"
          >
            Follow Us
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Link
                href="https://facebook.com"
                target="_blank"
                color="inherit"
                underline="none"
                sx={{ fontSize: "1.8rem", fontWeight: "500" }}
                className="media-link"
              >
                <i className="fa-brands fa-facebook footer-icon"></i>
                Facebook
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                color="inherit"
                underline="none"
                sx={{ fontSize: "1.8rem", fontWeight: "500" }}
                className="media-link"
              >
                <i className="fa-brands fa-twitter footer-icon"></i>
                Twitter
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                color="inherit"
                underline="none"
                sx={{ fontSize: "1.8rem", fontWeight: "500" }}
                className="media-link"
              >
                <i className="fa-brands fa-linkedin footer-icon"></i>
                LinkedIn
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box
        sx={{
          textAlign: "center",
          borderTop: "1px solid #151034",
          mt: 4,
          pt: 2,
          color: "#CCCCCC",
        }}
      >
        <Typography variant="body1" sx={{ fontSize: "1rem" }}>
          &copy; {new Date().getFullYear()} Job Platform. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
