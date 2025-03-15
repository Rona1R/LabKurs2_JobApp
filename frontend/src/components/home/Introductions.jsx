import React from "react";
import { Typography, Box, Card, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid2";

const Introduction = () => {
    const services = [
        {
          id: 1,
          title: "Job Search Platform",
          description:
            "Our platform connects job seekers with employers worldwide, offering a seamless experience to find your dream job. With advanced search filters, you can easily refine your job hunt by location, industry, salary range, and more. Get notified about new job postings and apply directly from our platform.",
        },
        {
          id: 2,
          title: "Resume Builder",
          description:
            "Create professional resumes easily with our built-in templates, tailored to showcase your skills and achievements. Our resume builder guides you step by step, ensuring your CV highlights your strengths and stands out to potential employers. You can also export your resume in multiple formats, including PDF and Word.",
        },
        {
          id: 3,
          title: "Career Guidance",
          description:
            "Get personalized career advice and resources to help you navigate your career path with confidence. From interview preparation tips to industry insights, our expert guidance ensures you're always one step ahead. We also offer skill assessment tools to help you identify areas for improvement and growth.",
        },
        {
          id: 4,
          title: "Recruitment Services",
          description:
            "We help companies find the right talent quickly and efficiently, simplifying the hiring process for employers. Our advanced matching algorithm ensures the best fit between candidates and job roles, saving time and effort for both parties. Employers can post jobs, manage applications, and communicate directly with candidates through our platform.",
        },
      ];
  

  return (
    <Box sx={{ backgroundColor: "#0A0529", padding: "80px 40px" }}>
      <Typography
        variant="h2"
        sx={{
          color: "#ffffff",
          fontWeight: "bold",
          textAlign: "center",
          fontFamily:"sans-serif",
          mb: 4,
        }}
      >
        Services  <span style={{ color:"hsl(210, 100%, 80%)"}}>
             Our Platform Offers
            </span> 
      </Typography>
      <Grid container justifyContent='space-around' spacing={5} marginTop={15} marginBottom={15} >
        {services.map((service) => (
          <Grid
            key={service.id}
            size={{ md: 6 }} // 12 columns -> full width , (small,xs screen) ; 12/6 = 2 -> 2 columns ne screen (bigger screens)
            sx={{ textAlign: "center" }}
          >
            <Card
              sx={{
                backgroundColor: "#151034",
                color: "#ffffff",
                borderRadius: "12px",
                textAlign: "center",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",    
                height: "100%", 
                padding:"30px"
              }}
            >
              <CardContent>
                <Typography
                  variant="h4"
                  sx={{
                    // color: "#4285F4",
                    // color:"#81D3E6",
                    color:"hsl(210, 100%, 80%)",
                    fontWeight: "bold",
                    mb: 2,
                    fontFamily:"sans-serif"
                  }}
                >
                  {service.title}
                </Typography>
                <Typography
                  variant="h5"
                  letterSpacing={1}
                  sx={{
                    color: "#CCCCCC",
                    fontFamily:"sans-serif"
                  }}
                >
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Introduction;
